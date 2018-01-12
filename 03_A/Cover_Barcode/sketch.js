// Cover_Barcode

/**
 * KEYS
 * s             : save png
 */

'use strict';

var colorPoints = [];
var ribbon;

// chose 8 for print quality (caution: very slow)
var mmToPx = 3;

// these are in mm:
var coverWidth = 400;
var coverHeight = 400;

var barcodeNumbers = [9, 9, 7, 8, 3, 8, 7, 4, 3, 9, 9, 0, 2, 9];


function setup() {
  createCanvas(coverWidth * mmToPx, coverHeight * mmToPx);

  // create colorPoints
  for (var i = 0; i < barcodeNumbers.length; i++) {
    var n = barcodeNumbers[i];
    var r = imageColors[n].r;
    var g = imageColors[n].g;
    var b = imageColors[n].b;
    var a = imageColors[n].a * map(i, 0, barcodeNumbers.length - 1, 1, 0.05);
    var col = color(r, g, b, a);

    colorPoints.push(new ColorPoint(n, col, 1));
  }

  // Barcode
  ribbon = new Ribbon(colorPoints, 150, { n: barcodeInfo.length - 1, step: 0.15, damp: 0.02, minW: 10, maxW: 50 });


}

function draw() {
  //background(255);
  translate(150*mmToPx, 50*mmToPx);
  rotate(radians(180));
  scale(mmToPx);

  ribbon.draw();

  noLoop();
}



function keyReleased() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
}