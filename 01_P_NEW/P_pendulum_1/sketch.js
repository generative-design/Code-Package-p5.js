/**
 * P_pendulum_1
 *
 * Drawing tool that moves a pendulum-esq contraption along paths drawn by the mouse.
 * Each joint of the pendulum leaves behind its own path.
 *
 * CREDITS
 * Niels Poldervaart
 *
 * MOUSE
 * mouse               : click and drag to create a path to draw a pendulum along with
 *
 * KEYS
 * 1                   : toggle path line
 * 2                   : toggle pendulum
 * 3                   : toggle pendulum path
 * s                   : save png
 */
"use strict";

var shapes = [];

var newShape;

var joints = 8;
var amplitude = 32;
var speed = 16;
var resolution = 0.2;

var showPath = true;
var showPendulum = true;
var showPendulumPath = true;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);
  noFill();
  strokeWeight(1);
  background(220);
}

function draw() {
  background(0, 0, 100);

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
  this.pendulumPath = [];
  this.iterator = 0;

  for (var i = 0; i < joints; i++) {
    this.pendulumPath.push([]);
  }

  Shape.prototype.addPos = function(x, y) {
    var newPos = createVector(x, y);
    this.shapePath.push(newPos);
  };

  Shape.prototype.draw = function() {
    strokeWeight(0.8);
    stroke(0, 10);

    if (showPath) {
      beginShape();
      this.shapePath.forEach(function(pos) {
        vertex(pos.x, pos.y);
      });
      endShape();
    }

    var currentIndex = floor(this.iterator);

    var currentPos = this.shapePath[currentIndex];
    var previousPos = this.shapePath[currentIndex - 1];
    if (previousPos) {
      var offsetPosA = p5.Vector.lerp(previousPos, currentPos, this.iterator - currentIndex);
      for (var i = 0; i < joints; i++) {
        var offsetPosB = p5.Vector.fromAngle(
          (PI / (i + 1)) +
          this.iterator /
          pow(-2, joints - i) * speed
        );
        offsetPosB.setMag((amplitude / joints) * (joints - i));
        offsetPosB.add(offsetPosA);

        if (showPendulum) {
          fill(0, 10);
          ellipse(offsetPosA.x, offsetPosA.y, 4, 4);
          noFill();
          line(offsetPosA.x, offsetPosA.y, offsetPosB.x, offsetPosB.y);
        }

        offsetPosA = offsetPosB;

        this.pendulumPath[i].push(offsetPosA);
      }

      if (showPendulumPath) {
        strokeWeight(1.6);
        this.pendulumPath.forEach(function(path, index) {
          beginShape();
          stroke(360 / joints * index, 80, 60, 50);
          path.forEach(function(pos) {
            curveVertex(pos.x, pos.y);
          });
          endShape();
        });
      }
    }
  };

  Shape.prototype.update = function() {
    this.iterator += resolution;
    if (this.iterator >= this.shapePath.length - 1) {
      this.iterator = 0;
      this.pendulumPath = [];
      for (var i = 0; i < joints; i++) {
        this.pendulumPath.push([]);
      }
    }
  };
}

function mousePressed() {
  newShape = new Shape();
  newShape.addPos(mouseX, mouseY);
}

function mouseReleased() {
  shapes.push(newShape);
  newShape = undefined;
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
}
