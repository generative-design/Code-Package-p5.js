// P_2_3_4_01.pde
//
// Generative Gestaltung, ISBN: 978-3-87439-759-9
// First Edition, Hermann Schmidt, Mainz, 2009
// Hartmut Bohnacker, Benedikt Gross, Julia Laub, Claudius Lazzeroni
// Copyright 2009 Hartmut Bohnacker, Benedikt Gross, Julia Laub, Claudius Lazzeroni
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
 * draw tool. shows how to draw with dynamic elements.
 *
 * MOUSE
 * drag                : draw
 *
 * KEYS
 * 1-9                 : switch module
 * del, backspace      : clear screen
 * arrow up            : module size +
 * arrow down          : module size -
 * arrow left          : step size -
 * arrow right         : step size +
 * s                   : save png
 */
'use strict';

var x = 0, y = 0;
var stepSize = 5.0;
var moduleSize = 25;

var lineModule;
var elements = [];

function preload() {
  // preload svg for line module
  elements[0] = loadImage("data/01.svg");
  elements[1] = loadImage("data/02.svg");
  elements[2] = loadImage("data/03.svg");
  elements[3] = loadImage("data/04.svg");
  elements[4] = loadImage("data/05.svg");
  elements[5] = loadImage("data/06.svg");
  elements[6] = loadImage("data/07.svg");
  elements[7] = loadImage("data/08.svg");
  elements[8] = loadImage("data/09.svg");
}

function setup() {
  // use full screen size
  createCanvas(displayWidth, displayHeight);
  background(255);
  x = mouseX;
  y = mouseY;
  cursor(CROSS);
  lineModule = elements[0];
}

function draw() {
  if (mouseIsPressed) {
    var d = dist(x,y, mouseX,mouseY);

    if (d > stepSize) {
      var angle = atan2(mouseY-y, mouseX-x);

      push();
      translate(mouseX, mouseY);
      rotate(angle+PI);
      image(lineModule, 0, 0, d, moduleSize);
      pop();

      x = x + cos(angle) * stepSize;
      y = y + sin(angle) * stepSize;
    }
  }
}

function mousePressed() {
  x = mouseX;
  y = mouseY;
}

function keyReleased() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
  if (keyCode == DELETE || keyCode == BACKSPACE) background(255);

  if (key=='1') lineModule = elements[0];
  if (key=='2') lineModule = elements[1];
  if (key=='3') lineModule = elements[2];
  if (key=='4') lineModule = elements[3];
  if (key=='5') lineModule = elements[4];
  if (key=='6') lineModule = elements[5];
  if (key=='7') lineModule = elements[6];
  if (key=='8') lineModule = elements[7];
  if (key=='9') lineModule = elements[8];
}

function keyPressed() {
    // moduleSize arrowkeys up/down
    if (keyCode == UP_ARROW) moduleSize += 5;
    if (keyCode == DOWN_ARROW) moduleSize -= 5;
    // stepSize arrowkeys left/right
    stepSize = max(stepSize,0.5);
    if (keyCode == LEFT_ARROW) stepSize -= 0.5;
    if (keyCode == RIGHT_ARROW) stepSize += 0.5;
    console.log("moduleSize: "+moduleSize+"  stepSize: "+stepSize);
}
