// P_4_2_1_02.js
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
 * radial collage generator. example footage can be found in "_4_2_1_footage".
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
  	
  	// ------ init ------
	// generateCollageItems(filename prefix, count, angle,distance, angle range,distance range, scaleStart,scaleEnd, rotationStart,rotationEnd)
	// filname prefix               : Alle Bilder, deren Name so beginnt, werden für diesen Layer verwendet
	// count                        : Anzahl der Bilder
	// angle                        : Winkel, um die sich die Bilder scharen
	// distance                     : Distanz vom Mittelpunkt, um die sich die Bilder scharen
	// angle range                  : Winkelbereich, in dem die Bilder gestreut werden (z.B. TWO_PI/3 füllt einen Drittel-Kreis)
	// distance range               : Bereich für die Distanz, in der die Bilder gestreut werden (z.B. distance=300 und distanceRange=100 streut die Positionen in einen Ring von 100 Pixel Dicke)
	// scale start, scale end       : Minimaler und maximaler Wert für den zufälligen Skalierungsfaktor
	// rotation start, rotation end : Minimaler und maximaler Wert für den zufälligen Rotationswinkel
  layer1Items = generateCollageItems("layer1", 100, 0,collageHeight/2, Math.PI*2, collageHeight, 0.1,0.5, 0,0);
  layer2Items = generateCollageItems("layer2", 150, 0,collageHeight/2, Math.PI*2, collageHeight, 0.1,0.3,-Math.PI/6,Math.PI/6);
	layer3Items = generateCollageItems("layer3", 110, 0,collageHeight/2, Math.PI*2, collageHeight, 0.1,0.85, 0,0);

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
	
  if (key == '1')  layer1Items = generateCollageItems("layer1", getRandomInt(50,200), 0,collageHeight/2, Math.PI*5,collageHeight, 0.1,0.5, 0,0);
	if (key == '2')  layer2Items = generateCollageItems("layer2", getRandomInt(25,300), 0,collageHeight*0.15,Math.PI*5,150, 0.1,getRandomArbitrary(0.3,0.8), -Math.PI/6,Math. PI/6);
  if (key == '3') layer3Items = generateCollageItems("layer3", getRandomInt(50,300), 0,collageHeight*0.66,Math.PI*5,collageHeight*0.66, 0.1,getRandomArbitrary(0.2,0.5), -0.05,0.05);
  	
  // draw collage
  background(255);
  drawCollageItems(layer1Items);
  drawCollageItems(layer2Items);
  drawCollageItems(layer3Items);
};

// ------ collage items helper functions ------
function generateCollageItems(thePrefix, theCount, theAngle, theLength, theRangeA, theRangeL, theScaleStart, theScaleEnd, theRotationStart, theRotationEnd) {
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
		var indx = indexes[i%indexes.length]; 
		var ang =  getRandomArbitrary(-Math.PI*5/2,Math.PI*5/2) + theAngle;
		var len = theLength + getRandomArbitrary(-theRangeL/2,theRangeL/2);
		var scal = getRandomArbitrary(theScaleStart,theScaleEnd);
		var rot = ang + (Math.PI/2) + getRandomArbitrary(theRotationStart,theRotationEnd);
		console.log(rot)
		items.push({
			a : ang,
			l : len,
			rotation : rot,
			scaling : scal,
			indexToImage : indx
		});		
	};
	return items;
};

function drawCollageItems(theItems) {
	for (var i = 0 ; i < theItems.length; i++) {
		push();
		var newX  = 0.0 + width/2 + Math.cos(theItems[i].a) * theItems[i].l;
    	var newY  = 0.0 + height/2 + Math.sin(theItems[i].a) * theItems[i].l; 
    	translate(newX, newY);
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