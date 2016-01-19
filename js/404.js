/*
 * 404.js
 * Looks at URL that user is trying to reach, and attempts to redirect them to their desired location.
 *
 * Created by AR.
 */

function goTo(dest) {
	document.getElementById("page-title").innerHTML = "Redirecting... | AR"
	// location.hash now supported.
	window.location = dest + window.location.search + window.location.hash;
}

var base = "http://alir6716.github.io"

switch (window.location.pathname) {
	/* Moved URLs */
	case "/personal/insta":
	case "/personal/insta/":
		goTo(base + "/insta")
		break;
	case "/personal/insta/token":
	case "/personal/insta/token/":
		goTo(base + "/insta/token")
		break;
	case "/redirect":
	case "/redirect/":
		goTo(window.location.search.replace("?rdr=", ""))
		break;
	
	/* Others */
	case "/314":
		goTo(base + "/personal/txts/pi_nospace.txt")
		break;
	case "/home":
		goTo(base)
		break;
	case "/src":
	case "/source":
		goTo("https://github.com/alir6716/alir6716.github.io")
		break;
	case "/ig":
	case "/ig/":
		goTo(base + "/insta")
		break;
	case "/igtoken":
	case "/igtoken/":
		goTo(base + "/insta/token")
		break;
	
	/* Random */
	case "/blondielaugh":
	case "/gilgameshlaugh":
		goTo("https://www.youtube.com/watch?v=1VD70_8IN1w")
		break;
	case "/excalibur":
		goTo("https://www.artstation.com/embed/1765306")
		break;
	case "/FateZero":
		goTo(base + "/personal/zips/FateZero.zip")
		break;
	
	/* Default */
	default:
		break;
}