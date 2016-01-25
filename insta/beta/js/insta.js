/*
 * insta.js
 * Calls the Instagram API and returns downloadable images in HD.
 *
 * Created by AR.
 */

// Gets URL Parameters.
function getURLParameter(name) {
	return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||undefined;
};
function getHashParameter(name) {
	return decodeURIComponent((new RegExp('[#|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.hash)||[,""])[1].replace(/\+/g, '%20'))||undefined;
};


// If "username" URL parameter specified, get InstaID of username and reload the page.
var username = getURLParameter("username") || getURLParameter("un");
if (username != undefined) {
	$.ajax({
		type: "GET",
		dataType: "jsonp",
		url: "https://api.instagram.com/v1/users/search?q=" + username + "&client_id=d3369f882ac646e5b21fcc976283a57a",
		success: function(data) {
			window.location = window.location.origin + window.location.pathname + "?userid=" + data.data[0].id
		}
	});
};


// Gets value of "userid" URL parameter.
var uID = getURLParameter("userid") || getURLParameter("uid");

// Gets value of "rows" URL parameter. If no value for "rows" URL parameter specified, rows will be set to 4.
var rows = getURLParameter("rows") || getURLParameter("r");
if (rows === undefined) {
	rows = 4;
};

// Gets value of "adjust" URL parameter. If "adjust" is set to true, the "rows" parameter will be overridden.
var adjust = getURLParameter("adjust") || getURLParameter("a");
if (adjust == true) {
	if (window.innerWidth > window.innerHeight) {
		rows = 1.999;
	} else {
		rows = 1;
	};
};

// Gets value of "accessToken" hash parameter. If no value for "accessToken" hash parameter specified, default accessToken will be set.
var aToken = getHashParameter("accessToken") || getHashParameter("access_token") || getHashParameter("token");
if (aToken === undefined) {
	aToken = "2086210446.1677ed0.30f2adcd8a9f4a7f9d2a8087055f95f9";
};

// If userid specified...
if (uID != undefined) {
	// Converts userid into integer.
	uID = parseInt(uID);
	// Creates Image List.
	var images = new Array();
	// Video/Image Switch.
	var videoSwitch = getURLParameter("video") || getURLParameter("v");
	// Constructs object.
	var ufObj = {
		get: 'user',
		userId: uID,
		limit: 60,
		// Fetches data without inserting images into DOM.
		mock: true,
		accessToken: aToken,
		// Here goes nothing.
		success: function(model) {
			var data = model.data;
			for (var i=0; i < data.length; i++) {
				currentMedia = data[i]
				// Grabs the image URL.
				imageURL = currentMedia.images.standard_resolution.url;
				// "HDIFY" process here. RIP "HDIFY" function.
				imageURL = imageURL.replace("/s640x640", "");
				imageURL = imageURL.replace("/s480x480", "");
				imageURL = imageURL.replace("/s320x320", "");
				imageURL = imageURL.replace("/sh0.08", "");
				// Removing Duplicates.
				if (images.indexOf(imageURL) != -1) {
					console.log("Duplicate image removed.");
					// Breaks current iteration on duplicate URL.
					continue;
				}
				// Pushes to "images" array.
				images.push(imageURL);
				try {
					imageCaption = currentMedia.caption.text;
				} catch (err) {
					// If no image caption present, set it to an empty string.
					imageCaption = "";
				};
				// Optional video support.
				if ("videos" in currentMedia && videoSwitch) {
					$("#instafeed").append('<video controls width="' + 100/rows + '%"><source src="' + currentMedia.videos.standard_resolution.url +'"></video>');
					continue;
				}
				// Pushes image to "instafeed" div.
				$("#instafeed").append('<a href="' + imageURL + '"><img src="' + imageURL + '" title="' + imageCaption + '" width="' + 100/rows + '%">');
			};
		}
	};
	// Sends object to instafeed.js and runs.
	var feed = new Instafeed(ufObj);
	feed.run();
	
	// When user reaches the end of the page, load more images.
	// Thanks to Nick Craver for the following scroll solution (http://stackoverflow.com/a/3898152).
	$(window).scroll(function() {
		if ($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
			// Loads more images from feed.
			feed.next();
		};
	});
}
// If userid not specified...
else {
	// Displays error in "instafeed" div.
	document.getElementById("instafeed").innerHTML = '<p>"userid" URL parameter not found.</p>';
};


// Changes page title.
pageTitle = document.getElementById("page-title").innerHTML;
document.getElementById("page-title").innerHTML = uID + " | " + pageTitle;


// EOF.