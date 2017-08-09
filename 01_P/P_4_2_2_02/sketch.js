// P_4_2_2_02.pde
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
 * simple timelapse camera, after each intervalTime a picture is saved.
 *
 */
'use strict';

var cam;

// intervalTime in sec. here 5 min
var intervalTime = 5 * 60;

var secondsSinceStart = 0;
var startTime = gd.timestamp();
var counter = 0;
var doSave = true;
var streamReady = false;

function setup() {
  createCanvas(640, 480);
  cam = createCapture(VIDEO, function() { streamReady = true });
  cam.hide();
  noStroke();
}

function draw() {
  if (streamReady) {
    image(cam, 0, 0, width, width * cam.height / cam.width);

    secondsSinceStart = millis() / 1000;
    var interval = int(secondsSinceStart % intervalTime);

    if (interval == 0 && doSave == true) {
      var saveFileName = startTime + '-' + nf(counter, 5, 0);
      saveCanvas(saveFileName, 'png');
      doSave = false;
      counter++;
    } else if (interval != 0) {
      doSave = true;
    }

    // visualize the time to the next shot
    fill(random(0, 255), random(0, 255), random(0, 255));
    rect(map(interval, 0, intervalTime, 0, width), 0, 5, 5);
  }
}
