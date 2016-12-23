/*
 * 404.js
 * With regex support and a bunch of other stuff!
 *
 * NOTE: FIX THIS MESS OF CODE ONE DAY
 *
 * Created by AR.
 */

// Add optional "appendParams" param, for redirects that may/may not need it.
function goTo(dest, appendParams) {
	document.title = "Redirecting... | AR";
	if (appendParams) { dest += window.location.search + window.location.hash };
	window.location = dest;
}
function loadScript(src, clearScreen) {
	if (clearScreen) {
		// Hide all child elements in body.
		var childNodes = document.body.childNodes;
		for (var i=0; i < childNodes.length; i++) {
			var node   = childNodes[i];
			node.style = "display: none;";
		}
	}
	// Create script and add to DOM.
	var script = document.createElement("script");
	script.src = src;
	document.body.appendChild(script);
}

// Create a function for the matching, to make life easier.
// Return the bool needed to match the str to regex in the switch/case.
// Probably won't actually use regex in the cases, but it's there just in case.
// NOTE TO SELF: "\\" needed instead of "\" for backslash in regex.
function match(regexStr) {
	// Add the optional "/" that may appear at the end of the URL.
	regexStr += "/?";
	// Convert the regexStr to regex.
	// 2016-10-25: Added "^" and "$" to prevent regex misuse and such.
	var re = new RegExp("^" + regexStr + "$");
	// Test it against pathname and return bool.
	return re.test(window.location.pathname);
}

// Set up the unrecommended pseudo-switch-case (for regex matching).
// Code: https://stackoverflow.com/a/2896642/6790642
// Regex matches return true if match, and so would work with switches if searching for true.
switch (true) {
	/* Moved URLs */
	case match("/redirect"):
		var newLoc = window.location.search.replace("?rdr=", "")
		// No redirect location specified. Do nothing.
		if (newLoc == "" || newLoc == "?") { break; }
		goTo(newLoc)
		break;
	case match("/(personal/projects/)?contact"):
		goTo("/personal/contact/", appendParams=true);
		break;

	/* Others */
	case match("/314"):
		goTo("/personal/txts/pi_nospace.txt");
		break;
	case match("/fullscreen"):
		loadScript("/personal/js/fullscreen.js", clearScreen=true);
		break;
	case match("/legal"):
		loadScript("/personal/js/legal.js", clearScreen=true);
		break;
	case match("/src"):
		var repo = window.location.search.slice(1);
		if (repo == "") { repo = "alir6716.github.io" }
		goTo("https://github.com/alir6716/" + repo);
		break;
	// Just in case I need to hand this out IRL.
	// Hey, I'm actually using regex on one of these!
	case match("/mal(retrieve)?"):
		goTo("/personal/projects/malretrieve/");
		break;

	/* Deleted Pages */
	case match("/about"):
	case match("/personal/fate-carousel"):
	case match("/personal/projects/cli"):
	case match("/personal/projects/command-line"):
	case match("/personal/projects/console"):
	// 2016-12-23: Hiding until stuff sorted out.
	case match("/projects/malretrieve"):
	case match("/personal/projects/search"):
	case match("/personal/projects/spam"):
	case match("/personal/songs/cure"):
		goTo("/personal/projects/deleted/?ref=" + window.location.pathname);
		break;

	/* Personal Pages shortcut */
	case match("/p/.*"):
		var re  = /\/p\/(.*)\/?/;
		var loc = re.exec(window.location.pathname);
		//window.location = "/personal/" + loc[1];
		goTo("/personal/" + loc[1], appendParams=true);
		break;

	/* Projects shortcut */
	case match("/proj(?:ects)?/.*"):
		var re  = /\/proj(?:ects)?\/(.*)\/?/;
		var loc = re.exec(window.location.pathname);
		goTo("/personal/projects/" + loc[1], appendParams=true);
		break;

	/* Default */
	default:
		console.log("No matches found.");
		break;

}

/*
	Future Idea:
	Create obj. key = regexStr, value = function
	Iterate over obj, create regex, match pathname, if match, run function.
	Dayum, should've done that instead.
 */
