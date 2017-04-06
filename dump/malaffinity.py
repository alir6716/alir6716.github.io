"""

"""
# TODO: ^

import copy

import bs4
import numpy
import requests


# Custom exceptions.
class NoAffinityError(Exception):
    """
    Raised when either the shared rated anime between the base user
    and another user is less than 10, or the user does not have any rated anime.
    """
    pass
class InvalidUsernameError(Exception):
    """Raised when username specified does not exist."""
    pass
class MALRateLimitExceededError(Exception):
    """
    Raised when MAL's blocking your request, because you're going over their
    rate limit of one request every two seconds. Slow down and try again.
    """
    pass


class Affinity:
    _URL = "https://myanimelist.net/malappinfo.php"

    def __init__(self, base_user=None, round=False):
        """
        The MALAffinity class.

        To help with scripts that have the initialisation of this class
        and the actual affinity calculations in different areas, this class may
        be initialised without the `username` param, but the `init`
        function MUST be invoked before affinity calculations.

        :param base_user: Base MAL username
        :param round: Decimal places to round affinity values to.
                      Specify `false` for no rounding.
        """

        # Will get overridden in init function.
        self._base_user = None
        self._round = round
        # TODO: self._base_scores? (For clarity)
        self._scores = {}

        if base_user:
            self.init(base_user)

    def _retrieve_scores(self, username, status="all", type="anime"):
        params = {
            "u": username,
            "status": status,
            "type": type
        }

        resp = requests.request("GET", self._URL, params=params)

        # Check if MAL's hitting you with a 429 and raise an exception if so.
        # TODO: Look into using `if not resp.ok:`
        if resp.status_code == requests.codes.too_many_requests:
            raise MALRateLimitExceededError("MAL rate limit exceeded. Slow down and try again.")

        resp = bs4.BeautifulSoup(resp.content, "html.parser")

        all_anime = resp.findAll("anime")

        # Check if there's actually any anime being returned to us.
        # If not, user probably doesn't exist.
        # MAL should do a better job of highlighting this, but eh.
        if not len(all_anime):
            raise InvalidUsernameError("User `{}` does not exist.".format(username))

        # TODO: Look into confusion with this and 'scores' var in 'calculate_affinity'
        scores = []

        for anime in all_anime:
            id = anime.series_animedb_id.string
            id = int(id)

            score = anime.my_score.string
            # Might need changing if MAL allows float scores.
            score = int(score)

            if score > 0:
                scores.append({ "id": id, "score": score })

        # Check if there's actually anything in user_scores.
        # If not, user probably doesn't have any rated anime.
        if not len(scores):
            raise NoAffinityError("User `{}` hasn't rated any anime.".format(username))

        return scores

    # TODO: Rename this?
    def init(self, base_user):
        """
        Get the base user's list and create the 'base scores' dict that
        other people's scores will be compared to.

        Base scores will be saved to self._scores
        One may want to check that this is populated after invoking this function
        before running anything else here.

        :param base_user: Base username whose list others' lists will be compared to
        :return: Nothing.
        """

        # Being a bit cheeky and setting self._base_user here instead of __init__
        self._base_user = base_user

        base_list = self._retrieve_scores(base_user)

        for anime in base_list:
            id    = anime["id"]
            score = anime["score"]

            self._scores[id] = [score]

        return

    def calculate_affinity(self, username):
        """
        Get the affinity between the base user and someone else.

        Will either return the unrounded Pearson's correlation coefficient * 100,
        or rounded value, depending on the value of the `self._round` variable set
        at class initialisation.

        :param username: The username to compare the base user's scores to
        :return: Tuple with affinity and shared count
        """

        # Check if there's actually a base user to compare scores with
        # `init` will assign the username to the `self._base_user` var when
        # it retrieves the base user's scores, so we can test if the var has been set.
        if not self._base_user:
            # Too lazy to make a custom exception for this.
            raise Exception("No base user has been specified. "
                            "Call the `init` function to retrieve a base user's scores.")

        # Create a local, deep-copy of the scores
        scores = copy.deepcopy(self._scores)

        # TODO: Rename "their_list" to a better var name
        their_list = self._retrieve_scores(username)

        for anime in their_list:
            id    = anime["id"]
            score = anime["score"]

            if id in scores:
                scores[id].append(score)

        # Forced to list so no errors when deleting keys.
        for key in list(scores.keys()):
            if not len(scores[key]) == 2:
                del scores[key]

        # Handle cases where the shared scores are <= 10 so
        # affinity can not be accurately calculated.
        if len(scores) <= 10:
            raise NoAffinityError(
                "Shared rated anime count between `{}` and `{}` is less than ten."
                    .format(self._base_user, username)
            )

        scores1 = []
        scores2 = []

        for key in scores:
            arr = scores[key]

            scores1.append(arr[0])
            scores2.append(arr[1])

        pearson = numpy.corrcoef(scores1, scores2)
        pearson = pearson[0, 1]
        # Won't round properly if not forced to float
        pearson = float(pearson * 100)

        if self._round is not False:
            pearson = round(pearson, self._round)

        return pearson, len(scores)
