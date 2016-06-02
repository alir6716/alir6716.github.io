// homepage_image_editor.js
// Edit homepage images GUI-y

// Get the div into there.
$("body").prepend('<div id="editor" style="background-color: #000000; top: 0;"></div>')

var editor = $("#editor")

// HTML goes here. Add "\" to end of each line to continue str.
// Too lazy to do this manually.
var editorInner = '\
<h1 style="font-size: 24px !important; color: #FFFFFF !important; font-family: Arial !important;">Homepage Image Editor!</h1>\
<input type="text" id="usrInput-ID">\
<input type="text" id="usrInput-newURL">\
<button id="submit-usrInput">Apply</button>\
<div id="usrInput-status"></div>\
<hr>\
'
editor.append(editorInner)

var usrInputID;
var usrInputNewURL;

function change() {
	usrInputID = $("#usrInput-ID").val();
	usrInputNewURL = $("#usrInput-newURL").val();
	
	$("#" + usrInputID).css("background-image", 'url("' + usrInputNewURL + '")')
	$("#usrInput-status").append('<p style="font-size: 14px !important; color: #FFFFFF !important; font-family: Arial !important;"><b>Changed! </b>' + usrInputID + ' -> ' + usrInputNewURL + '</p>')
}

$("#submit-usrInput").click(function(e){
	// Prevent default action.
	e.preventDefault();
	change();
})

$(document).keyup(function(e) {
	if (e.which == 13) {
		change();
	}
})
