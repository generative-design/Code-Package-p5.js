// P_pendulum_1
/**
 * Fractal line drawing tool
 *
 * MOUSE
 * mouse               : click and drag to create a path to draw a pendulum along with
 *
 * KEYS
 * s                   : save png
 */
"use strict";

var shapes = [];

var newShape;

var amplitude = 16;
var resolution = 16;

var showPath = false;
var showPendulum = false;
var showPendulumPath = true;

function setup() {
  createCanvas(800, 800);
  noFill();
  strokeWeight(0.2);
  background(255);
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

function Shape(shapeAmplitude, shapeResolution) {
  this.shapePath = [];
  this.pendulumPath = [];
  this.iterator = 0;
  this.shapeAmplitude = shapeAmplitude;
  this.shapeResolution = shapeResolution;

  Shape.prototype.addPos = function(x, y) {
    var newPos = createVector(x, y);
    this.shapePath.push(newPos);
  };

  Shape.prototype.draw = function() {
    if (showPath) {
      stroke(100, 230, 100);
      beginShape();
      this.shapePath.forEach(function(pos) {
        curveVertex(pos.x, pos.y);
      });
      endShape();
    }

    var currentPos = this.shapePath[this.iterator];
    var previousPos = this.shapePath[this.iterator - 1];
    if (previousPos) {
      var a = atan2(previousPos.y - currentPos.y, previousPos.x - currentPos.x) + HALF_PI;

      var offsetPosA = currentPos.copy();
      for (var i = 0; i < this.shapeResolution; i++) {
        a = i % 2 === 0 ? a : -a;
        var offsetPosB = p5.Vector.fromAngle(a + (this.iterator * (this.shapeResolution - i)));
        offsetPosB.setMag(this.shapeAmplitude / (i + 1));
        offsetPosB.add(offsetPosA);
        if (showPendulum) {
          stroke(100);
          line(offsetPosA.x, offsetPosA.y, offsetPosB.x, offsetPosB.y);
        }

        offsetPosA = offsetPosB.copy();
      }

      this.pendulumPath[this.iterator] = offsetPosA;

      if (showPendulumPath) {
        stroke(100);
        beginShape();
        this.pendulumPath.forEach(function(pos) {
          curveVertex(pos.x, pos.y);
        });
        endShape();
      }

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
  newShape = new Shape(amplitude, resolution);
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
    background(255);
    loop();
  }

  if (key == '1') showPath = !showPath;
  if (key == '2') showPendulum = !showPendulum;
  if (key == '3') showPendulumPath = !showPendulumPath;

  if (keyCode === RIGHT_ARROW) resolution += 4;
  if (keyCode === LEFT_ARROW) resolution -= 4;

  if (keyCode === UP_ARROW) amplitude += 4;
  if (keyCode === DOWN_ARROW) amplitude -= 4;
}
