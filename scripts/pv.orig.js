/*!
 * Send a XMLHTTPRequest to Telegram's BOT API
 * on every page view.
 *
 * NOTE: Do not add this to the site.
 *       Run code through https://javascriptobfuscator.com/
 *       and paste the output into the pageview script.
 *
 * Code credit: http://stackoverflow.com/a/18078705
 */

(function() {
	// So this works on old people's computers.
	var ajax = {};
	ajax.x = function () {
		if (typeof XMLHttpRequest !== 'undefined') {
			return new XMLHttpRequest();
		}
		var versions = [
			"MSXML2.XmlHttp.6.0",
			"MSXML2.XmlHttp.5.0",
			"MSXML2.XmlHttp.4.0",
			"MSXML2.XmlHttp.3.0",
			"MSXML2.XmlHttp.2.0",
			"Microsoft.XmlHttp"
		];

		var xhr;
		for (var i = 0; i < versions.length; i++) {
			try {
				xhr = new ActiveXObject(versions[i]);
				break;
			} catch (e) {
			}
		}
		return xhr;
	};

	// URL was getting too long and hard to edit, so individual variables
	// will hold it and piece together for the request.
	var portal   = "https://api.telegram.org/bot";
	var botToken = "249989037:AAGcaxco86mCUKOXbPf1wlgXZNr4qyneWGE";
	var method   = "/sendMessage";
	var query    = '?chat_id=188920178&text=Page "' + window.location.pathname + '" viewed.';

	// Only code necessary for POST extracted.
	var x = ajax.x();
	x.open("POST", portal + botToken + method + query, true);
	x.onreadystatechange = function() {};
	x.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	x.send();
})();