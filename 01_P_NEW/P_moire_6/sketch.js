// P_moire_6
/**
 * Drawing tool for creating moire effect compositions using
 * rectangles of various widths, lengths, angles and colours.
 *
 * CREDITS
 * Niels Poldervaart
 *
 * MOUSE
 * mouse               : place moire effect rectangle
 *
 * KEYS
 * 1                   : set color to red
 * 2                   : set color to green
 * 3                   : set color to blue
 * 4                   : set color to black
 * arrow up            : increase rectangle width
 * arrow down          : decrease rectangle width
 * s                   : save png
 */
"use strict";

var rectangles = [];
var density = 2.5;
var rectHeight = 64;
var lineColor;

var newRect;

function setup() {
  createCanvas(600, 600);
  noFill();
  strokeWeight(1);
  lineColor = color(0);
}

function draw() {
  background(255);

  rectangles.forEach(function(rectangle) {
    rectangle.draw();
  });

  if (newRect) {
    newRect.x2 = mouseX;
    newRect.y2 = mouseY;
    newRect.h = rectHeight;
    newRect.c = lineColor;
    newRect.draw();
  }
}

function Rectangle(x1, y1, x2, y2, h, c) {
  this.x1 = x1;
  this.y1 = y1;
  this.x2 = x2;
  this.y2 = y2;
  this.h = h;
  this.c = c;

  Rectangle.prototype.draw = function() {
    var w = dist(this.x1, this.y1, this.x2, this.y2);
    var a = atan2(this.y2 - this.y1, this.x2 - this.x1);
    stroke(this.c);
    push();
    translate(this.x1, this.y1);
    rotate(a);
    translate(0, - this.h / 2);
    for (var i = 0; i < this.h; i += density) {
      line(0, i, w, i);
    }
    pop();
  };
}

function mousePressed() {
  newRect = new Rectangle(pmouseX, pmouseY, mouseX, mouseY, rectHeight, lineColor);
}

function mouseReleased() {
  rectangles.push(newRect);
  newRect = undefined;
}

function keyPressed() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');

  if (key == '1') lineColor = color(255, 0, 0);
  if (key == '2') lineColor = color(0, 255, 0);
  if (key == '3') lineColor = color(0, 0, 255);
  if (key == '4') lineColor = color(0);

  if (keyCode === UP_ARROW) rectHeight += density;
  if (keyCode === DOWN_ARROW) rectHeight -= density;
}
