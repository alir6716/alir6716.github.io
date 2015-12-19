/*
 * 404.js
 * Looks at URL that user is trying to reach, and attempts to redirect them to their desired location.
 *
 * Created by AR.
 */

function getURLParameter(name) {
	return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||undefined;
}

function goTo(dest) {
	document.getElementById("page-title").innerHTML = "Redirecting... | AR"
	// location.hash now supported.
	window.location = dest + window.location.search + window.location.hash;
}

var base = "http://alir6716.github.io"

var intendedDest = getURLParameter("intent");
if (intendedDest == undefined) {
	intendedDest = window.location.pathname
}

switch (intendedDest) {
	// Moved URLs
	case "/confetti":
		goTo(base + "/fun/confetti")
		break;
	case "/name":
		goTo(base + "/fun/name")
		break;
	case "/particle":
		goTo(base + "/fun/particle")
		break;
	case "/ribbon":
		goTo(base + "/fun/ribbon")
		break;
	case "/trail":
		goTo(base + "/fun/trail")
		break;
	case "/personal/insta":
	case "/personal/insta/":
		goTo(base + "/insta")
		break;
	case "/personal/insta/token":
	case "/personal/insta/token/":
		goTo(base + "/insta/token")
		break;
	
	// Others
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
	
	// Fate Fight Scenes. (Yeah, I'm actually making a set of cases for this :P)
	case "/archerlancer":
		goTo("https://www.youtube.com/watch?v=tGz42vpeGKk")
		break;
	case "/rinshirou":
		goTo("https://www.youtube.com/watch?v=pYnjxvyWmBM")
		break;
	
	// Random
	case "/blondielaugh":
	case "/gilgameshlaugh":
		goTo("https://www.youtube.com/watch?v=1VD70_8IN1w")
		break;
	
	
	// Default
	default:
		break;
}