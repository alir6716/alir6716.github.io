// Looks at URL that user is trying to reach, and attempts to redirect them to their desired location.

function goTo(dest) {
	window.location = dest;
}

var base = "http://alir6716.github.io"

switch (window.location.pathname) {
	// Moved URLs
	case "/confetti":
		goTo(base + "/fun/confetti")
	case "/name":
		goTo(base + "/fun/name")
	case "/particle":
		goTo(base + "/fun/particle")
	case "/ribbon":
		goTo(base + "/fun/ribbon")
	case "/trail":
		goTo(base + "/fun/trail")
	
	// Others
	case "/314":
		goTo(base + "/personal/txts/pi_nospace.txt")
	case "/src":
	case "/source":
		goTo("https://github.com/alir6716/alir6716.github.io")
	case "/insta":
		goTo(base + "/personal/insta")
	
	// Default
	default:
		break;
}