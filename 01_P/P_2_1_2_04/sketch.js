// P_2_1_2_04.pde
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
 * moving corners of rectangles in a grid
 *   
 * MOUSE
 * position x          : corner position offset x
 * position y          : corner position offset y
 * left click          : random position
 * 
 * KEYS
 * s                   : save png
 */
 

var tileCount = 20;
var rectSize = 30;

var actRandomSeed = 0;


function setup(){
  createCanvas(600, 600);
}


function draw() {
  colorMode(HSB, 360, 100, 100, 100);
  background(0, 0, 360);
  smooth();
  noStroke();

  fill(192,100,64,60);

  randomSeed(actRandomSeed);

  for (var gridY=0; gridY<tileCount; gridY++) {
    for (var gridX=0; gridX<tileCount; gridX++) {
      
      var posX = width/tileCount * gridX;
      var posY = height/tileCount * gridY;

      var shiftX1 = mouseX/20 * random(-1, 1);
      var shiftY1 = mouseY/20 * random(-1, 1);
      var shiftX2 = mouseX/20 * random(-1, 1);
      var shiftY2 = mouseY/20 * random(-1, 1);
      var shiftX3 = mouseX/20 * random(-1, 1);
      var shiftY3 = mouseY/20 * random(-1, 1);
      var shiftX4 = mouseX/20 * random(-1, 1);
      var shiftY4 = mouseY/20 * random(-1, 1);
     
      beginShape();
      vertex(posX+shiftX1, posY+shiftY1);
      vertex(posX+rectSize+shiftX2, posY+shiftY2);
      vertex(posX+rectSize+shiftX3, posY+rectSize+shiftY3);
      vertex(posX+shiftX4, posY+rectSize+shiftY4);
      endShape(CLOSE);
    }
  } 
  
}


function mousePressed() {
  actRandomSeed = int(random(100000));
}


function keyReleased(){
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
}
