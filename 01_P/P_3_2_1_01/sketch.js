// P_3_2_1_01.pde
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
 * typo outline displayed as dots and lines
 *
 * KEYS
 * a-z                  : text input (keyboard)
 * backspace            : delete last typed letter
 * ctrl                 : save png
 */

var textTyped = "Type ...!";

var font;


function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop();

  opentype.load('data/FreeSans.otf', function(err, f) {
    if (err) {
      print(err);
    } else {
      font = f;
      loop();
    }
  });
}

function draw() {
  if (!font) return;

  background(255);
  // margin border
  translate(20, 220);

  if (textTyped.length > 0) {
    // get a path from OpenType.js
    var fontPath = font.getPath(textTyped, 0, 0, 200);
    // convert it to a g.Path object
    var path = new g.Path(fontPath.commands);
    // resample it with equidistant points
    path = g.resampleByLength(path, 11);
    // path = g.resampleByAmount(path, 500);
    // lines
    stroke(181, 157, 0);
    strokeWeight(1.0);
    var l = 5;
    for (var i = 0; i < path.commands.length; i++) {
      var pnt = path.commands[i];
      line(pnt.x - l, pnt.y - l, pnt.x + l, pnt.y + l);
    }

    // dots
    fill(0);
    noStroke();
    var diameter = 7;
    for (var i = 0; i < path.commands.length; i++) {
      var pnt = path.commands[i];
      // on every 2nd point
      if (i % 2 == 0) {
        ellipse(pnt.x, pnt.y, diameter, diameter);
      }
    }
  }

  noLoop();
}

function keyReleased() {
  // export png
  if (keyCode == CONTROL) saveCanvas(gd.timestamp(), 'png');
}

function keyPressed() {
  if (keyCode == DELETE || keyCode == BACKSPACE) {
    if (textTyped.length > 0) {
      textTyped = textTyped.substring(0, textTyped.length - 1);
      loop();
    }
  }
}

function keyTyped() {
  if (keyCode >= 32) {
    textTyped += key;
    loop();
  }
}
