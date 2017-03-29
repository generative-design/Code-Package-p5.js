/**
 * P_html-divs-1
 * changes the border radius of the div to morph from circle to square
 *
 * KEYS
 * s                   : save png
 *
 */
"use strict";

var mydivs = [];

var angle = 0;
function setup() {
  createCanvas(600,600);
  colorMode(HSB,360,100,100,100);

  var skip = 100;
  var counter = 0;
  for(var x = 0; x< width; x+=skip){
    for(var y = 0; y < height; y+=skip){
      mydivs[counter]= createDiv('');

      mydivs[counter].position(x,y)
        .style("background", "none")
        .style("border", "black 1px solid")
        .style("height",skip+"px")
        .style("width", skip+"px")
        .style("text-align", "center");

      counter++;
    }
  }
}

function draw() {
  // no background update is necessary since we're
  // changing the div directly
  var offset = 0;

  for(var i =0; i < mydivs.length; i++){
    var rad = map(sin(angle + offset), -1, 1, 0, 100);
    mydivs[i].style("border-radius", rad+"%")
    offset += 1;
  }
  angle += 0.1;

}



function keyPressed() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
}
