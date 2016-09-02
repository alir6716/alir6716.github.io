/*
 * 404.js
 * Looks at URL that user is trying to reach, and attempts to redirect them to their desired location.
 *
 * IN NEED OF MAJOR OVERHAUL MAN
 * I need to add some form of regex support in switch/case, even though it ain't recommended.
 * and clean these links up and stuff.
 * And add a "hideChildren" function so it doesn't have to be copypastad into scripts.
 * Jeez, so much work...
 * Oh, and get rid of "base". "/{PATH}" would do just fine.
 *
 * Created by AR.
 */

function goTo(dest) {
	document.getElementById("page-title").innerHTML = "Redirecting... | AR";
	// location.hash now supported.
	window.location = dest + window.location.search + window.location.hash;
};
function loadScript(src) {
	var s = document.createElement("script");
	s.src = src;
	document.body.appendChild(s);
};

var base = "http://alir6716.github.io";

switch (window.location.pathname) {
	/* Moved URLs */
	case "/redirect":
	case "/redirect/":
		goTo(window.location.search.replace("?rdr=", ""));
		break;
	
	/* Others */
	case "/314":
		goTo(base + "/personal/txts/pi_nospace.txt");
		break;
	case "/fullscreen":
		loadScript("/personal/js/fullscreen.js");
		break;
	case "/home":
		goTo(base);
		break;
	case "/legal":
		loadScript("/personal/js/legal.js");
		break;
	case "/src":
	case "/source":
		var repo = window.location.search.slice(1);
		if (repo == "") { repo = "alir6716.github.io" }
		goTo("https://github.com/alir6716/" + repo);
		break;
	
	/* Deleted Pages */
	case "/personal/fate-carousel":
	case "/personal/fate-carousel/":
	case "/personal/projects/cli":
	case "/personal/projects/cli/":
	case "/personal/projects/command-line":
	case "/personal/projects/command-line/":
	case "/personal/projects/console":
	case "/personal/projects/console/":
	case "/personal/projects/search":
	case "/personal/projects/search/":
	case "/personal/projects/spam":
	case "/personal/projects/spam/":
	case "/personal/songs/cure":
	case "/personal/songs/cure/":
		goTo(base + "/personal/projects/deleted/?ref=" + window.location.pathname);
		break;
	
	/* Default */
	default:
		break;
}