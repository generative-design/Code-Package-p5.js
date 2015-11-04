// P_2_1_2_02.pde
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
 * changing module color and positions in a grid
 *   
 * MOUSE
 * position x          : offset x
 * position y          : offset y
 * left click          : random position
 * 
 * KEYS
 * 1-3                 : different sets of colors
 * 0                   : default
 * arrow up/down       : background module size
 * arrow left/right    : foreground module size
 * s                   : save png
 */


var moduleColorBackground, moduleColorForeground;

var moduleAlphaBackground = 100;
var moduleAlphaForeground = 100;

var moduleRadiusBackground = 30;
var moduleRadiusForeground = 15;

var backColor;


var tileCount = 20;
var actRandomSeed = 0;

function setup(){
  createCanvas(600, 600);

  colorMode(RGB, 255, 255, 255, 100);

  moduleColorBackground = color(0, 0, 0, moduleAlphaBackground);
  moduleColorForeground = color(255, 255, 255, moduleAlphaForeground);

  backColor = color(255);
}

function draw() {
  translate(width/tileCount/2, height/tileCount/2);

  colorMode(HSB, 360, 100, 100, 100);
  background(backColor);
  smooth();
  noStroke();

  randomSeed(actRandomSeed);

  for (var gridY=0; gridY<tileCount; gridY++) {
    for (var gridX=0; gridX<tileCount; gridX++) {
      var posX = width/tileCount * gridX;
      var posY = height/tileCount * gridY;

      var shiftX =  random(-1, 1) * mouseX/20;
      var shiftY =  random(-1, 1) * mouseY/20;

      fill(moduleColorBackground);
      ellipse(posX+shiftX, posY+shiftY, moduleRadiusBackground, moduleRadiusBackground);
    }
  }

  for (var gridY=0; gridY<tileCount; gridY++) {
    for (var gridX=0; gridX<tileCount; gridX++) {

      var posX = width/tileCount * gridX;
      var posY = height/tileCount * gridY;

      fill(moduleColorForeground);
      ellipse(posX, posY, moduleRadiusForeground, moduleRadiusForeground);
    }
  }

}

function mousePressed() {
  actRandomSeed = int(random(100000));
}

function keyReleased(){

  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');

  if (key == '1'){
    if (moduleColorBackground.toString() == color(0, 0, 0, moduleAlphaBackground).toString()) {
      moduleColorBackground = color(273, 73, 51, moduleAlphaBackground);
    } 
    else {
      moduleColorBackground = color(0, 0, 0, moduleAlphaBackground);
    } 
  }
  if (key == '2'){
    if (moduleColorForeground.toString() == color(360, 100, 100, moduleAlphaForeground).toString()) {
      moduleColorForeground = color(323, 100, 77, moduleAlphaForeground);
    } 
    else {
      moduleColorForeground = color(360, 100, 100, moduleAlphaForeground);
    } 
  }

  if (key == '3'){
    if (moduleAlphaBackground == 100) {
      moduleAlphaBackground = 50;
      moduleAlphaForeground = 50;
    } 
    else {
      moduleAlphaBackground = 100;
      moduleAlphaForeground = 100;
    }

    moduleColorBackground = color(moduleColorBackground.getHue(), moduleColorBackground.getSaturation(), moduleColorBackground.getBrightness(), moduleAlphaBackground);
    moduleColorForeground = color(moduleColorForeground.getHue(), moduleColorForeground.getSaturation(), moduleColorForeground.getBrightness(), moduleAlphaForeground);

  }


  if (key == '0'){  
    moduleRadiusBackground = 20;
    moduleRadiusForeground = 10;
    moduleAlphaBackground = 100;
    moduleAlphaForeground = 100;
    moduleColorBackground = color(0, 0, 0, moduleAlphaBackground);
    moduleColorForeground = color(360, 100, 100, moduleAlphaForeground);
  }

  if (keyCode == UP_ARROW) moduleRadiusBackground += 2;
  if (keyCode == DOWN_ARROW) moduleRadiusBackground = max(moduleRadiusBackground-2, 10);
  if (keyCode == LEFT_ARROW) moduleRadiusForeground = max(moduleRadiusForeground-2, 5);
  if (keyCode == RIGHT_ARROW) moduleRadiusForeground += 2;

}
