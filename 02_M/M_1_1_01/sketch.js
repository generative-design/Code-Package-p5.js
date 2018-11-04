// M_1_1_01
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
 * draws a random chart and shows how to use randomSeed.
 *
 * MOUSE
 * click               : new random line
 *
 * KEYS
 * s                   : save png
 */
'use strict';

var sketch = function(p) {

  var actRandomSeed = 42;

  p.setup = function() {
    p.createCanvas(1024, 256);
  };

  p.draw = function() {
    p.background(255);

    // line
    p.stroke(0,130,164);
    p.strokeWeight(1);
    p.strokeJoin(p.ROUND);
    p.noFill();

    p.randomSeed(actRandomSeed);
    p.beginShape();
    for (var x = 0; x < p.width; x += 10) {
      var y = p.random(0,p.height);
      p.vertex(x,y);
    }
    p.endShape();

    // dots
    p.noStroke();
    p.fill(0);

    p.randomSeed(actRandomSeed);
    for (var x = 0; x < p.width; x += 10) {
      var y = p.random(0,p.height);
      p.ellipse(x,y,3,3);
    }
  };

  p.mousePressed = function() {
    actRandomSeed = p.random(100000);
  };

  p.keyReleased = function(){
    if (p.key == 's' || p.key == 'S') p.saveCanvas(gd.timestamp(), 'png');
  };

};

var myp5 = new p5(sketch);
