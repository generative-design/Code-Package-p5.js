/**
 * P_moire_2
 *
 * MOUSE
 * mouseX              : overlay horizontal shear
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
  translate(width / 2, height / 2);
  strokeWeight(4);
  overlay();
  translate(width / 2, height / 2);
  scale(0.8);
  shearX(map(mouseX, 0, width, 0, PI));
  strokeWeight(1);
  overlay();
  pop();
}

function overlay() {
  translate(-width / 2, -height / 2);
  for (var i = 0; i < width; i += 5) {
    line(i, 0, i, height);
  }
}

function keyPressed() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
}
