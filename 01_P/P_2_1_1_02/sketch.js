// P_2_0_03.pde
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
 * changing strokeweight on diagonals in a grid with colors
 *   
 * MOUSE
 * position x          : left diagonal strokeweight
 * position y          : right diagonal strokeweight
 * left click          : new random layout
 * 
 * KEYS
 * s                   : save png
 * 1                   : round strokecap
 * 2                   : square strokecap
 * 3                   : project strokecap
 * 4                   : color left diagonal
 * 5                   : color right diagonal
 * 6                   : transparency left diagonal
 * 7                   : transparency right diagonal
 * 0                   : default
 */

var tileCount = 20;

var colorLeft;
var colorRight;

var alphaLeft = 100;
var alphaRight = 100;

var actRandomSeed;
var actStrokeCap;

function setup() {
  createCanvas(600, 600);

  colorLeft = color(197, 0, 123);
  colorRight = color(87, 35, 129);

  actRandomSeed = 0;
  actStrokeCap = ROUND;

}


function draw() {
  colorMode(HSB, 360, 100, 100, 100);
  background(0, 0, 360);
  smooth();
  noFill();
  strokeCap(actStrokeCap);
  
  randomSeed(actRandomSeed);

  for (var gridY=0; gridY<tileCount; gridY++) {
    for (var gridX=0; gridX<tileCount; gridX++) {

      var posX = width/tileCount*gridX;
      var posY = height/tileCount*gridY;

      var toggle = int(random(0,2));

      if (toggle == 0) {
        stroke(colorLeft, alphaLeft);
        strokeWeight(mouseX/10);
        line(posX, posY, posX+width/tileCount, posY+height/tileCount);
      }
      if (toggle == 1) {
        stroke(colorRight, alphaRight);
        strokeWeight(mouseY/10);
        line(posX, posY+width/tileCount, posX+height/tileCount, posY);
      }
    }
  }
}


function mousePressed() {
  actRandomSeed = int(random(100000));
}

function keyReleased(){
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
  
  if (key == '1') actStrokeCap = ROUND;  
  if (key == '2') actStrokeCap = SQUARE;
  if (key == '3') actStrokeCap = PROJECT; 

  if (key == '4'){
    if (colorLeft == color(0, 0, 0)) {
      colorLeft = color(323, 100, 77);
    } else {
      colorLeft = color(0);
    } 
  }
  if (key == '5'){
    if (colorRight == color(0, 0, 0)) {
      colorRight = color(273, 73, 51);
    } else {
      colorRight = color(0, 0, 0);
    } 
  }
  
  if (key == '6') {
    if (alphaLeft == 100) {
      alphaLeft = 50;
    } else {
      alphaLeft = 100;
    }
  }
  if (key == '7') {
    if (alphaRight == 100) {
      alphaRight = 50;
    } else {
      alphaRight = 100;
    }
  }
    
  if (key == '0'){
    actStrokeCap = ROUND;
    colorLeft = color(0 , 0, 0);
    colorRight = color(0, 0, 0);
    alphaLeft = 100;
    alphaRight = 100;
  }

}
