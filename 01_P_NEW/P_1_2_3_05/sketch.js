// P_1_2_3_05
/**
 * generates a specific color palette and some random 'rect-tilings' with radial gradient
 *
 * MOUSE
 * left click          : new composition
 *
 * KEYS
 * s                   : save png
 * c                   : save color palette
 */
'use strict';

var colorCount = 20;
var hueValues = [];
var saturationValues = [];
var brightnessValues = [];
var alphaValue = 100;
var actRandomSeed = 0;


function setup() {
  createCanvas(800,800);
  colorMode(HSB,360,100,100,100);
  noStroke();
}

function draw() {
  noLoop();
  background(0,0,0);
  randomSeed(actRandomSeed);

  // ------ colors ------
  // create palette
  for (var i=0; i<colorCount; i++) {
    if (i%2 == 0) {
      hueValues[i] = int(random(0,180));
      saturationValues[i] = int(random(0,50));
      brightnessValues[i] = 100;
    }
    else {
      hueValues[i] = int(random(0,360));
      saturationValues[i] = 100;
      brightnessValues[i] = int(random(0,100));
    }
  }

  // ------ area tiling ------
  // count tiles
  var counter = 0;
  // row count and row height
  var rowCount = int(random(5,30));
  var rowHeight = height/rowCount;

  // seperate each line in parts
  for(var i=rowCount; i>=0; i--) {
    // how many fragments
    var partCount = i+1;
    var parts = [];

    for(var ii=0; ii<partCount; ii++) {
      // sub fragments or not?
      if (random(1) < 0.075) {
        // take care of big values
        var fragments = int(random(2,20));
        partCount = partCount + fragments;
        for(var iii=0; iii<fragments; iii++) {
          parts.push(random(2));
        }
      }
      else {
        parts.push(random(2,20));
      }
    }

    // add all subparts
    var sumPartsTotal = 0;
    for(var ii=0; ii<partCount; ii++) sumPartsTotal += parts[ii];

    // draw rects
    var sumPartsNow = 0;
    for(var ii=0; ii<parts.length; ii++) {
      sumPartsNow += parts[ii];

      if (random(1.0) < 0.45) {
        var w = map(parts[ii], 0,sumPartsTotal, 0,width);
        var h = rowHeight*1.5
        var px1 = map(sumPartsNow, 0,sumPartsTotal, 0,width);
        var px2 = px1 + w;
        var py1 = rowHeight*i;
        var py2 = py1 + h;

        var index = counter % colorCount;
        var col1 = color(hueValues[index], saturationValues[index], brightnessValues[index], alphaValue);
        // create complementary color
        var col2 = color(hueValues[index]-180, saturationValues[index], brightnessValues[index], alphaValue);
        centerGradient(px1, py1, 0, px2, py2, max(w,h), col1, col2);
      }

      counter++;
    }
  }
}

function centerGradient(x1, y1, r1, x2, y2, r2, c1, c2) {
  var ctx = drawingContext; // global canvas context p5.js var
  var cx = x1 + (x2-x1)/2;
  var cy = y1 + (y2-y1)/2;
  var grd = ctx.createRadialGradient(cx, cy, r1, cx, cy, r2);
  grd.addColorStop(0, c1.toString());
  grd.addColorStop(1, c2.toString());
	ctx.fillStyle = grd;
	ctx.fillRect(x1, y1, x2-x1, y2-y1);
}

function mouseReleased() {
  actRandomSeed = int(random(100000));
  loop();
}

function keyPressed() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
  if (key == 'c' || key == 'C') {
    // -- save an ase file (adobe swatch export) --
    var colors = [];
    for (var i=0; i<hueValues.length; i++) {
      colors.push(color(hueValues[i],saturationValues[i],brightnessValues[i]));
    }
    writeFile([gd.ase.encode(colors)], gd.timestamp(), 'ase');
  }
}
