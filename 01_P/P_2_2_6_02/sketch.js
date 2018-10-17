// P_2_2_6_02
//
// Generative Gestaltung – Creative Coding im Web
// ISBN: 978-3-87439-902-9, First Edition, Hermann Schmidt, Mainz, 2018
// Benedikt Groß, Hartmut Bohnacker, Julia Laub, Claudius Lazzeroni
// with contributions by Joey Lee and Niels Poldervaart
// Copyright 2018
//
// http://www.generative-gestaltung.de
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * Drawing tool that moves a pendulum-esq contraption along paths drawn by the mouse.
 * Each joint of the pendulum leaves behind its own trail.
 *
 * MOUSE
 * mouse               : click and drag to create a path to draw a pendulum along with
 *
 * KEYS
 * 1                   : toggle path line
 * 2                   : toggle pendulum
 * 3                   : toggle pendulum path
 * -                   : decrease speed
 * +                   : increase speed
 * arrow down          : decrease length of lines
 * arrow up            : increase length of lines
 * arrow left          : decrease joints
 * arrow right         : increase joints
 * del, backspace      : clear screen
 * s                   : save png
 *
 * CONTRIBUTED BY
 * [Niels Poldervaart](http://NielsPoldervaart.nl)
 */
'use strict';

var shapes = [];

var newShape;

var joints = 8;
var lineLength = 32;
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

function Shape(lineLength, speed, resolution, joints) {
  this.shapePath = [];
  this.pendulumPath = [];
  this.iterator = 0;
  this.lineLength = lineLength;
  this.speed = speed;
  this.resolution = resolution;
  this.joints = joints;

  for (var i = 0; i < this.joints; i++) {
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
      for (var i = 0; i < this.joints; i++) {
        var offsetPosB = p5.Vector.fromAngle(
          (PI / (i + 1)) +
          this.iterator /
          pow(-2, this.joints - i) * this.speed
        );
        offsetPosB.setMag((this.lineLength / this.joints) * (this.joints - i));
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
          stroke(360 / this.joints * index, 80, 60, 50);
          path.forEach(function(pos) {
            curveVertex(pos.x, pos.y);
          });
          endShape();
        }.bind(this));
      }
    }
  };

  Shape.prototype.update = function() {
    this.iterator += this.resolution;
    this.iterator = constrain(this.iterator, 0, this.shapePath.length);
  };
}

function mousePressed() {
  newShape = new Shape(lineLength, speed, resolution, joints);
  newShape.addPos(mouseX, mouseY);
}

function mouseReleased() {
  shapes.push(newShape);
  newShape = undefined;
}

function keyPressed() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');

  if (keyCode == DELETE || keyCode == BACKSPACE) {
    shapes = [];
    newShape = undefined;
  }

  if (keyCode == UP_ARROW) lineLength += 2;
  if (keyCode == DOWN_ARROW) lineLength -= 2;
  if (keyCode == LEFT_ARROW) {
    joints--;
    joints = max(1, joints);
  }
  if (keyCode == RIGHT_ARROW) {
    joints++
    joints = max(1, joints);
  };

  if (key == '1') showPath = !showPath;
  if (key == '2') showPendulum = !showPendulum;
  if (key == '3') showPendulumPath = !showPendulumPath;

  if (key == '+') speed += 0.5;
  if (key == '-') speed -= 0.5;
}
