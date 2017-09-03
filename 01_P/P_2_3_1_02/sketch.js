// P_2_3_1_02
//
// Generative Gestaltung, ISBN: 978-3-87439-759-9
// First Edition, Hermann Schmidt, Mainz, 2009
// Hartmut Bohnacker, Benedikt Gross, Julia Laub, Claudius Lazzeroni
// Copyright 2009 Hartmut Bohnacker, Benedikt Gross, Julia Laub, Claudius Lazzeroni
//
// http://www.generative-gestaltung.de
//
// Licensed under the Apache License, Version 2.0 (the 'License');
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * draw tool. draw with a rotating element (svg file).
 *
 * MOUSE
 * drag                : draw
 *
 * KEYS
 * 1-4                 : switch default colors
 * 5-9                 : switch brush element
 * delete/backspace    : clear screen
 * d                   : reverse direction and mirrow angle
 * space               : new random color
 * arrow left          : rotaion speed -
 * arrow right         : rotaion speed +
 * arrow up            : module size +
 * arrow down          : module size -
 * shift               : limit drawing direction
 * s                   : save png
 */
'use strict';

var c;
var lineModuleSize = 0;
var angle = 0;
var angleSpeed = 1;
var lineModule = [];
var lineModuleIndex = 0;

var clickPosX = 0;
var clickPosY = 0;

function preload() {
  lineModule[1] = loadImage('data/02.svg');
  lineModule[2] = loadImage('data/03.svg');
  lineModule[3] = loadImage('data/04.svg');
  lineModule[4] = loadImage('data/05.svg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  cursor(CROSS);
  strokeWeight(0.75);

  c = color(181, 157, 0);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  if (mouseIsPressed && mouseButton == LEFT) {
    var x = mouseX;
    var y = mouseY;
    if (keyIsPressed && keyCode == SHIFT) {
      if (abs(clickPosX - x) > abs(clickPosY - y)) {
        y = clickPosY;
      } else {
        x = clickPosX;
      }
    }

    push();
    translate(x, y);
    rotate(radians(angle));
    if (lineModuleIndex != 0) {
      tint(c);
      image(lineModule[lineModuleIndex], 0, 0, lineModuleSize, lineModuleSize);
    } else {
      stroke(c);
      line(0, 0, lineModuleSize, lineModuleSize);
    }
    angle += angleSpeed;
    pop();
  }
}

function mousePressed() {
  // create a new random color and line length
  lineModuleSize = random(50, 160);

  // remember click position
  clickPosX = mouseX;
  clickPosY = mouseY;
}

function keyPressed() {
  if (keyCode == UP_ARROW) lineModuleSize += 5;
  if (keyCode == DOWN_ARROW) lineModuleSize -= 5;
  if (keyCode == LEFT_ARROW) angleSpeed -= 0.5;
  if (keyCode == RIGHT_ARROW) angleSpeed += 0.5;
}

function keyReleased() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
  if (keyCode == DELETE || keyCode == BACKSPACE) background(255);

  // reverse direction and mirror angle
  if (key == 'd' || key == 'D') {
    angle += 180;
    angleSpeed *= -1;
  }

  // change color
  if (key == ' ') c = color(random(255), random(255), random(255), random(80, 100));
  //default colors from 1 to 4
  if (key == '1') c = color(181, 157, 0);
  if (key == '2') c = color(0, 130, 164);
  if (key == '3') c = color(87, 35, 129);
  if (key == '4') c = color(197, 0, 123);

  // load svg for line module
  if (key == '5') lineModuleIndex = 0;
  if (key == '6') lineModuleIndex = 1;
  if (key == '7') lineModuleIndex = 2;
  if (key == '8') lineModuleIndex = 3;
  if (key == '9') lineModuleIndex = 4;
}
