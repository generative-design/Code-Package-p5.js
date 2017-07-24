// P_moire_1
/**
 * Simple moire effect demonstration by moving, rotating 
 * and scaling a shape of densely packed lines over 
 * a background also consisting of densely packed lines.
 *
 * MOUSE
 * mouseX              : overlay rotation or position x
 * mouseY              : overlay scaling
 *
 * KEYS
 * 1-2                 : switch draw mode
 * s                   : save png
 *
 * CONTRIBUTED BY
 * [Niels Poldervaart](http://NielsPoldervaart.nl)
 */
"use strict";

var drawMode = 1;

function setup() {
  createCanvas(600, 600);
  noFill();
}

function draw() {
  background(255);

  translate(width / 2, height / 2);

  // first shape (fixed)
  strokeWeight(3);
  overlay();

  // second shape (dynamically translated/rotated and scaled)
  var x = map(mouseX, 0, width, -50, 50);
  var a = map(mouseX, 0, width, -0.5, 0.5);
  var s = map(mouseY, 0, height, 0.7, 1);

  if (drawMode == 2) translate(x, 0);
  if (drawMode == 1) rotate(a);
  scale(s);

  strokeWeight(2);
  overlay();
}

function overlay() {
  var w = width - 100;
  var h = height - 100;

  if (drawMode == 1) {
    for (var i = -w / 2; i < w / 2; i += 5) {
      line(i, -h / 2, i, h / 2);
    }
  }
  if (drawMode == 2) {
    for (var i = 0; i < w; i += 10) {
      ellipse(0, 0, i);
    }
  }
}

function keyPressed() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');

  // change draw mode
  if (key == '1') drawMode = 1;
  if (key == '2') drawMode = 2;
}
