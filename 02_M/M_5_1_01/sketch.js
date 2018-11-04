// M_5_1_01
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
 * simple example of a recursive function
 *
 * KEYS
 * 1-9                 : recursion level
 * s                   : save png
 */
'use strict';

var sketch = function(p) {
  var recursionLevel = 6;
  var startRadius = 200;

  var width = 800;
  var height = 800;

  p.setup = function() {
    p.createCanvas(width,height);
  };

  p.draw = function() {
    p.background(255);
    p.smooth();
    p.noFill();
    p.strokeCap('PROJECT');

    p.translate(width / 2, height / 2);
    drawBranch(0, 0, startRadius, recursionLevel);
  };

  p.keyReleased = function(){
    if (p.key == 's' || p.key == 'S') p.saveCanvas(gd.timestamp(), 'png');
    if (p.key == 'p' || p.key == 'P') savePDF = true;

    if (p.key == '1') recursionLevel = 1;
    if (p.key == '2') recursionLevel = 2;
    if (p.key == '3') recursionLevel = 3;
    if (p.key == '4') recursionLevel = 4;
    if (p.key == '5') recursionLevel = 5;
    if (p.key == '6') recursionLevel = 6;
    if (p.key == '7') recursionLevel = 7;
    if (p.key == '8') recursionLevel = 8;
    if (p.key == '9') recursionLevel = 9;
    if (p.key == '0') recursionLevel = 0;
  };

  // ------ recursive function ------
  var drawBranch = function(x, y, radius, level){
    // draw arc
    p.strokeWeight(level * 2);
    p.stroke(0, 130, 164, 100);
    p.noFill();
    p.arc(x, y, radius * 2, radius * 2, -(Math.PI), 0);

    // draw center dot
    p.fill(0);
    p.noStroke();
    p.ellipse(x,y, level * 1.5,level * 1.5);

    // as long as level is greater than zero, draw sub-branches
    if (level > 0){
      // left branch
      drawBranch(x - radius, y + radius / 2, radius / 2, level - 1);
      // reight branch
      drawBranch(x + radius, y + radius / 2, radius / 2, level - 1);
    }
  };
};

var myp5 = new p5(sketch);
