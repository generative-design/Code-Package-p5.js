// P_moire_5
/**
 * Place stacked circles of randomised heights at the mouse position
 * to create a moire effect drawing
 *
 * MOUSE
 * mouseX              : draw moire circle patterns
 *
 * KEYS
 * s                   : save png
 *
 * CONTRIBUTED BY
 * [Niels Poldervaart](http://NielsPoldervaart.nl)
 */
"use strict";

var circles = [];
var minRadius = 5;
var maxRadius = 250;
var density = 5;

function setup() {
  createCanvas(600, 600);
  noFill();
  strokeWeight(1);

  circles.push(new Circle(width / 2, height / 2, width));
}

function draw() {
  background(255);

  circles.forEach(function(circle) {
    circle.draw();
  });
}

function Circle(x, y, r) {
  this.x = x;
  this.y = y;
  this.r = r;

  Circle.prototype.draw = function() {
    for (var i = 0; i < this.r; i += density) {
      ellipse(this.x, this.y, i);
    }
  };
}

function mouseReleased() {
  circles.push(new Circle(mouseX, mouseY, random(minRadius, maxRadius)));
}

function keyPressed() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
}
