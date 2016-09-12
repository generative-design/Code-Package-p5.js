// P_4_2_1_01.js
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
 * collage generator. example footage can be found in "_4_2_1_footage".
 * if you use your own footage, make sure to rename the files or adjust the prefixes: 
 * see the parameters of generateCollageItems()
 * 
 * KEYS
 * 1-3                  : create a new collage (layer specific)
 * s                    : save png
 */
'use strict';

var images = new Array();
var imageNames = new Array();
var imageCount;

var layer1Items = new Array(); 
var layer2Items = new Array(); 
var layer3Items= new Array();


var collageHeight = 768;
var collageWidth = 1024;

function preload() {
   	// ------ load shapes ------
	// replace this location with a folder on your machine or use selectFolder()
	// maybe can be done an other way
   	images.push(loadImage("data/layer1_01.png"));
   	imageNames.push("layer1_01.png");
   	images.push(loadImage("data/layer1_02.png"));
   	imageNames.push("layer1_02.png");
   	images.push(loadImage("data/layer1_03.png"));
   	imageNames.push("layer1_03.png");
   	images.push(loadImage("data/layer1_04.png"));
   	imageNames.push("layer1_04.png");
   	images.push(loadImage("data/layer1_05.png"));
   	imageNames.push("layer1_05.png");
   	images.push(loadImage("data/layer1_06.png"));
   	imageNames.push("layer1_06.png");
   	images.push(loadImage("data/layer1_07.png"));
   	imageNames.push("layer1_07.png");
   	images.push(loadImage("data/layer1_08.png"));
   	imageNames.push("layer1_08.png");
   	images.push(loadImage("data/layer1_09.png"));
   	imageNames.push("layer1_09.png");
   	images.push(loadImage("data/layer1_10.png"));
   	imageNames.push("layer1_10.png");
   	images.push(loadImage("data/layer1_11.png"));
   	imageNames.push("layer1_11.png");

   	images.push(loadImage("data/layer2_01.png"));
   	imageNames.push("layer2_01.png");
   	images.push(loadImage("data/layer2_02.png"));
   	imageNames.push("layer2_02.png");
   	images.push(loadImage("data/layer2_03.png"));
   	imageNames.push("layer2_03.png");
   	images.push(loadImage("data/layer2_04.png"));
   	imageNames.push("layer2_04.png");
   	images.push(loadImage("data/layer2_05.png"));
   	imageNames.push("layer2_05.png");
   	
   	images.push(loadImage("data/layer3_01.png"));
   	imageNames.push("layer3_01.png");
   	images.push(loadImage("data/layer3_02.png"));
   	imageNames.push("layer3_02.png");
   	images.push(loadImage("data/layer3_03.png"));
   	imageNames.push("layer3_03.png");
   	images.push(loadImage("data/layer3_04.png"));
   	imageNames.push("layer3_04.png");
   	images.push(loadImage("data/layer3_05.png"));
   	imageNames.push("layer3_05.png");
   	images.push(loadImage("data/layer3_06.png"));
   	imageNames.push("layer3_06.png");
   	images.push(loadImage("data/layer3_07.png"));
   	imageNames.push("layer3_07.png");
   	images.push(loadImage("data/layer3_08.png"));
   	imageNames.push("layer3_08.png");
   	images.push(loadImage("data/layer3_09.png"));
   	imageNames.push("layer3_09.png");
   	images.push(loadImage("data/layer3_10.png"));
   	imageNames.push("layer3_10.png");
   	images.push(loadImage("data/layer3_11.png"));
   	imageNames.push("layer3_11.png");
   	images.push(loadImage("data/layer3_12.png"));
   	imageNames.push("layer3_12.png");
   	images.push(loadImage("data/layer3_13.png"));
   	imageNames.push("layer3_13.png");
   	images.push(loadImage("data/layer3_14.png"));
   	imageNames.push("layer3_14.png");
   	images.push(loadImage("data/layer3_15.png"));
   	imageNames.push("layer3_15.png");
   	images.push(loadImage("data/layer3_16.png"));
   	imageNames.push("layer3_16.png");
   	images.push(loadImage("data/layer3_17.png"));
   	imageNames.push("layer3_17.png");
   	images.push(loadImage("data/layer3_18.png"));
   	imageNames.push("layer3_18.png");
   	images.push(loadImage("data/layer3_19.png"));
   	imageNames.push("layer3_19.png");
   	images.push(loadImage("data/layer3_20.png"));
   	imageNames.push("layer3_20.png");
   	images.push(loadImage("data/layer3_21.png"));
   	imageNames.push("layer3_21.png");
   	images.push(loadImage("data/layer3_22.png"));
   	imageNames.push("layer3_22.png");
}

function setup(){
	createCanvas(1024, 768);  //size should be multiple of img width and height
	imageMode('CENTER');
	background(255);
  	
  	layer1Items = generateCollageItems("layer1", 100, collageWidth/2,collageHeight/2, collageWidth,collageHeight, 0.1,0.5, 0,0);
  	layer2Items = generateCollageItems("layer2", 150, collageWidth/2,collageHeight/2, collageWidth,collageHeight, 0.1,0.3, -Math.PI/2,Math.PI/2);
  	layer3Items = generateCollageItems("layer3", 110, collageWidth/2,collageHeight/2, collageWidth,collageHeight, 0.1,0.85, 0,0);

  	// draw collage
  	drawCollageItems(layer1Items);
  	drawCollageItems(layer2Items);
  	drawCollageItems(layer3Items); 
};

function draw(){
	// keep the programm running
};

function keyReleased(){
    if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');

    if (key == '1')  layer1Items = generateCollageItems("layer1", getRandomInt(50,200), collageWidth/2,collageHeight/2,collageWidth,collageHeight, 0.1,0.5, 0,0);
	if (key == '2')  layer2Items = generateCollageItems("layer2", getRandomInt(25,300), 200,collageHeight*0.75,collageWidth,150, 0.1,getRandomArbitrary(0.3,0.8), -Math.PI/2,Math. PI/2);
  	if (key == '3') layer3Items = generateCollageItems("layer3", getRandomInt(50,300), collageWidth/2,collageHeight*0.66,collageWidth,collageHeight*0.66, 0.1,getRandomArbitrary(0.4,0.8), -0.05,0.05);
  	
  	// draw collage
  	background(255);
  	drawCollageItems(layer1Items);
  	drawCollageItems(layer2Items);
  	drawCollageItems(layer3Items);
};

var CollageItem = 
	{x : 0,
	 y : 0,
	 rotation : 0.0,
	 scaling : 1,
	 indexToImage : -1
};

// ------ collage items helper functions ------
function generateCollageItems(thePrefix, theCount, thePosX, thePosY, theRangeX, theRangeY, theScaleStart, theScaleEnd, therotationStart, therotationEnd) {
	// collect all images with the specified prefix
	var indexes = new Array();

	for (var i = 0; i < imageNames.length; i++){
		if (imageNames[i] != null) {
			if (imageNames[i].startsWith(thePrefix)){
				indexes = append(indexes, i);
			}
		}
	};

	var items = new Array();
	for (var i = 0 ; i < theCount; i++) {
		var posX = thePosX + getRandomArbitrary(-theRangeX/2,theRangeX/2);
		var posY = thePosY + getRandomArbitrary(-theRangeY/2,theRangeY/2);
		var scal = getRandomArbitrary(theScaleStart,theScaleEnd);
		var rot = getRandomArbitrary(therotationStart,therotationEnd);
		var indx = indexes[i%indexes.length];

		items.push({
			x : posX,
			y : posY,
			scaling : scal,
			rotation : rot,
			indexToImage : indx
		});		
	};
	return items;
};

function drawCollageItems(theItems) {
	for (var i = 0 ; i < theItems.length; i++) {
		push();
		translate(theItems[i].x, theItems[i].y);
	    rotate(theItems[i].rotation);
	    scale(theItems[i].scaling);
	    image(images[theItems[i].indexToImage], 0,0);
	    pop();
	}
};

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
};