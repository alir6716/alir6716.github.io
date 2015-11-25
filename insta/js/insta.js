/*
 * insta.js
 * Calls the Instagram API and returns downloadable images in HD.
 *
 * Created by AR.
 */

// Gets URL Parameters.
function getURLParameter(name) {
	return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||undefined;
}
function getHashParameter(name) {
	return decodeURIComponent((new RegExp('[#|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.hash)||[,""])[1].replace(/\+/g, '%20'))||undefined;
}

// Converts images to ~1080x1080.
function hdify() {
	// Assigns all "a" and "img" tags to variables, for easier access.
	aElements = document.getElementsByTagName("a")
	imgElements = document.getElementsByTagName("img")
	// Delay of one second means that images have time to load before being converted to ~1080x1080.
	setTimeout(function() {
		for (var i=0; i < aElements.length; i++) {
			// Replaces the "/s640x640" part of the image URL, to make images HD.
			aElements[i].setAttribute("href", aElements[i].getAttribute("href").replace("/s640x640", ""))
			imgElements[i].setAttribute("src", imgElements[i].getAttribute("src").replace("/s640x640", ""))
			/* I've noticed that some images are 480x480 px... so I've added a temporary fix until I can 
			 * find a way to get rid of both sizes (and others) from the URLs (at the same time.) */
			aElements[i].setAttribute("href", aElements[i].getAttribute("href").replace("/s480x480", ""))
			imgElements[i].setAttribute("src", imgElements[i].getAttribute("src").replace("/s480x480", ""))
		}
	}, 1000)
}


// If "username" URL parameter specified, get InstaID of username and reload the page.
var username = getURLParameter("username")
if (username != undefined) {
	$.ajax({
		type: "GET",
		dataType: "jsonp",
		url: "https://api.instagram.com/v1/users/search?q=" + username + "&client_id=d3369f882ac646e5b21fcc976283a57a",
		success: function(data) {
			window.location = window.location.origin + window.location.pathname + "?userid=" + data.data[0].id
		}
	});
}


// Gets value of "userid" URL parameter.
var uID = getURLParameter("userid");

// Gets value of "rows" URL parameter. If no value for "rows" URL parameter specified, rows will be set to 4.
var rows = getURLParameter("rows");
if (rows === undefined) {
	rows = 4;
}

// Gets value of "adjust" URL parameter. If "adjust" is set to true, the "rows" parameter will be overridden.
var adjust = getURLParameter("adjust")
if (adjust == true) {
	if (window.innerWidth > window.innerHeight) {
		rows = 1.999;
	} else {
		rows = 1;
	}
}

// Gets value of "accessToken" hash parameter. If no value for "accessToken" hash parameter specified, default accessToken will be set.
var aToken = getHashParameter("accessToken") || getHashParameter("access_token")
if (aToken === undefined) {
	aToken = "2086210446.1677ed0.30f2adcd8a9f4a7f9d2a8087055f95f9";
}

// If userid specified...
if (uID != undefined) {
	// Converts userid into integer.
	uID = parseInt(uID)
	// Constructs object.
	var ufObj = {
		get: 'user',
		userId: uID,
		limit: 60,
		accessToken: aToken,
		template: '<a href="{{model.images.standard_resolution.url}}"><img src="{{model.images.standard_resolution.url}}" title="{{model.caption.text}}" width="' + 100/rows + '%" /></a>'
	}
	// Sends object to instafeed.js and runs.
	var feed = new Instafeed(ufObj);
	feed.run();
	// Converts images to HD.
	hdify();
	
	// When user reaches the end of the page, load more images.
	// Thanks to Nick Craver for the following scroll solution (http://stackoverflow.com/a/3898152).
	$(window).scroll(function() {
		if ($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
			// Loads more images from feed.
			feed.next()
			// Converts said images to HD.
			hdify();
		}
	});
} 
// If userid not specified...
else {
	// Displays error in "instafeed" div.
	document.getElementById("instafeed").innerHTML = '<p>"userid" URL parameter not found.</p>'
}


// Changes page title.
pageTitle = document.getElementById("page-title").innerHTML
document.getElementById("page-title").innerHTML = uID + " | " + pageTitle


// EOF.