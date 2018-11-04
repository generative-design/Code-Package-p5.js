// P_4_2_2_01
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
 * simple tabular overview of a video file.
 *
 * KEYS
 * s                  : save png
 */

'use strict';

// horizontal and vertical grid count
// take care of the aspect ratio ... here 4:3
var tileCountX = 9;
var tileCountY = 12;
var tileWidth;
var tileHeight;
var imageCount = tileCountX * tileCountY;
var currentImage = 0;
var gridX = 0;
var gridY = 0;

var movie;

function preload() {
  movie = createVideo(['data/video.mp4', 'data/video.ogg',]);
  movie.hide();
}

function setup() {
  createCanvas(1024, 1024);
  background(0);

  tileWidth = width / tileCountX;
  tileHeight = height / tileCountY;
  print(movie.width + ' • ' + movie.height);
}

function draw() {
  if (movie.elt.readyState == 4) {
    var posX = tileWidth * gridX;
    var posY = tileHeight * gridY;

    // draw video
    image(movie, posX, posY, tileWidth, tileHeight);

    currentImage++;

    // seek the video to next time
    var nextTime = map(currentImage, 0, imageCount, 0, movie.duration());
    print('seek to: ' + movie.time());
    movie.time(nextTime);

    // new grid position
    gridX++;
    if (gridX >= tileCountX) {
      gridX = 0;
      gridY++;
    }

    if (currentImage >= imageCount) noLoop();
  }
}

function keyReleased() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
}
