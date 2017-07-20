// P_3_2_2_01.pde
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
 * fontgenerator with dynamic elements
 * 
 * MOUSE
 * position x          : curve rotation
 * position y          : curve height
 * 
 * KEYS
 * a-z                 : text input (keyboard)
 * del, backspace      : remove last letter
 * alt                 : toggle fill style
 * ctrl                : save png
 */

var textTyped = "Charles Mingus";

var font;

var filled = false;

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
  if (filled) {
    noStroke();
    fill(0);
  }
  else {
    noFill();
    stroke(0);
    strokeWeight(2);
  }

  // margin border
  translate(20, 260);

  if (textTyped.length > 0) {
    // get a path from OpenType.js
    var fontPath = font.getPath(textTyped, 0, 0, 200);
    // convert it to a g.Path object
    var path = new g.Path(fontPath.commands);
    // resample it with equidistant points
    path = g.resampleByLength(path, 11);
    // path = g.resampleByAmount(path, 500);

    // map mouse axis
    var addToAngle = map(mouseX, 0, width, -PI, +PI);
    var curveHeight = map(mouseY, 0, height, 0.1, 2);


    for (var i = 0; i < path.commands.length-1; i++) {
      var pnt0 = path.commands[i];
      var pnt1 = path.commands[i+1];
      var d = dist(pnt0.x, pnt0.y, pnt1.x, pnt1.y);

      // create a gap between each letter
      if (d > 20) continue;

      // alternate in every step from -1 to 1
      var stepper = map(i%2, 0, 1, -1, 1);
      var angle = atan2(pnt1.y - pnt0.y, pnt1.x - pnt0.x);
      angle = angle + addToAngle;

      var cx = pnt0.x + cos(angle*stepper) * d*4 * curveHeight;
      var cy = pnt0.y + sin(angle*stepper) * d*3 * curveHeight;

      bezier(pnt0.x,pnt0.y,  cx,cy, cx,cy,  pnt1.x,pnt1.y);
    }

  }
}

function keyReleased() {
  // export png
  if (keyCode === CONTROL) saveCanvas(gd.timestamp(), 'png');
  if (keyCode == ALT) filled = !filled;
}

function keyPressed() {
  if (keyCode === DELETE || keyCode === BACKSPACE) {
    if (textTyped.length > 0) {
      textTyped = textTyped.substring(0, textTyped.length - 1);
    }
  }
}

function keyTyped() {
  if (keyCode >= 32){
    textTyped += key;
  }
}