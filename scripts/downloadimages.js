// Download images shortyJS whatever because I can.

function downloadImages(selector, thisAttr) {
	// selector == Selector used to find images.
	// thisAttr == Attribute of each image that holds the URL. Defaults to "src".
	// "arg 2"  == Argument 2. A function to be run on all URLs, to manipulate them. Takes one parameter.

	// Take care of non-jQuery first.
	if (!jQuery) {
		console.log("jQuery not present. Inserting...");
		var s  = document.createElement("script");
		s.type = "text/javascript";
		s.src  = "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js";
		document.body.appendChild(s);

		// Rerun function.
		setTimeout(function() {
			downloadImages(selector, thisAttr);
		}, 1000);
		return;
	};

	// So the replace would *actually* work...
	String.prototype.replaceAll = function(search, replacement) {
		var target = this;
		return target.replace(new RegExp(search, 'g'), replacement);
	};

	// Prereqs.
	thisAttr = thisAttr || "src";
	var toHTML = "data:text/html, <h1>Click on a link to download it!</h1><hr> ";
	var templt = '<p style="margin:5px;"><a href="{URL}" download="{FILENAME}">{FILENAME}</a></p><br>'

	// Les do dis.
	var thisURL, thisFN, thisTemplt;
	jQuery(selector).each(function() {
		thisURL = jQuery(this).attr(thisAttr);
		
		// Just in case.
		if (arguments[2]) {
			thisURL = arguments[2](thisURL);
		}
		
		thisFN  = thisURL.split("/").pop();

		thisTemplt = templt.replaceAll("{URL}", thisURL);
		thisTemplt = thisTemplt.replaceAll("{FILENAME}", thisFN);

		toHTML += thisTemplt;
	});

	// Wrap it all up.
	toHTML += "<hr><p>" + jQuery(selector).length + " images found. URLs provided above.</p>";
	toHTML += "<p>" + "Source: " + window.location.href;

	// Making life easier.
	toHTML += '<script>var allA = document.querySelectorAll("a"); for (var i=0; i < allA.length; i++) {allA[i].addEventListener("click", function() { this.parentNode.innerHTML += " - CLICKED" }) }</script>';

	window.location = toHTML;
}
