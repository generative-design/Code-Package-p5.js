// M_1_3_02.pde
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
 * creates a texture based on random values
 *
 * MOUSE
 * click               : new noise line
 *
 * KEYS
 * s                   : save png
 */
'use strict';

var sketch = function( p ) {

  var actRandomSeed = 0;

  p.setup = function() {
    p.createCanvas(512,512);
  }

  p.draw = function() {
    p.background(0);

    p.randomSeed(actRandomSeed);

    for (var x = 0; x < p.width; x++) {
      for (var y = 0; y < p.height; y++) {
        p.set(x, y, p.random(255));
      }
    }
    p.updatePixels();
  }

  p.mousePressed = function() {
    actRandomSeed = p.random(100000);
  }

  p.keyReleased = function() {
    if (p.key == 's' || p.key == 'S') p.saveCanvas(gd.timestamp(), 'png');
  }

};

var myp5 = new p5(sketch);