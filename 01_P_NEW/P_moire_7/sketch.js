// P_moire_7
/**
 * Draw path shapes that generate a moire effect
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
 */
"use strict";

var shapes = [];
var density = 2.5;
var shapeHeight = 64;
var shapeColor;
var smoothness = 0;

var newShape;

function setup() {
  createCanvas(800, 800);
  noFill();
  strokeWeight(1);
  shapeColor = color(0);
}

function draw() {
  background(255);

  shapes.forEach(function(shape) {
    shape.draw();
  });

  if (newShape) {
    newShape.h = shapeHeight;
    newShape.c = shapeColor;
    newShape.addPos(mouseX, mouseY);
    newShape.draw();
  }
}

function Shape(h, c) {
  this.shapePath = [];
  this.h = h;
  this.c = c;

  Shape.prototype.addPos = function(x, y) {
    var newPos = createVector(x, y);
    var lastPos = this.getLastPos();
    if (
      this.shapePath.length === 0 ||
      lastPos && p5.Vector.dist(newPos, lastPos) > smoothness
    ) {
      this.shapePath.push(newPos);
    }
  };

  Shape.prototype.getLastPos = function() {
    return this.shapePath[this.shapePath.length - 1];
  };

  Shape.prototype.draw = function() {
    stroke(this.c)
    for (var i = -this.h / 2; i < this.h / 2; i += density) {
      beginShape();
      this.shapePath.forEach(function(pos, index, shapePath) {
        var previousPos = shapePath[index - 1];
        if (previousPos) {
          var a = atan2(previousPos.y - pos.y, previousPos.x - pos.x);
          var offsetPos = p5.Vector.fromAngle(a);
          offsetPos.add(0, i);
          offsetPos.rotate(a);
          offsetPos.add(pos);
          curveVertex(offsetPos.x, offsetPos.y);
        }
      });
      endShape();
    }
  };
}

function mousePressed() {
  newShape = new Shape(shapeHeight, shapeColor);
  newShape.addPos(mouseX, mouseY);
}

function mouseReleased() {
  shapes.push(newShape);
  newShape = undefined;
}

function keyPressed() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');

  if (key == '1') shapeColor = color(255, 0, 0);
  if (key == '2') shapeColor = color(0, 255, 0);
  if (key == '3') shapeColor = color(0, 0, 255);
  if (key == '4') shapeColor = color(0);

  if (key == ' ') {
    shapes = [];
    redraw();
  }

  if (keyCode === RIGHT_ARROW) smoothness += density;
  if (keyCode === LEFT_ARROW) smoothness -= density;

  if (keyCode === UP_ARROW) shapeHeight += density;
  if (keyCode === DOWN_ARROW) shapeHeight -= density;
}
