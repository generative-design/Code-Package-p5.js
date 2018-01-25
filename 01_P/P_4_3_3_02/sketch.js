// P_4_3_3_02
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
 * generating a drawing with 3 brushes by analysing the pixels of a live video input
 *
 * KEYS
 * q                   : stop drawing
 * w                   : continue drawing
 * DEL/BACKSPACE       : clear display
 * s                   : save png
 */

'use strict';

var video;
var pixelIndex;
var c;
var x1, x2, x3, y1, y2, y3;
var curvePointX = 0;
var curvePointY = 0;
var counter;
var maxCounter = 100000;
var streamReady = false;

function setup() {
  createCanvas(640, 480);
  background(255);
  video = createCapture(VIDEO, function() { streamReady = true });
  video.size(width, height);
  video.hide();

  x1 = 0;
  y1 = height / 2;
  x2 = width / 2;
  y2 = 0;
  x3 = width;
  y3 = height / 2;
}

function draw() {
  if (streamReady) {
    noFill();

    // get actual webcam image
    video.loadPixels();

    // first line
    pixelIndex = ((video.width - 1 - int(x1)) + int(y1) * video.width) * 4;
    c = color(video.pixels[pixelIndex], video.pixels[pixelIndex + 1], video.pixels[pixelIndex + 2], video.pixels[pixelIndex + 3]);
    // convert color c to HSV
    var cHSV = chroma(red(c), green(c), blue(c));
    var hueValue = cHSV.get('hsv.h');
    strokeWeight(hueValue / 50);
    stroke(c);

    beginShape();
    curveVertex(x1, y1);
    curveVertex(x1, y1);
    for (var i = 0; i < 7; i++) {
      curvePointX = constrain(x1 + random(-50, 50), 0, width - 1);
      curvePointY = constrain(y1 + random(-50, 50), 0, height - 1);
      curveVertex(curvePointX, curvePointY);
    }
    curveVertex(curvePointX, curvePointY);
    endShape();
    x1 = curvePointX;
    y1 = curvePointY;

    // second line
    pixelIndex = ((video.width - 1 - int(x2)) + int(y2) * video.width) * 4;
    c = color(video.pixels[pixelIndex], video.pixels[pixelIndex + 1], video.pixels[pixelIndex + 2], video.pixels[pixelIndex + 3]);
    // convert color c to HSV
    var cHSV = chroma(red(c), green(c), blue(c));
    var saturationValue = cHSV.get('hsv.s');
    strokeWeight(saturationValue / 2);
    stroke(c);

    beginShape();
    curveVertex(x2, y2);
    curveVertex(x2, y2);
    for (var i = 0; i < 7; i++) {
      curvePointX = constrain(x2 + random(-50, 50), 0, width - 1);
      curvePointY = constrain(y2 + random(-50, 50), 0, height - 1);
      curveVertex(curvePointX, curvePointY);
    }
    curveVertex(curvePointX, curvePointY);
    endShape();
    x2 = curvePointX;
    y2 = curvePointY;

    // third line
    pixelIndex = ((video.width - 1 - int(x3)) + int(y3) * video.width) * 4;
    c = color(video.pixels[pixelIndex], video.pixels[pixelIndex + 1], video.pixels[pixelIndex + 2], video.pixels[pixelIndex + 3]);
    // convert color c to HSV
    var cHSV = chroma(red(c), green(c), blue(c));
    var brightnessValue = cHSV.get('hsv.v');
    strokeWeight(brightnessValue / 100);
    stroke(c);

    beginShape();
    curveVertex(x3, y3);
    curveVertex(x3, y3);
    for (var i = 0; i < 7; i++) {
      curvePointX = constrain(x3 + random(-50, 50), 0, width - 1);
      curvePointY = constrain(y3 + random(-50, 50), 0, height - 1);
      curveVertex(curvePointX, curvePointY);
    }
    curveVertex(curvePointX, curvePointY);
    endShape();
    x3 = curvePointX;
    y3 = curvePointY;

    counter++;
    if (counter >= maxCounter) noLoop();
  }
}

function keyReleased() {
  if (keyCode == DELETE || keyCode == BACKSPACE) clear();
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
  if (key == 'q' || key == 'Q') noLoop();
  if (key == 'w' || key == 'W') loop();
}
