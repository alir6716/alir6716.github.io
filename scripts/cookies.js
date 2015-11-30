/*
 * cookies.js
 * Store and read cookies on webpages.
 *
 * Created by AR, using code from http://www.javascripter.net/
 */

function setCookie(cookieName, cookieValue, expireInDays) {
	var today = new Date();
	var expire = new Date();
	if (expireInDays == null || expireInDays == 0) expireInDays = 1;
	expire.setTime(today.getTime() + 3600000 * 24 * expireInDays);
	document.cookie = cookieName + "=" + escape(cookieValue) + ";expires=" + expires.toGMTString();
}

function readCookie(cookieName) {
	var re = new RegExp('[; ]' + cookieName + '=([^\\s;]*)');
	var sMatch = (' ' + document.cookie).match(re);
	if (cookieName && sMatch) return unescape(sMatch[1]);
	return undefined;
}