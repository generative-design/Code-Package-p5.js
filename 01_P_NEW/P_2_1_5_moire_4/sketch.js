// P_moire_4
/**
 * Stacked circles in front of each other to create a moire effect.
 *
 * MOUSE
 * mouseX              : overlay circle moire pattern
 *
 * KEYS
 * s                   : save png
 *
 * CONTRIBUTED BY
 * [Niels Poldervaart](http://NielsPoldervaart.nl)
 */
"use strict";

function setup() {
  createCanvas(600, 600);
  noFill();
  strokeWeight(1);
}

function draw() {
  background(255);

  push();
  translate(mouseX, mouseY);
  overlay();
  pop();

  push();
  translate(width - mouseX, height - mouseY);
  overlay();
  pop();
}

function overlay() {
  for (var i = 0; i < width - 100; i += 5) {
    ellipse(0, 0, i);
  }
}

function keyPressed() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
}
