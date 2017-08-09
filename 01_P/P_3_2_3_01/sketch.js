// P_3_2_3_01.pde
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
 * fontgenerator with dynamic elements. letter ouline consist of linked agents.
 *
 * MOUSE
 * press + position x  : letter distortion
 *
 * KEYS
 * a-z                 : text input (keyboard)
 * alt                 : freeze current state
 * del, backspace      : clear screen
 * ctrl                : save png
 */

var typedKey = 'a';
var fontPath;

var spacing = 20;
var spaceWidth = 80; // width of letter ' '
var fontSize = 200;
var lineSpacing = fontSize * 1.2;
var textW = 0;
var letterX = 50 + spacing;
var letterY = lineSpacing;

var stepSize = 2;
var danceFactor = 1;

var font;
var pnts;

var freeze = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop();

  opentype.load('data/FreeSansNoPunch.otf', function(err, f) {
    if (err) {
      print(err);
    } else {
      font = f;
      pnts = getPoints(typedKey);
      loop();
    }
  });
}

function draw() {
  if (!font) return;

  noFill();
  push();

  // translation according the actual writing position
  translate(letterX, letterY);

  // distortion on/off
  danceFactor = 1;
  if (mouseIsPressed) danceFactor = map(mouseX, 0, width, 0, 3);

  // are there points to draw?
  if (pnts.length > 0) {
    // let the points dance
    for (var i = 0; i < pnts.length; i++) {
      pnts[i].x += random(-stepSize, stepSize) * danceFactor;
      pnts[i].y += random(-stepSize, stepSize) * danceFactor;
    }

    //  ------ lines: connected straight  ------
    strokeWeight(0.1);
    stroke(0);
    beginShape();
    for (var i = 0; i < pnts.length; i++) {
      vertex(pnts[i].x, pnts[i].y);
      ellipse(pnts[i].x, pnts[i].y, 7, 7);
    }
    vertex(pnts[0].x, pnts[0].y);
    endShape();

    //  ------ lines: connected rounded  ------
    /*
      strokeWeight(0.08);

      beginShape();
      // start controlpoint
      curveVertex(pnts[pnts.length-1].x, pnts[pnts.length-1].y);
      // only these points are drawn
      for (var i = 0; i < pnts.length; i++) {
        curveVertex(pnts[i].x, pnts[i].y);
      }
      curveVertex(pnts[0].x, pnts[0].y);
      // end controlpoint
      curveVertex(pnts[1].x, pnts[1].y);
      endShape();
    */
  }

  pop();
}

function getPoints() {
  fontPath = font.getPath(typedKey, 0, 0, 200);
  var path = new g.Path(fontPath.commands);
  path = g.resampleByLength(path, 25);
  textW = path.bounds().width;
  // remove all commands without a coordinate
  for (var i = path.commands.length-1; i >= 0 ; i--) {
    if (path.commands[i].x == undefined) {
      path.commands.splice(i, 1);
    }
  }
  return path.commands;
}

function keyReleased() {
  // export png
  if (keyCode === CONTROL) saveCanvas(gd.timestamp(), 'png');
  if (keyCode == ALT) {
    // switch loop on/off
    freeze = !freeze;
    if (freeze) {
      noLoop();
    } else {
      loop();
    }
  }
}

function keyPressed() {
  switch (keyCode) {
    case ENTER:
    case RETURN:
      typedKey = '';
      pnts = getPoints(typedKey);
      letterY += lineSpacing;
      letterX = 50;
      break;
    case BACKSPACE:
    case DELETE:
      background(255);
      typedKey = '';
      pnts = getPoints(typedKey);
      letterX = 50;
      letterY = lineSpacing;
      freeze = false;
      loop();
      break;
  }
}

function keyTyped() {
  if (keyCode >= 32) {
    if (keyCode == 32) {
      typedKey = '';
      letterX += textW + spaceWidth;
      pnts = getPoints(typedKey);
    } else {
      typedKey = key;
      letterX += textW + spacing;
      pnts = getPoints(typedKey);
    }
    freeze = false;
    loop();
  }
}
