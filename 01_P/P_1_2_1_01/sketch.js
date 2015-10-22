// P_1_2_1_01.pde
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
 * shows how to interpolate colors in different styles/ color modes
 * 
 * MOUSE
 * left click          : new random color set
 * position x          : interpolation resolution
 * position y          : row count
 * 
 * KEYS
 * 1-2                 : switch interpolation style
 * s                   : save png
 */
 
var tileCountX = 2;
var tileCountY = 10;

var colorsLeft = []
var colorsRight = [];

var interpolateShortest = true;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB);
  noStroke();
  shakeColors();
  console.log(color(0));
}

function draw() {
  tileCountX = int(map(mouseX,0,width,2,100));
  tileCountY = int(map(mouseY,0,height,2,10));
  var tileWidth = width / tileCountX;
  var tileHeight = height / tileCountY;
  var interCol;
    
  for (var gridY=0; gridY< tileCountY; gridY++) {
    var col1 = colorsLeft[gridY];
    var col2 = colorsRight[gridY];

    for (var gridX=0; gridX< tileCountX ; gridX++) { 
      var amount = map(gridX,0,tileCountX-1,0,1);
      
      if (interpolateShortest) {
        // switch to rgb
        colorMode(RGB);
        interCol = lerpColor(col1,col2, amount); 
        // switch back
        colorMode(HSB);
      } else {
        interCol = lerpColor(col1,col2, amount); 
      }

      fill(interCol);
      
      var posX = tileWidth*gridX;
      var posY = tileHeight*gridY;      
      rect(posX, posY, tileWidth, tileHeight); 
    }
  }
}

function shakeColors() {
  for (var i=0; i<tileCountY; i++) {
    colorsLeft[i] = color(random(0,60), random(0,100), 100);
    colorsRight[i] = color(random(160,190), 100, random(0,100));
  }
}

function mouseReleased() {
  shakeColors();
}

function keyPressed() {
  if (key=='s' || key=='S') saveCanvas(gd.timestamp(), 'png');
  if (key == '1') interpolateShortest = true;
  if (key == '2') interpolateShortest = false;
}