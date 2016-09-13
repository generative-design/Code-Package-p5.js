// P_2_1_1_04.js
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
 * shapes in a grid, that are always facing the mouse
 * 	 
 * MOUSE
 * position x/y        : position to face
 * 
 * KEYS
 * 1-7                 : choose shapes
 * arrow up/down       : scale of shapes
 * arrow left/right    : additional rotation of shapes
 * c                   : toggle. color mode
 * d                   : toggle. size depending on distance
 * g                   : toggle. grid resolution
 * s                   : save png
 * p                   : save pdf
 */
 // shapes not overlapping
'use strict';

	var savePDF = false;

	var currentShape;

	var tileCount = 10;
	var tileWidth;
	var tileHeight;
	var shapeSize = 50.0;
	var newShapeSize = shapeSize;
	var shapeAngle = 0.0;
	var maxDist;

	var shapeColor = [0, 130, 164];
	var fillMode = 0;
	var sizeMode = 0;


	function preload() {
    	currentShape = loadImage("data/module_1.svg");
  	}

	function setup(){
		createCanvas(600, 600);
		smooth();
		image(currentShape, 0, 0);
		tileWidth = 600/tileCount;
  		tileHeight = 600/tileCount;
  		maxDist = Math.sqrt(Math.pow(600, 2) + Math.pow(600, 2));
  		
	};

	 function draw(){
		if(savePDF){
	  		beginRecord();
	  	};

		background(255);
		smooth();

		for (var gridY = 0; gridY < tileCount; gridY++) {
			for(var gridX = 0; gridX < tileCount; gridX++){

				var posX = tileWidth*gridX + tileWidth/2;
				var posY = tileHeight*gridY + tileWidth/2;

				// calculate angle between mouse position and actual position of the shape
      			var angle = Math.atan2(mouseY-posY, mouseX-posX) + (shapeAngle *(Math.PI/180));

      			if(sizeMode == 0) newShapeSize = shapeSize;
      			if(sizeMode == 1) newShapeSize = shapeSize*1.5-map(dist(mouseX,mouseY,posX,posY),0,500,5,shapeSize);
      			if (sizeMode == 2) newShapeSize = map(dist(mouseX,mouseY,posX,posY),0,500,5,shapeSize);

			    if (fillMode == 0) //currentShape.enableStyle();
			    if (fillMode == 1) {
			      	//currentShape.disableStyle();
			        fill(shapeColor[0], shapeColor[1],shapeColor[2]);      
			    }
			    if (fillMode == 2) {
			    	//currentShape.disableStyle();
			        var a = map(dist(mouseX,mouseY,posX,posY), 0,maxDist, 255,0);
			        fill(shapeColor[0], shapeColor[1],shapeColor[2]);       
			    }
			    if (fillMode == 3) {
			        //currentShape.disableStyle();
			        var a = map(dist(mouseX,mouseY,posX,posY), 0,maxDist, 0,255);
			        fill(shapeColor[0], shapeColor[1],shapeColor[2]);      
			    }

			    push();
			    translate(posX, posY);
			    rotate(angle);
			    //shapeMode(CENTER);

			    noStroke();
			    image(currentShape, 0,0, newShapeSize,newShapeSize);
			    pop();
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

    if (key == '1') currentShape = loadImage("data/module_1.svg");
    if (key == '2') currentShape = loadImage("data/module_2.svg");
    if (key == '3') currentShape = loadImage("data/module_3.svg");
    if (key == '4') currentShape = loadImage("data/module_4.svg");
    if (key == '5') currentShape = loadImage("data/module_5.svg");
    if (key == '6') currentShape = loadImage("data/module_6.svg");
    if (key == '7') currentShape = loadImage("data/module_7.svg");

    if (keyCode == UP_ARROW) shapeSize = shapeSize + 5;
  	if (keyCode == DOWN_ARROW) shapeSize = Math.max(shapeSize-5, 5);
  	if (keyCode == LEFT_ARROW) shapeAngle = shapeAngle + 5;
  	if (keyCode == RIGHT_ARROW) shapeAngle = shapeAngle - 5;
  	
  }
