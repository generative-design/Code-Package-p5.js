/**
 * P_moire-trangles_1
 *
 * MOUSE
 *
 *
 * KEYS
 * s                   : save png
 * c                   : save color palette
 */
"use strict";
var overlayspeed = 0;

function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(255);

  push();
  translate(width*0.37, height/2);
  for (var i = 0; i  < 360; i+= 12) {
    var x = cos(radians(i)) * 200;
    var y = sin(radians(i)) * 200;
    push();
    translate(x, y);
    triangleLines();
    pop();
  }
  pop();

  overlayspeed += 0.25;
  push()
  translate(overlayspeed, 0);
  overlay();
  pop();

  if (overlayspeed=== width){
    overlayspeed = 0;
  }

}


function overlay() {
  strokeWeight(4);

  for(var i = 0; i < width; i+= 5) {
    line(i, 0, i, height);
  }

}


function triangleLines() {
  stroke(0);
  strokeWeight(2);

  var theight = 150;
  for(var i = 0; i < theight; i+=5){
    if(i < theight/2){
      line(i, 0, i, i*-1 );
    } else{
      line(i, 0, i, (i*-1 + theight)*-1 )
    }
  }

}

function keyPressed() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
}
