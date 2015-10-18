var name = getURLParameter("name")
if (name === undefined) {
	name = "Ali Raja"
}

var white = [0, 0, 100];
var black = [0, 0, 27];
var red = [0, 100, 63];
var orange = [40, 100, 60];
var green = [75, 100, 40];
var blue = [196, 77, 55];
var purple = [280, 50, 60];

var myName = name;
var letterColors = [red, orange, green, blue, purple];

var bubbleShape = "circle"

drawName(myName, letterColors);
bounceBubbles();