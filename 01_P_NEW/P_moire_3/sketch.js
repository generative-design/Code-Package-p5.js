/**
 * P_moire_3
 *
 * MOUSE
 * mouseX              : shift horizontal position of overlay
 *
 * KEYS
 * s                   : save png
 */
"use strict";

function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(255);

  push();
  translate(width * 0.37, height / 2);
  for (var i = 0; i < 360; i += 12) {
    var x = cos(radians(i)) * 200;
    var y = sin(radians(i)) * 200;
    push();
    translate(x, y);
    triangleLines();
    pop();
  }
  pop();

  push()
  translate(mouseX, 0);
  overlay();
  pop();
}

function overlay() {
  strokeWeight(4);

  for (var i = 0; i < width; i += 5) {
    line(i, 0, i, height);
  }
}

function triangleLines() {
  stroke(0);
  strokeWeight(2);

  var theight = 150;
  for (var i = 0; i < theight; i += 5) {
    if (i < theight / 2) {
      line(i, 0, i, -i);
    } else {
      line(i, 0, i, -(-i + theight))
    }
  }
}

function keyPressed() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
}
