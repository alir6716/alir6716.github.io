/* 
 * removeimages.js
 * Removes all images from a webpage, without using JQuery.
 *
 * Created by AR, using code from some random discussion on StackOverflow.
 */

console.log("Removing " + document.images.length + " images...")
for (var i=document.images.length; i-->0;) {
	document.images[i].parentNode.removeChild(document.images[i])
}

console.log("Images removed.")