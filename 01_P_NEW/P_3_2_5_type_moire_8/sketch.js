// P_moire_8
/**
 * Drawing tool for creating moire effect compositions using
 * smooth path of any length, width, smoothness and colour.
 *
 * MOUSE
 * mouse               : click and drag to draw moire pattern path
 *
 * KEYS
 * 1                   : set color to red
 * 2                   : set color to green
 * 3                   : set color to blue
 * 4                   : set color to black
 * arrow right         : increase smoothness
 * arrow left          : decrease smoothness
 * arrow up            : increase rectangle width
 * arrow down          : decrease rectangle width
 * s                   : save png
 *
 * CONTRIBUTED BY
 * [Niels Poldervaart](http://NielsPoldervaart.nl)
 */
"use strict";

var shapes = [];
var density = 2.5;
var shapeHeight = 39.5;
var shapeColor;
var smoothness = 8;

var newShape;

var font;

function preload() {
  font = loadFont('Oval Black.otf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noFill();
  strokeWeight(1);
  shapeColor = color(255);
  textAlign(CENTER, CENTER);
  textFont(font, 100);

  shapes.push(new Shape(shapeHeight, shapeColor, '4', 0, height / 2));
  shapes.push(new Shape(shapeHeight, shapeColor, '8', 250, height / 2));
  shapes.push(new Shape(shapeHeight, shapeColor, '9', 500, height / 2));
}

function draw() {
  background(80);

  shapes.forEach(function(shape) {
    shape.h = shapeHeight;
    shape.draw();
  });
}

function Shape(h, c, t, x, y) {
  this.shapePath = [];
  this.h = h;
  this.c = c;
  this.t = t;

  this.shapePath = font.textToPoints(
    this.t, x, y, 600,
    // {simplifyThreshold: 0.01}
  );
  this.shapePath.push(this.shapePath[2]);

  Shape.prototype.draw = function() {
    stroke(this.c);
    for (var i = 0; i < this.h; i += density) {
      beginShape();
      this.shapePath.forEach(function(pos, index, shapePath) {
        var previousPos = shapePath[index - 1];
        if (previousPos && dist(pos.x, pos.y, previousPos.x, previousPos.y) > smoothness) {
          var a = atan2(previousPos.y - pos.y, previousPos.x - pos.x);
          var offsetPos = p5.Vector.fromAngle(a);
          offsetPos.add(0, i);
          offsetPos.rotate(a);
          offsetPos.add(pos.x, pos.y);
          curveVertex(offsetPos.x, offsetPos.y);
        }
      });
      endShape(CLOSE);
    }
  };
}

function keyPressed() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');

  if (key == '1') shapeColor = color(255, 0, 0);
  if (key == '2') shapeColor = color(0, 255, 0);
  if (key == '3') shapeColor = color(0, 0, 255);
  if (key == '4') shapeColor = color(255);

  if (key == ' ') {
    shapes = [];
    redraw();
  }

  if (keyCode === RIGHT_ARROW) smoothness += density;
  if (keyCode === LEFT_ARROW) smoothness -= density;

  if (keyCode === UP_ARROW) shapeHeight += density;
  if (keyCode === DOWN_ARROW) shapeHeight -= density;
}
