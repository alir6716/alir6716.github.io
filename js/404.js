// Looks at URL that user is trying to reach, and attempts to redirect them to their desired location.

function goTo(dest) {
	window.location = dest;
}

switch (window.location.pathname) {
	// Moved URLs
	case "/confetti":
		goTo("http://alir6716.github.io/fun/confetti")
	case "/name":
		goTo("http://alir6716.github.io/fun/name")
	case "/particle":
		goTo("http://alir6716.github.io/fun/particle")
	case "/ribbon":
		goTo("http://alir6716.github.io/fun/ribbon")
	case "/trail":
		goTo("http://alir6716.github.io/fun/trail")
	
	// Others
	case "/314":
		goTo("http://alir6716.github.io/personal/txts/pi_nospace.txt")
	case "/src":
	case "/source":
		goTo("https://github.com/alir6716/alir6716.github.io")
	case "/insta":
		goTo("http://alir6716.github.io/personal/insta")
	
	// Default
	default:
		break;
}