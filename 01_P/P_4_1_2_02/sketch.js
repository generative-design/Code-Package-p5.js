// P_4_1_2_02.js
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
 * image feedback process.
 * 
 * KEYS
 * del, backspace      : clear screen
 * s                   : save png
 */
 'use strict';
var img;

function preload() {
   	img = loadImage("data/pic.png");
}

function setup(){
	createCanvas(1024, 580);
	background(255);
	
	image(img, 0, 0);
  		
};

function draw(){
	var x1 = getRandomArbitrary(0, 1024);
	var y1 = getRandomArbitrary(0, 580);

	var x2 = x1 + getRandomArbitrary(-10, 10);
	var y2 = y1 + getRandomArbitrary(-10, 10);

	var w = 150;
	var h = 50;

	copy(img, x1, y1, w,h, x2, y2, w, h);		
}

function keyReleased(){
    if (key == 's' || key == 'S') p.saveCanvas(gd.timestamp(), 'png');
	    
    if(keyCode == DELETE || keyCode == BACKSPACE) {
    	background(255);
    	image(img,0,100);
  	}
  	
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
