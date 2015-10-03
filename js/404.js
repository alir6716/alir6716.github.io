// Looks at URL that user is trying to reach, and attempts to redirect them to their desired location.

function goTo(dest) {
	window.location = dest + window.location.search;
}

var base = "http://alir6716.github.io"

switch (window.location.pathname) {
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
	
	// Others
	case "/314":
		goTo(base + "/personal/txts/pi_nospace.txt")
		break;
	case "/src":
	case "/source":
		goTo("https://github.com/alir6716/alir6716.github.io")
		break;
	case "/insta":
		goTo(base + "/personal/insta")
		break;
	
	// Default
	default:
		break;
}