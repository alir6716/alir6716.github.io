function easyJQ(callback) {
	var jQScript     = document.createElement("script");
	jQScript.src     = "https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.4/jquery.min.js";
	jQScript.type    = "text/javascript";
	jQScript.onload = callback;
	document.body.appendChild(jQScript);
}