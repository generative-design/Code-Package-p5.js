// P_2_2_6_01_class_version
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
 * A chain of linked pendulums. Each a little shorter and faster than the one it's linked to.
 * Each joint of the pendulum leaves behind its own trail.
 *
 * KEYS
 * 1                   : toggle pendulum
 * 2                   : toggle pendulum path
 * -                   : decrease speed relation
 * +                   : increase speed relation
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

var shape;

var joints = 5;
var lineLength = 100;
var speedRelation = 2;

var showPendulum = true;
var showPendulumPath = true;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);
  noFill();
  strokeWeight(1);
  startDrawing();
}

function draw() {
  background(0, 0, 100);

  shape.draw();
}

function startDrawing() {
  shape = new Shape(width / 2, height / 2, joints, lineLength, speedRelation);
}

function Shape(x, y, joints, lineLength, speedRelation, speed) {

  this.center = createVector(x, y);
  this.pendulumPath = [];
  this.angle = 0;
  this.maxAngle = 360;
  this.joints = joints;
  this.lineLength = lineLength;
  this.speedRelation = speedRelation || 2;
  this.speed = speed || (8 / pow(1.75, this.joints - 1) / pow(2, speedRelation - 1));

  // new empty array for each joint
  for (var i = 0; i < this.joints; i++) {
    this.pendulumPath.push([]);
  }

  Shape.prototype.draw = function() {
    this.angle += this.speed;

    if (this.angle <= this.maxAngle + this.speed) {
      // start at the center position
      var pos = this.center.copy();

      for (var i = 0; i < this.joints; i++) {
        var a = this.angle * pow(speedRelation, i);
        if (i % 2 == 1) a = -a;

        var nextPos = p5.Vector.fromAngle(radians(a));

        nextPos.setMag((this.lineLength / this.joints) * (this.joints - i));
        nextPos.add(pos);

        if (showPendulum) {
          noStroke();
          fill(0, 10);
          ellipse(pos.x, pos.y, 4, 4);
          noFill();
          stroke(0, 10);
          line(pos.x, pos.y, nextPos.x, nextPos.y);
        }

        pos = nextPos;

        this.pendulumPath[i].push(pos);
      }
    }

    if (showPendulumPath) {
      strokeWeight(1.6);
      for (var i = 0; i < this.pendulumPath.length; i++) {
        var path = this.pendulumPath[i];

        beginShape();
        var hue = map(i, 0, this.joints, 120, 360);
        stroke(hue, 80, 60, 50);
        for (var j = 0; j < path.length; j++) {
          vertex(path[j].x, path[j].y);
        }
        endShape();
      }
    }
  };

}

function keyPressed() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');

  if (keyCode == DELETE || keyCode == BACKSPACE) {
    startDrawing();
  }

  if (keyCode == UP_ARROW) {
    lineLength += 2;
    startDrawing();
  }
  if (keyCode == DOWN_ARROW) {
    lineLength -= 2;
    startDrawing();
  }
  if (keyCode == LEFT_ARROW) {
    joints--;
    if (joints < 1) joints = 1;
    startDrawing();
  }
  if (keyCode == RIGHT_ARROW) {
    joints++;
    if (joints > 10) joints = 10;
    startDrawing();
  }

  if (key == '+') {
    speedRelation += 0.5;
    if (speedRelation > 5) speedRelation = 5;
    startDrawing();
  }
  if (key == '-') {
    speedRelation -= 0.5;
    if (speedRelation < 2) speedRelation = 2;
    startDrawing();
  }

  if (key == '1') showPendulum = !showPendulum;
  if (key == '2') showPendulumPath = !showPendulumPath;
}
