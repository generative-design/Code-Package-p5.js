// P_3_2_1_02
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

// CREDITS
// FreeSans.otf (GNU FreeFont), see the readme files in data folder.

/**
 * fontgenerator with static elements (svg files)
 *
 * MOUSE
 * position x          : module rotation
 * position y          : module size
 *
 * KEYS
 * a-z                 : text input (keyboard)
 * alt                 : toggle modules
 * del, backspace      : remove last letter
 * ctrl                : save png + pdf
 */

var doSave = false;

var textTyped = "Type...!";

var font;

var shapeSet = 0;
var module1, module2;

function preload() {
  module1 = loadImage("data/A_01.svg");
  module2 = loadImage("data/A_02.svg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  opentype.load('data/FreeSans.otf', function(err, f) {
    if (err) {
      console.log(err);
    } else {
      font = f;
    }
  });
}

function draw() {
  background(255);
  noStroke();
  imageMode(CENTER);

  // margin border
  translate(60, 300);

  if (textTyped.length > 0 && font != undefined) {
    // get a path from OpenType.js
    var fontPath = font.getPath(textTyped, 0, 0, 200);
    // convert it to a g.Path object
    var path = new g.Path(fontPath.commands);
    // resample it with equidistant points
    path = g.resampleByLength(path, 6);

    // ------ svg modules ------
    // module1
    var diameter = 30;

    for (var i = 0; i < path.commands.length - 1; i++) {
      var pnt = path.commands[i];
      var nextPnt = path.commands[i + 1];

      // skip this loop if one of the points doesn't have coordinates (could happen for path closing commands)
      if (!pnt.x || !nextPnt.x) continue;

      // on every third point
      if (i % 3 == 0) {
        // rotate the module facing to the next one (i+1)
        push();
        var angle = atan2(pnt.y - nextPnt.y, pnt.x - nextPnt.x);
        translate(pnt.x, pnt.y);
        rotate(angle);
        rotate(radians(-mouseX));
        image(module1, 0, 0, diameter + (mouseY / 2.5), diameter + (mouseY / 2.5));
        pop();
      }
    }

    // module2
    diameter = 18;
    for (var i = 0; i < path.commands.length - 1; i++) {
      var pnt = path.commands[i];
      var nextPnt = path.commands[i + 1];

      // skip this loop if one of the points doesn't have coordinates (could happen for path closing commands)
      if (!pnt.x || !nextPnt.x) continue;

      // on every third point
      if (i % 3 == 0) {
        // rotate the module facing to the next one (i+1)
        push();
        var angle = atan2(pnt.y - nextPnt.y, pnt.x - nextPnt.x);
        translate(pnt.x, pnt.y);
        rotate(angle);
        rotate(radians(mouseX));
        image(module2, 0, 0, diameter + (mouseY / 2.5), diameter + (mouseY / 2.5));
        pop();
      }
    }

  }
}

function keyReleased() {
  // export png
  if (keyCode == CONTROL) saveCanvas(gd.timestamp(), 'png');
}

function keyPressed() {
  if (keyCode == DELETE || keyCode == BACKSPACE) {
    if (textTyped.length > 0) {
      textTyped = textTyped.substring(0, textTyped.length - 1);
    }
  }

  if (keyCode == ALT) {
    shapeSet = (shapeSet + 1) % 4;
    switch (shapeSet) {
      case 0:
        module1 = loadImage("data/A_01.svg");
        module2 = loadImage("data/A_02.svg");
        break;
      case 1:
        module1 = loadImage("data/B_01.svg");
        module2 = loadImage("data/B_02.svg");
        break;
      case 2:
        module1 = loadImage("data/C_01.svg");
        module2 = loadImage("data/C_02.svg");
        break;
      case 3:
        module1 = loadImage("data/D_01.svg");
        module2 = loadImage("data/D_02.svg");
        break;
    }
  }
}

function keyTyped() {
  if (keyCode >= 32) {
    textTyped += key;
  }
}
