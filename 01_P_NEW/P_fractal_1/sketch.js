// P_fractal_1
/**
 * Fractal line drawing tool
 *
 * MOUSE
 * mouse               : click and drag to draw fractal line
 *
 * KEYS
 * s                   : save png
 */
"use strict";

var shapes = [];

var newShape;

var speed = 1;
var amplitude = 16;
var resolution = 16;

function setup() {
  createCanvas(800, 800);
  noFill();
  strokeWeight(1);
  background(64);
}

function draw() {

  shapes.forEach(function(shape) {
    shape.draw();
    shape.update();
  });

  if (newShape) {
    newShape.addPos(mouseX, mouseY);
    newShape.draw();
    newShape.update();
  }
}

function Shape() {
  this.shapePath = [];
  this.fractalPath = [];
  this.iterator = 0;

  Shape.prototype.addPos = function(x, y) {
    var newPos = createVector(x, y);
    this.shapePath.push(newPos);
  };

  Shape.prototype.draw = function() {
    stroke(255);
    beginShape();
    this.shapePath.forEach(function(pos) {
      curveVertex(pos.x, pos.y);
    });
    endShape();

    stroke(180);
    var currentPos = this.shapePath[this.iterator];
    var previousPos = this.shapePath[this.iterator - 1];
    if (previousPos) {
      var a = atan2(previousPos.y - currentPos.y, previousPos.x - currentPos.x) + HALF_PI;

      var offsetPosA = currentPos.copy();
      for (var i = 0; i < resolution; i++) {
        a = i % 2 === 0 ? a : -a;
        var offsetPosB = p5.Vector.fromAngle(a - (this.iterator * (i + 1)));
        offsetPosB.setMag(amplitude / (i + 1));
        offsetPosB.add(offsetPosA);
        line(offsetPosA.x, offsetPosA.y, offsetPosB.x, offsetPosB.y);

        offsetPosA = offsetPosB.copy();
      }

      this.fractalPath[this.iterator] = offsetPosA;

      stroke(255, 255, 0);
      beginShape();
      this.fractalPath.forEach(function(pos) {
        curveVertex(pos.x, pos.y);
      });
      endShape();

    }
  };

  Shape.prototype.update = function() {
    this.iterator++;
    if (this.iterator >= this.shapePath.length - 1) {
      this.iterator = 0;
    }
  };
}

function mousePressed() {
  newShape = new Shape();
  newShape.addPos(mouseX, mouseY);
  loop();
}

function mouseReleased() {
  shapes.push(newShape);
  newShape = undefined;
  noLoop();
}

function keyPressed() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');

  if (key == ' ') {
    shapes = [];
    background(64);
    loop();
  }
}
