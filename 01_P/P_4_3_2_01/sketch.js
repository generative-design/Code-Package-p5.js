// P_4_3_2_01.js
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
 * pixel mapping. each pixel is translated into a new element (letter)
 * 
 * KEYS
 * 1                 : toogle font size mode (dynamic/static)
 * 2                 : toogle font color mode (color/b&w)
 * arrow up/down     : maximal fontsize +/-
 * arrow right/left  : minimal fontsize +/-
 * s                 : save png
 * p                 : save pdf
 */
'use strict';

var savePDF = false;

var inputText = "Ihr naht euch wieder, schwankende Gestalten, Die früh sich einst dem trüben Blick gezeigt. Versuch ich wohl, euch diesmal festzuhalten? Fühl ich mein Herz noch jenem Wahn geneigt? Ihr drängt euch zu! nun gut, so mögt ihr walten, Wie ihr aus Dunst und Nebel um mich steigt; Mein Busen fühlt sich jugendlich erschüttert Vom Zauberhauch, der euren Zug umwittert. Ihr bringt mit euch die Bilder froher Tage, Und manche liebe Schatten steigen auf; Gleich einer alten, halbverklungnen Sage Kommt erste Lieb und Freundschaft mit herauf; Der Schmerz wird neu, es wiederholt die Klage.";
var fontSizeMax = 20;
var fontSizeMin = 10;
var spacing = 12; // line height
var kerning = 0.5; // between letters

var fontSizeStatic = false;
var blackAndWhite = false;

var font;
var img;

var winWidth = 600;
var winHeight = 900;

function preload() {
   	img = loadImage("data/pic.png");
};

function setup(){
	createCanvas(600, 900); 
	smooth();

	//createFont not working
	font = loadFont('font/Crimson-Bold.otf');

	image(img, 0, 0);
	console.log(img.width+" x "+img.height);
};

function draw(){
	if(savePDF){
	  		beginRecord();
	};	
	background(255);
  	textAlign('LEFT');
	//textAlign(LEFT,CENTER); //// also nice!
		
	var x = 0.0;
	var y = 10.0;
	var counter = 0;

	while(y < winHeight){
		// translate position (display) to position (image)
		var imgX = map(x, 0,winWidth, 0,img.width);
		var imgY = map(y, 0,winHeight, 0,img.height);
		// get current color
		img.loadPixels();
		var c = img.get(imgX, imgY);
		var greyscale = Math.round(red(c)*0.222 + green(c)*0.707 + blue(c)*0.071);

		push();
		translate(x,y);

		if (fontSizeStatic) {
			textFont(font, fontSizeMax);
			if (blackAndWhite) {
				fill(greyscale);
			}else{
				fill(c);
			}

		}else{
			// greyscale to fontsize
			var fontSize = map(greyscale, 0,255, fontSizeMax,fontSizeMin);
			fontSize = max(fontSize, 1);
			textFont(font, fontSize);
			if (blackAndWhite) {
				fill(0);
			}else{	
				fill(c);
			}
		}

		var letter = inputText.charAt(counter);
		text(letter, 0, 0);
		var letterWidth = textWidth(letter) + kerning;
		// for the next letter ... x + letter width
		x = x + letterWidth; // update x-coordinate
		pop();

		// linebreaks
		if(x+letterWidth >= winWidth){
			x = 0;
			y = y + spacing; // add line height
		}

		counter = counter+1;

		if(counter > inputText.length-1) {
			counter = 0;
		}

	}

	if (savePDF) {
	    savePDF = false;
	    endRecord();
  	}
};

function keyReleased(){
    if (key == 's' || key == 'S') p.saveCanvas(gd.timestamp(), 'png');
	if (key == 'p' || key == 'P') savePDF = true;	

	// change render mode
  	if (key == '1') fontSizeStatic = !fontSizeStatic;
  	// change color stlye
  	if (key == '2') blackAndWhite = !blackAndWhite;
  	console.log("fontSizeMin: "+fontSizeMin+"  fontSizeMax: "+fontSizeMax+"   fontSizeStatic: "+fontSizeStatic+"   blackAndWhite: "+blackAndWhite);
};

function keyPressed() {
  // change fontSizeMax with arrowkeys up/down 
  if (keyCode == UP_ARROW) fontSizeMax = fontSizeMax+ 2;
  if (keyCode == DOWN_ARROW) fontSizeMax = fontSizeMax-2; 
  // change fontSizeMin with arrowkeys left/right
  if (keyCode == RIGHT_ARROW) fontSizeMin = fontSizeMin+2;
  if (keyCode == LEFT_ARROW) fontSizeMin = fontSizeMin-2; 

  //fontSizeMin = max(fontSizeMin, 2);
  //fontSizeMax = max(fontSizeMax, 2);
}
