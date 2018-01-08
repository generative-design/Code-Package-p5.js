// P_2_1_5_02
/**
 * Place stacked circles of randomised heights at the mouse position
 * to create a moire effect drawing
 *
 * MOUSE
 * mouse              : place circle
 *
 * KEYS
 * s                   : save png
 *
 * CONTRIBUTED BY
 * [Niels Poldervaart](http://NielsPoldervaart.nl)
 */
'use strict';

var shapes = [];
var minRadius = 5;
var maxRadius = 250;
var density = 5;

function setup() {
  createCanvas(800, 800);
  noFill();

  shapes.push(new Shape(width / 2, height / 2, width));
}

function draw() {
  background(255);

  shapes.forEach(function(shape) {
    shape.draw();
  });
}

function Shape(x, y, r) {
  this.x = x;
  this.y = y;
  this.r = r;

  Shape.prototype.draw = function() {
    for (var i = 0; i < this.r; i += density) {
      ellipse(this.x, this.y, i);
    }
  };
}

function mouseReleased() {
  shapes.push(new Shape(mouseX, mouseY, random(minRadius, maxRadius)));
}

function keyPressed() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
}
