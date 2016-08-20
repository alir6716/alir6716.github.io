/*
 * 404.js
 * Looks at URL that user is trying to reach, and attempts to redirect them to their desired location.
 *
 * Created by AR.
 */

function goTo(dest) {
	document.getElementById("page-title").innerHTML = "Redirecting... | AR";
	// location.hash now supported.
	window.location = dest + window.location.search + window.location.hash;
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
	case "/home":
		goTo(base);
		break;
	case "/legal":
		var lS = document.createElement("script");
		lS.src = "/personal/js/legal.js";
		document.body.appendChild(lS);
		break;
	case "/src":
	case "/source":
		goTo("https://github.com/alir6716/alir6716.github.io");
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
		goTo(base + "/personal/projects/discontinued/?ref=" + window.location.pathname);
		break;
	
	/* Default */
	default:
		break;
}