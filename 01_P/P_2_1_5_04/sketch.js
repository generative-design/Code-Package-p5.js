// P_2_1_5_04
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
'use strict';

var shapes = [];
var density = 2.5;
var shapeHeight = 64;
var shapeColor;
var smoothness = 0;

var newShape;

function setup() {
  createCanvas(800, 800);
  noFill();
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
      this.shapePath.length == 0 ||
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

  if (keyCode == RIGHT_ARROW) smoothness += density;
  if (keyCode == LEFT_ARROW) smoothness -= density;

  if (keyCode == UP_ARROW) shapeHeight += density;
  if (keyCode == DOWN_ARROW) shapeHeight -= density;
}
