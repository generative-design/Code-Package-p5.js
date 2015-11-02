// P_2_1_1_04.pde
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
 * shapes in a grid, that are always facing the mouse
 *   
 * MOUSE
 * position x/y        : position to face
 * 
 * KEYS
 * 1-7                 : choose shapes
 * arrow up/down       : scale of shapes
 * arrow left/right    : additional rotation of shapes
 * c                   : toggle. color mode
 * d                   : toggle. size depending on distance
 * g                   : toggle. grid resolution
 * s                   : save png
 */

var currentShape;

var tileCount = 10;
var tileWidth, tileHeight;
var shapeSize = 50;
var newShapeSize = shapeSize;
var shapeAngle = 0;
var maxDist;

var shapeColor;
var fillMode = 0;
var sizeMode = 0;

function preload() {
    currentShape = loadSVG('data/module_1.svg');
}

function setup(){
  createCanvas(600, 600);
  background(255);
  shapeColor = color(0, 130, 164)
  smooth();

  tileWidth = width/int(tileCount);
  tileHeight = height/int(tileCount);
  maxDist = sqrt(sq(width)+sq(height));
  console.info(currentShape);
} 


function draw(){

  background(255);
  smooth();

  for (var gridY=0; gridY<tileCount; gridY++) {
    for (var gridX=0; gridX<tileCount; gridX++) {

      var posX = tileWidth*gridX + tileWidth/2;
      var posY = tileHeight*gridY + tileWidth/2;

      // calculate angle between mouse position and actual position of the shape
      var angle = atan2(mouseY-posY, mouseX-posX) + radians(shapeAngle);

      if (sizeMode == 0) newShapeSize = shapeSize;
      if (sizeMode == 1) newShapeSize = shapeSize*1.5-map(dist(mouseX,mouseY,posX,posY),0,500,5,shapeSize);
      if (sizeMode == 2) newShapeSize = map(dist(mouseX,mouseY,posX,posY),0,500,5,shapeSize);

      // if (fillMode == 0) currentShape.enableStyle();
      if (fillMode == 1) {
        // currentShape.disableStyle();
        fill(shapeColor);      
      }
      if (fillMode == 2) {
        // currentShape.disableStyle();
        var a = map(dist(mouseX,mouseY,posX,posY), 0,maxDist, 255,0);
        fill(shapeColor, a);      
      }
      if (fillMode == 3) {
        // currentShape.disableStyle();
        var a = map(dist(mouseX,mouseY,posX,posY), 0,maxDist, 0,255);
        fill(shapeColor, a);      
      }

      push();
      translate(posX, posY);
      rotate (angle);
      shapeMode (CENTER);

      noStroke();
      shape(currentShape, 0,0, newShapeSize,newShapeSize);
      pop();
    }
  }

}



function keyReleased(){
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');

  if (key == '1'){
    if (colorLeft.toString() == color(273, 73, 51, alphaLeft).toString()) {
      colorLeft = color(323, 100, 77, alphaLeft);
    } 
    else {
      colorLeft = color(273, 73, 51, alphaLeft);
    } 
  }
  if (key == '2'){
    if (colorRight.toString() == color(0, 0, 0, alphaRight).toString()) {
      colorRight = color(192, 100, 64, alphaRight);
    } 
    else {
      colorRight = color(0, 0, 0, alphaRight);
    } 
  }
  if (key == '3'){
    console.info(colorLeft);
    transparentLeft =! transparentLeft;
  }
  if (key == '4'){
    transparentRight =! transparentRight;
  }

  if (key == '0'){
    transparentLeft = false;
    transparentRight = false;
      colorLeft = color(323, 100, 77, alphaLeft);
      colorRight = color(0, 0, 0, alphaRight);
  }
}

