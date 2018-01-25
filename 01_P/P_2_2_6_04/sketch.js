// P_2_2_6_04
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
 * Drawing tool that moves a branching pendulum contraption along paths drawn by the mouse.
 * The last joint of the pendulum leaves behind its own trail.
 *
 * MOUSE
 * mouse               : click and drag to create a path to draw a pendulum along with
 *
 * KEYS
 * 1                   : toggle path line
 * 2                   : toggle pendulum
 * 3                   : toggle pendulum path
 * 4                   : toggle fill mode
 * arrow up            : increase length of lines
 * arrow down          : decrease length of lines
 * arrow left          : decrease gravity
 * arrow right         : increase gravity
 * del, backspace      : clear screen
 * s                   : save png
 *
 * CONTRIBUTED BY
 * [Niels Poldervaart](http://NielsPoldervaart.nl)
 */
'use strict';

var shapes = [];

var newShape;

var joints = 5;
var lineLength = 32;
var resolution = 0.04;
var gravity = 0.099;
var damping = 0.995;
var maxArms = 3;
var armSizeDeviation = 0.2;

var showPath = true;
var showPendulum = true;
var showPendulumPath = true;
var fillMode = true;

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

function Shape(pendulumPathColor) {
  this.shapePath = [];
  this.pendulumPath = [];
  this.pendulumPathColor = pendulumPathColor;
  this.iterator = 0;
  this.lineLength = lineLength;
  this.resolution = resolution;
  this.pendulum = new Pendulum(this.lineLength, joints);

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

    if (showPendulumPath && this.pendulumPath.length) {
      strokeWeight(1);
      stroke(this.pendulumPathColor);

      if (fillMode) {
        var c = this.pendulumPathColor;
        fill(hue(c), saturation(c), brightness(c), 10);
        this.pendulumPath.forEach(function(group) {
          beginShape();
          group.forEach(function(pos) {
            vertex(pos.x, pos.y);
          });
          endShape();
        });
        noFill();
      } else {
        this.pendulumPath[0].forEach(function(undefined, column) {
          beginShape();
          this.pendulumPath.forEach(function(pos) {
            vertex(pos[column].x, pos[column].y);
          });
          endShape();
        }.bind(this));
      }
    }

    if (this.iterator < this.shapePath.length) {
      var currentIndex = floor(this.iterator);

      var currentPos = this.shapePath[currentIndex];
      var previousPos = this.shapePath[currentIndex - 1];
      if (previousPos) {
        var offsetPos = p5.Vector.lerp(previousPos, currentPos, this.iterator - currentIndex);
        var heading = atan2(currentPos.y - previousPos.y, currentPos.x - previousPos.x) - HALF_PI;

        push();
        translate(offsetPos.x, offsetPos.y);
        this.pendulum.update(heading);
        if (showPendulum) {
          this.pendulum.draw();
        }
        pop();

        this.pendulumPath.push(this.pendulum.getTrail(offsetPos));
      }
    }
  };

  Shape.prototype.update = function() {
    this.iterator += this.resolution;
    this.iterator = constrain(this.iterator, 0, this.shapePath.length);
  };
}

function Pendulum(size, hierarchy) {
  this.hierarchy = hierarchy - 1;
  this.armCount = floor(random(1, maxArms + 1));
  this.pendulumArms = [];
  this.size = size;
  this.angle = random(TAU);
  this.origin = createVector(0, 0);
  this.end = createVector(0, 0);
  this.gravity = gravity;
  this.damping = damping;
  this.angularAcceleration = 0;
  this.angularVelocity = 0;

  for (var i = 0; i < this.armCount && this.hierarchy > 0; i++) {
    this.pendulumArms.push(new Pendulum(this.size / randomGaussian(1.5, armSizeDeviation), this.hierarchy));
  }

  Pendulum.prototype.update = function(heading) {
    this.end.set(this.origin.x + this.size * sin(this.angle), this.origin.y + this.size * cos(this.angle));

    this.angularAcceleration = (-this.gravity / this.size) * sin(this.angle + heading);
    this.angle += this.angularVelocity;
    this.angularVelocity += this.angularAcceleration;
    this.angularVelocity *= this.damping;

    this.pendulumArms.forEach(function(pendulumArm) {
      pendulumArm.update(heading);
    });
  };

  Pendulum.prototype.getTrail = function(offset, pendulumTrailPaths) {
    pendulumTrailPaths = pendulumTrailPaths || [];

    offset = offset.copy().add(this.end);

    this.pendulumArms.forEach(function(pendulumArm) {
      if (pendulumArm.pendulumArms.length) {
        pendulumArm.getTrail(offset, pendulumTrailPaths);
      } else {
        pendulumTrailPaths.push(offset.copy().add(pendulumArm.end));
      }
    });

    return pendulumTrailPaths;
  };

  Pendulum.prototype.draw = function() {
    stroke(0, 40);
    beginShape();
    vertex(this.origin.x, this.origin.y);
    vertex(this.end.x, this.end.y);
    endShape();

    fill(0, 20);
    ellipse(this.end.x, this.end.y, 2, 2);
    noFill();

    this.pendulumArms.forEach(function(pendulumArm) {
      push();
      translate(this.end.x, this.end.y);
      pendulumArm.draw();
      pop();
    }.bind(this));
  };
}

function mousePressed() {
  newShape = new Shape(color(random(360), 80, 60, 50));
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
  if (keyCode == LEFT_ARROW) gravity -= 0.001;
  if (keyCode == RIGHT_ARROW) gravity += 0.001;

  if (key == '1') showPath = !showPath;
  if (key == '2') showPendulum = !showPendulum;
  if (key == '3') showPendulumPath = !showPendulumPath;
  if (key == '4') fillMode = !fillMode;
}
