// P_4_3_3_01
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
 * generating a drawing by analysing the pixels of a live video input
 *
 * MOUSE
 * position x          : drawing speed
 * position y          : diffusion
 *
 * KEYS
 * arrow up            : number of curve points +
 * arrow down          : number of curve points -
 * q                   : stop drawing
 * w                   : continue drawing
 * DEL/BACKSPACE       : clear display
 * s                   : save png
 */

'use strict';

var video;
var x;
var y;
var curvePointX = 0;
var curvePointY = 0;
var pointCount = 1;
var diffusion = 50;
var streamReady = false;

function setup() {
  createCanvas(640, 480);
  background(255);
  x = width / 2;
  y = height / 2;
  video = createCapture(VIDEO, function() {
    streamReady = true
  });
  video.size(width, height);
  video.hide();
  noFill();
}

function draw() {
  if (streamReady) {
    for (var j = 0; j <= mouseX / 50; j++) {
      // get actual web cam image
      video.loadPixels();

      // first line
      var pixelIndex = ((video.width - 1 - x) + y * video.width) * 4;
      var c = color(video.pixels[pixelIndex], video.pixels[pixelIndex + 1], video.pixels[pixelIndex + 2]);

      // convert color c to HSV
      var cHSV = chroma(red(c), green(c), blue(c));
      strokeWeight(cHSV.get('hsv.h') / 50);
      stroke(c);

      diffusion = map(mouseY, 0, height, 5, 100);

      beginShape();
      curveVertex(x, y);
      curveVertex(x, y);

      for (var i = 0; i < pointCount; i++) {
        var rx = int(random(-diffusion, diffusion));
        curvePointX = constrain(x + rx, 0, width - 1);
        var ry = int(random(-diffusion, diffusion));
        curvePointY = constrain(y + ry, 0, height - 1);
        curveVertex(curvePointX, curvePointY);
      }

      curveVertex(curvePointX, curvePointY);
      endShape();

      x = curvePointX;
      y = curvePointY;
    }
  }
}

function keyReleased() {
  if (keyCode == DELETE || keyCode == BACKSPACE) clear();
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
  if (key == 'q' || key == 'Q') noLoop();
  if (key == 'w' || key == 'W') loop();
  if (keyCode == UP_ARROW) pointCount = min(pointCount + 1, 30);
  if (keyCode == DOWN_ARROW) pointCount = max(pointCount - 1, 1);
}
