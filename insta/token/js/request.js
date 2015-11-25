/*
 * Sends request for access token, and receives callback from Instagram.
 * Uses implicit authentication to request token (coz it's easier).
 *
 * Created by AR.
 */
 
function getURLParameter(name) {
	return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||undefined;
}
function getHashParameter(name) {
	return decodeURIComponent((new RegExp('[#|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.hash)||[,""])[1].replace(/\+/g, '%20'))||undefined;
}

if (getURLParameter("request") == true) {
	clientID = "d3369f882ac646e5b21fcc976283a57a"
	redirectURI = "http://alir6716.github.io/insta/token"
	var sendToInsta = "https://instagram.com/oauth/authorize/?client_id=" + clientID + "&redirect_uri=" + redirectURI + "&response_type=token"
	window.location = sendToInsta
}

var aTok = getHashParameter("access_token")
if (aTok != undefined) {
	document.getElementById("access-token").innerHTML = aTok
} else {
	document.getElementById("access-token").innerHTML = "No access token can be found. Re-run this page with ?request=1 appended to the end of the URL to request a token."
}


// Copy to Clipboard. Thanks to Alvaro Montoro for the following non-JQuery function (http://stackoverflow.com/a/30905277).
function copyToClipboard(elementId) {
	// Create a "hidden" input
	var aux = document.createElement("input");
	// Assign it the value of the specified element
	aux.setAttribute("value", document.getElementById(elementId).innerHTML);
	// Append it to the body
	document.body.appendChild(aux);
	// Highlight its content
	aux.select();
	// Copy the highlighted text
	document.execCommand("copy");
	// Remove it from the body
	document.body.removeChild(aux);
}

