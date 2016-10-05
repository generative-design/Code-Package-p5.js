// P_4_3_1_02.pde
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
 * pixel mapping. each pixel is translated into a new element (svg file).
 * take care to sort the svg file according to their greyscale value.
 * see also "_4_3_1_02_analyse_svg_grayscale.pde" 
 * 
 * KEYS
 * s                   : save png
 * p                   : save pdf
 */
 'use strict';

var savePDF = false;

var shapes = new Array();
var shapeCount = 0;

var img;

function preload() {
   	img = loadImage("data/pic.png");

	// ------ load shapes ------
	// replace this location with a folder on your machine or use selectFolder()
	// maybe can be done an other way
   	shapes.push(loadImage("data/056.svg"));
	shapes[1] = loadImage("data/076.svg");
	shapes[2] = loadImage("data/082.svg");
	shapes[3] = loadImage("data/096.svg");
	shapes[4] = loadImage("data/117.svg");
	shapes[5] = loadImage("data/148.svg");
	shapes[6] = loadImage("data/152.svg");
	shapes[7] = loadImage("data/157.svg");
	shapes[8] = loadImage("data/164.svg");
	shapes[9] = loadImage("data/166.svg");
	shapes[10] = loadImage("data/186.svg");
	shapes[11] = loadImage("data/198.svg");
	shapes[12] = loadImage("data/224.svg");
}

function setup(){
	createCanvas(600, 900); 
	smooth();
	image(img, 0, 0);
	console.log(img.width+" x "+img.height);

	shapeCount = shapes.length;
	  
	console.log(shapeCount);
};

function draw(){
	if(savePDF){
	  		beginRecord();
	};	
	background(255);

	for (var gridX = 0; gridX < img.width; gridX++){
		for(var gridY = 0; gridY < img.height; gridY++){
			// grid position + title size
			var titleWidth = 603 / img.width;
			var titleHeight = 873 / img.height;
			var posX = titleWidth*gridX;
			var posY = titleHeight*gridY;

			// get current color
			img.loadPixels();
			var c = img.get(min(gridX,img.width-1), gridY);
			// greyscale conversion
			var greyscale = Math.round(red(c)*0.222 + green(c)*0.707 + blue(c)*0.071);
			var gradientToIndex = Math.round(map(greyscale, 0,255, 0,shapeCount-1));
			image(shapes[gradientToIndex], posX,posY, titleWidth,titleHeight);
		}
	}
	if (savePDF) {
	    savePDF = false;
	    endRecord();
	}	

}

function keyReleased(){
    if (key == 's' || key == 'S') p.saveCanvas(gd.timestamp(), 'png');
	if (key == 'p' || key == 'P') savePDF = true;	
}
