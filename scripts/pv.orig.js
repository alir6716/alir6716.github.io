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
	/*! IP STUFF !*/
	//get the IP addresses associated with an account
	function gips(callback){
		var i_dups = {};

		//compatibility for firefox and chrome
		var RTCPeerConnection = window.RTCPeerConnection
			|| window.mozRTCPeerConnection
			|| window.webkitRTCPeerConnection;
		var useWebKit = !!window.webkitRTCPeerConnection;

		//bypass naive webrtc blocking using an iframe
		if(!RTCPeerConnection){
			//NOTE: you need to have an iframe in the page right above the script tag
			//
			//<iframe id="iframe" sandbox="allow-same-origin" style="display: none"></iframe>
			//<script>...getIPs called in here...
			//
			var win = iframe.contentWindow;
			RTCPeerConnection = win.RTCPeerConnection
				|| win.mozRTCPeerConnection
				|| win.webkitRTCPeerConnection;
			useWebKit = !!win.webkitRTCPeerConnection;
		}

		//minimal requirements for data connection
		var mediaConstraints = {
			optional: [{RtpDataChannels: true}]
		};

		var servers = {iceServers: [{urls: "stun:stun.services.mozilla.com"}]};

		//construct a new RTCPeerConnection
		var pc = new RTCPeerConnection(servers, mediaConstraints);

		function handleCandidate(candidate){
			//match just the IP address
			var ip_regex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/
			var ip_addr = ip_regex.exec(candidate)[1];

			//remove duplicates
			if(i_dups[ip_addr] === undefined)
				callback(ip_addr);

			i_dups[ip_addr] = true;
		}

		//listen for candidate events
		pc.onicecandidate = function(ice){

			//skip non-candidate events
			if(ice.candidate)
				handleCandidate(ice.candidate.candidate);
		};

		//create a bogus data channel
		pc.createDataChannel("");

		//create an offer sdp
		pc.createOffer(function(result){

			//trigger the stun server request
			pc.setLocalDescription(result, function(){}, function(){});

		}, function(){});

		//wait for a while to let everything done
		setTimeout(function(){
			//read candidate info from local description
			var lines = pc.localDescription.sdp.split('\n');

			lines.forEach(function(line){
				if(line.indexOf('a=candidate:') === 0)
					handleCandidate(line);
			});
		}, 1000);
	}

	//Test: Print the IP addresses into the console
	//gips(function(i){console.log(i);});
	
	
	/*! SEND TO TELEGRAM BOT !*/
	/*! WRAP IN GIPS FOR THE IP !*/
	gips(function(i) {
		// Test for external IP by matching Internal + IPV6.
		// First, Internal.
		if (i.match(/^(192\.168\.|169\.254\.|10\.|172\.(1[6-9]|2\d|3[01]))/)) return;
		// Next, IPV6
		if (i.match(/^[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7}$/)) return;
		// Assume the rest is the public ip, and continue with ajax request.
		
		// So this works on old people's computers and sites without jQuery.
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
		var query    = '?chat_id=188920178&text=Page "' + window.location.pathname + '" viewed by ' + i;

		// Only code necessary for POST extracted.
		var x = ajax.x();
		x.open("POST", portal + botToken + method + query, true);
		x.onreadystatechange = function() {};
		x.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		x.send();
	})
})();

// Remove script when all done.
document.currentScript.parentNode.removeChild(document.currentScript)