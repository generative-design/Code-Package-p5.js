// Cover_Lines
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
 * KEYS
 * s             : save png
 */

'use strict';

var colorPoints = [];
var ribbon;

// chose 8 for print quality (caution: very slow)
var mmToPx = 2;

// these are in mm:
var coverWidth = 800;
var coverHeight = 600;

function setup() {
  createCanvas(coverWidth * mmToPx, coverHeight * mmToPx);

  // create colorPoints
  for (var i = 0; i < imageColors.length; i++) {
    var c = color(imageColors[i].r, imageColors[i].g, imageColors[i].b, imageColors[i].a);
    colorPoints.push(new ColorPoint(c));
  }

  scale(mmToPx);

  // E Einleitung
  ribbon = new Ribbon(colorPoints.slice(0, 41), 300, { n: 30, step: 0.15, damp: 0.02, minW: 20, maxW: 100 });
  ribbon.draw(250, 200);

  // P.0 p5.js-Einführung
  // ribbon = new Ribbon(colorPoints.slice(41, 57), 300, { n: 30, step: 0.1, damp: 0.02, minW: 20, maxW: 100 });
  // ribbon.draw(250, 50);

  // P.1 Color
  // ribbon = new Ribbon(colorPoints.slice(57, 77), 300, { n: 30, step: 0.2, damp:0.02, minW: 20, maxW: 100 });
  // ribbon.draw(350, 200);

  // P.2 Shape
  // ribbon = new Ribbon(colorPoints.slice(77, 149), 300, { n: 30, step: 0.15, damp:0.02, minW: 30, maxW: 130 });
  // ribbon.draw(500, 350);

  // P.3 Type
  // ribbon = new Ribbon(colorPoints.slice(149, 187), 300, { n: 30, step: 0.1, damp:0.02, minW: 20, maxW: 100 });
  // ribbon.draw(350, 350);

  // P.4 Image
  // ribbon = new Ribbon(colorPoints.slice(187, 225), 300, { n: 30, step: 0.1, damp:0.02, minW: 20, maxW: 100 });
  // ribbon.draw(600, 150);

  // A Anhang
  // ribbon = new Ribbon(colorPoints.slice(225, 258), 300, { n: 30, step: 0.1, damp:0.02, minW: 20, maxW: 100 });
  // ribbon.draw(300, 50);

  noLoop();

}

function keyReleased() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
}
