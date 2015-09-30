// Gets the URL parameter value of a specified URL parameter. If no value is specified, the default text "Ali Raja" will be returned.
// Thanks to radicand for the following function (http://stackoverflow.com/a/8764051/4759922).
function getURLParameter(name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||"Ali Raja";
}

var white = [0, 0, 100];
var black = [0, 0, 27];
var red = [0, 100, 63];
var orange = [40, 100, 60];
var green = [75, 100, 40];
var blue = [196, 77, 55];
var purple = [280, 50, 60];

var myName = getURLParameter('name');
var letterColors = [red, orange, green, blue, purple];

var bubbleShape = "circle"

drawName(myName, letterColors);
bounceBubbles();