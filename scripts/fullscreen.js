/*!
* fullscreen.js
* Toggles Fullscreen using screenfull.
*
* Created by AR.
* Screenfull.js by Sindre Sorhus.
* Idea for measuring lastMouseUp: chemikhazi (chemikhazi.github.io/Samaritan/)
*/

!function(){"use strict";var a="undefined"!=typeof module&&module.exports,b="undefined"!=typeof Element&&"ALLOW_KEYBOARD_INPUT"in Element,c=function(){for(var a,b,c=[["requestFullscreen","exitFullscreen","fullscreenElement","fullscreenEnabled","fullscreenchange","fullscreenerror"],["webkitRequestFullscreen","webkitExitFullscreen","webkitFullscreenElement","webkitFullscreenEnabled","webkitfullscreenchange","webkitfullscreenerror"],["webkitRequestFullScreen","webkitCancelFullScreen","webkitCurrentFullScreenElement","webkitCancelFullScreen","webkitfullscreenchange","webkitfullscreenerror"],["mozRequestFullScreen","mozCancelFullScreen","mozFullScreenElement","mozFullScreenEnabled","mozfullscreenchange","mozfullscreenerror"],["msRequestFullscreen","msExitFullscreen","msFullscreenElement","msFullscreenEnabled","MSFullscreenChange","MSFullscreenError"]],d=0,e=c.length,f={};e>d;d++)if(a=c[d],a&&a[1]in document){for(d=0,b=a.length;b>d;d++)f[c[0][d]]=a[d];return f}return!1}(),d={request:function(a){var d=c.requestFullscreen;a=a||document.documentElement,/5\.1[\.\d]* Safari/.test(navigator.userAgent)?a[d]():a[d](b&&Element.ALLOW_KEYBOARD_INPUT)},exit:function(){document[c.exitFullscreen]()},toggle:function(a){this.isFullscreen?this.exit():this.request(a)},onchange:function(){},onerror:function(){},raw:c};return c?(Object.defineProperties(d,{isFullscreen:{get:function(){return!!document[c.fullscreenElement]}},element:{enumerable:!0,get:function(){return document[c.fullscreenElement]}},enabled:{enumerable:!0,get:function(){return!!document[c.fullscreenEnabled]}}}),document.addEventListener(c.fullscreenchange,function(a){d.onchange.call(d,a)}),document.addEventListener(c.fullscreenerror,function(a){d.onerror.call(d,a)}),void(a?module.exports=d:window.screenfull=d)):void(a?module.exports=!1:window.screenfull=!1)}();
 
var lastMouseUp = -1;

/* When one double clicks, there is usually a time gap inbetween each click. 
 * This measures that, and if the gap is lower than 500ms, 
 * screenfull will toggle and send the page into full screen mode. */

$(document).bind("mouseup", function(){
	if ((Date.now() - lastMouseUp) <= 500) {
		console.log("DblClick");
		if (screenfull.enabled) {
			screenfull.toggle();
		}
	};
	lastMouseUp = Date.now();
})