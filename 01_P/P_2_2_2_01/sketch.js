// P_2_2_2_01.pde
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
 * draw the path of an intelligent agent
 *
 * MOUSE
 * position x          : composition speed of the picture
 *
 * KEYS
 * Delete/Backspace    : clear display
 * s                   : save png
 */


var directions = [
  "NORTH",
  "EAST",
  "SOUTH",
  "WEST"
];
var direction = 2;

var stepSize = 1;
var minLength = 10;
var diameter = 1;
var angleCount = 7;
var angle;

var posX;
var posY;
var posXcross;
var posYcross;


function setup(){
  createCanvas(800,800);
  background(255);
  angle = getRandomAngle(directions[direction]);
  posX = width / 2;
  posY = height / 2;
}

function draw() {
  for (var i = 0; i <= mouseX; i++) {
     // ------ draw dot at current position ------
    strokeWeight(1);
    stroke(180);
    point(posX,posY);

    // ------ make step ------
    posX += cos(radians(angle)) * stepSize;
    posY += sin(radians(angle)) * stepSize;

    var reachedBorder = false;

    if (posY <= 5) {
      direction = directions.indexOf("SOUTH");
      reachedBorder = true;
    } else if (posX >= width - 5) {
      direction = directions.indexOf("WEST");
      reachedBorder = true;
    } else if (posY >= height - 5) {
      direction = directions.indexOf("NORTH");
      reachedBorder = true;
    } else if (posX <= 5) {
      direction = directions.indexOf("EAST");
      reachedBorder = true;
    }

    // ------ if agent is crossing his path or border was reached ------
    if (get(int(posX)/4,int(posY)) != color(255) || reachedBorder) {
      angle = getRandomAngle(directions[direction]);
      var distance = dist(posX,posY,posXcross,posYcross);
      if (distance >= minLength) {
        strokeWeight(3);
        stroke(0);
        line(posX, posY, posXcross, posYcross);
      }
      posXcross = posX;
      posYcross = posY;
    }
  }
}

function keyReleased(){
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
  if (keyCode === DELETE || keyCode === BACKSPACE) background(255);
  if (key === ' ') noLoop();
}

function getRandomAngle(currentDirection) {
  var angle = (floor(random(-angleCount,angleCount)) + 0.5) * 90 / angleCount;
  if (currentDirection === "NORTH") return angle - 90;
  if (currentDirection === "EAST") return angle;
  if (currentDirection === "SOUTH") return angle + 90;
  if (currentDirection === "WEST") return angle + 180;
}