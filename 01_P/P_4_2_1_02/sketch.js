// P_4_2_1_02
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
 * radial collage generator. example footage can be found in "P_4_2_1_footage".
 * if you use your own footage, make sure to rename the files or adjust the prefixes:
 * see the parameters of generateCollageItems()
 *
 * KEYS
 * 1-3                  : create a new collage (layer specific)
 * s                    : save png
 */
'use strict';

var layer1Images = [];
var layer2Images = [];
var layer3Images = [];

var layer1Items = [];
var layer2Items = [];
var layer3Items = [];


function preload() {
  layer1Images.push(loadImage('../../data/P_4_2_1_footage/layer1_01.png'));
  layer1Images.push(loadImage('../../data/P_4_2_1_footage/layer1_02.png'));
  layer1Images.push(loadImage('../../data/P_4_2_1_footage/layer1_03.png'));
  layer1Images.push(loadImage('../../data/P_4_2_1_footage/layer1_04.png'));
  layer1Images.push(loadImage('../../data/P_4_2_1_footage/layer1_05.png'));
  layer1Images.push(loadImage('../../data/P_4_2_1_footage/layer1_06.png'));
  layer1Images.push(loadImage('../../data/P_4_2_1_footage/layer1_07.png'));
  layer1Images.push(loadImage('../../data/P_4_2_1_footage/layer1_08.png'));
  layer1Images.push(loadImage('../../data/P_4_2_1_footage/layer1_09.png'));
  layer1Images.push(loadImage('../../data/P_4_2_1_footage/layer1_10.png'));
  layer1Images.push(loadImage('../../data/P_4_2_1_footage/layer1_11.png'));

  layer2Images.push(loadImage('../../data/P_4_2_1_footage/layer2_01.png'));
  layer2Images.push(loadImage('../../data/P_4_2_1_footage/layer2_02.png'));
  layer2Images.push(loadImage('../../data/P_4_2_1_footage/layer2_03.png'));
  layer2Images.push(loadImage('../../data/P_4_2_1_footage/layer2_04.png'));
  layer2Images.push(loadImage('../../data/P_4_2_1_footage/layer2_05.png'));

  layer3Images.push(loadImage('../../data/P_4_2_1_footage/layer3_01.png'));
  layer3Images.push(loadImage('../../data/P_4_2_1_footage/layer3_02.png'));
  layer3Images.push(loadImage('../../data/P_4_2_1_footage/layer3_03.png'));
  layer3Images.push(loadImage('../../data/P_4_2_1_footage/layer3_04.png'));
  layer3Images.push(loadImage('../../data/P_4_2_1_footage/layer3_05.png'));
  layer3Images.push(loadImage('../../data/P_4_2_1_footage/layer3_06.png'));
  layer3Images.push(loadImage('../../data/P_4_2_1_footage/layer3_07.png'));
  layer3Images.push(loadImage('../../data/P_4_2_1_footage/layer3_08.png'));
  layer3Images.push(loadImage('../../data/P_4_2_1_footage/layer3_09.png'));
  layer3Images.push(loadImage('../../data/P_4_2_1_footage/layer3_10.png'));
  layer3Images.push(loadImage('../../data/P_4_2_1_footage/layer3_11.png'));
  layer3Images.push(loadImage('../../data/P_4_2_1_footage/layer3_12.png'));
  layer3Images.push(loadImage('../../data/P_4_2_1_footage/layer3_13.png'));
  layer3Images.push(loadImage('../../data/P_4_2_1_footage/layer3_14.png'));
  layer3Images.push(loadImage('../../data/P_4_2_1_footage/layer3_15.png'));
  layer3Images.push(loadImage('../../data/P_4_2_1_footage/layer3_16.png'));
  layer3Images.push(loadImage('../../data/P_4_2_1_footage/layer3_17.png'));
  layer3Images.push(loadImage('../../data/P_4_2_1_footage/layer3_18.png'));
  layer3Images.push(loadImage('../../data/P_4_2_1_footage/layer3_19.png'));
  layer3Images.push(loadImage('../../data/P_4_2_1_footage/layer3_20.png'));
  layer3Images.push(loadImage('../../data/P_4_2_1_footage/layer3_21.png'));
  layer3Images.push(loadImage('../../data/P_4_2_1_footage/layer3_22.png'));
}

function setup() {
  createCanvas(1024, 768);
  imageMode(CENTER);

  layer1Items = generateCollageItems(layer1Images, 10, 0, height / 2, TAU, height, 0.1, 0.5, 0, 0);
  layer2Items = generateCollageItems(layer2Images, 15, 0, height / 2, TAU, height, 0.1, 0.3, -PI / 6, PI / 6);
  layer3Items = generateCollageItems(layer3Images, 11, 0, height / 2, TAU, height, 0.1, 0.2, 0, 0);

  drawCollageitems(layer1Items);
  drawCollageitems(layer2Items);
  drawCollageitems(layer3Items);
}

function keyReleased() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
  if (key == '1') layer1Items = generateCollageItems(layer1Images, random(2, 10), 0, height / 2, PI * 5, height, 0.1, 0.5, 0, 0);
  if (key == '2') layer2Items = generateCollageItems(layer2Images, random(10, 25), 0, height * 0.15, PI * 5, 150, 0.1, random(0.3, 0.8), -PI / 6, PI / 6);
  if (key == '3') layer3Items = generateCollageItems(layer3Images, random(10, 25), 0, height * 0.66, PI * 5, height * 0.66, 0.1, random(0.2, 0.5), -0.05, 0.05);

  clear();

  drawCollageitems(layer1Items);
  drawCollageitems(layer2Items);
  drawCollageitems(layer3Items);
}

function generateCollageItems(layerImages, count, angle, length, rangeA, rangeL, scaleStart, scaleEnd, rotationStart, rotationEnd) {
  var layerItems = [];
  for (var i = 0; i < layerImages.length; i++) {
    for (var j = 0; j < count; j++) {
      var collageItem = new CollageItem(layerImages[i]);
      collageItem.a = angle + random(-rangeA / 2, rangeA / 2);
      collageItem.l = length + random(-rangeL / 2, rangeL / 2);
      collageItem.scaling = random(scaleStart, scaleEnd);
      collageItem.rotation = collageItem.a + HALF_PI + random(rotationStart, rotationEnd);
      layerItems.push(collageItem);
    }
  }
  return layerItems;
}

function CollageItem(image) {
  this.a = 0;
  this.l = 0;
  this.rotation = 0;
  this.scaling = 1;
  this.image = image;
}

function drawCollageitems(layerItems) {
  for (var i = 0; i < layerItems.length; i++) {
    push();
    translate(
      width / 2 + cos(layerItems[i].a) * layerItems[i].l,
      height / 2 + sin(layerItems[i].a) * layerItems[i].l
    );
    rotate(layerItems[i].rotation);
    scale(layerItems[i].scaling);
    image(layerItems[i].image, 0, 0);
    pop();
  }
}
