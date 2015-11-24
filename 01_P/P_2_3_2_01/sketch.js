// P_2_3_2_01.pde
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
 * draw tool. shows how to work with relations between elements. 
 * 
 * MOUSE
 * drag                : draw
 * 
 * KEYS
 * 1                   : draw mode 1 - fixed distance
 * 2                   : draw mode 2 - distance threshold 
 * del, backspace      : clear screen
 * arrow up            : line length +
 * arrow down          : line length -
 * s                   : save png
 */

var drawMode = 1;

var col;
var x = 0, y = 0;
var stepSize = 5.0;
var lineLength = 25;


function setup() {
  col = color(random(255),random(255),random(255),random(100));
  // use full screen size 
  createCanvas(displayWidth, displayHeight);
  background(255);
  smooth();
  x = mouseX;
  y = mouseY;
  cursor(CROSS);
}


function draw() {
  if (mouseIsPressed) {
    var d = dist(x,y, mouseX,mouseY);

    if (d > stepSize) {
      var angle = atan2(mouseY-y, mouseX-x); 

      push();
      translate(x,y);
      rotate(angle);
      stroke(col);
      if (frameCount % 2 == 0) stroke(150);
      line(0,0,0,lineLength*random(0.95,1.0)*d/10);
      pop();

      if (drawMode == 1) {
        x = x + cos(angle) * stepSize;
        y = y + sin(angle) * stepSize; 
      } 
      else {
        x  = mouseX;
        y  = mouseY; 
      }
    }
  }
}

function mousePressed() {
  x = mouseX;
  y = mouseY;
  col = color(random(255),random(255),random(255),random(100));
  //lineLength = random(15,50);
}

function keyReleased() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
  if (keyCode == DELETE || keyCode == BACKSPACE) background(255);

  if (key == '1') drawMode = 1;
  if (key == '2') drawMode = 2;
}

function keyPressed() {
  // lineLength ctrls arrowkeys up/down 
  if (keyCode == UP_ARROW) lineLength += 5;
  if (keyCode == DOWN_ARROW) lineLength -= 5; 
}
