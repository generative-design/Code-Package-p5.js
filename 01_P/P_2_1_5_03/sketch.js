// P_2_1_5_03
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
 * rectangles of various widths, lengths, angles and colours.
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
 *
 * CONTRIBUTED BY
 * [Niels Poldervaart](http://NielsPoldervaart.nl)
 */
'use strict';

var shapes = [];
var density = 2.5;
var shapeHeight = 64;
var shapeColor;

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
    newShape.x2 = mouseX;
    newShape.y2 = mouseY;
    newShape.h = shapeHeight;
    newShape.c = shapeColor;
    newShape.draw();
  }
}

function Shape(x1, y1, x2, y2, h, c) {
  this.x1 = x1;
  this.y1 = y1;
  this.x2 = x2;
  this.y2 = y2;
  this.h = h;
  this.c = c;

  Shape.prototype.draw = function() {
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
  newShape = new Shape(pmouseX, pmouseY, mouseX, mouseY, shapeHeight, shapeColor);
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

  if (keyCode == UP_ARROW) shapeHeight += density;
  if (keyCode == DOWN_ARROW) shapeHeight -= density;
}
