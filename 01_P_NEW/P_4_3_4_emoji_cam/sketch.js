/**
 * Pixel mapping, each pixel of a video input is translated into an emoji icon.
 * The pixel RGB value is mapped with the nearest (average) RGB value of an emoji.
 * Mapping via a [k-dimensional tree data structure](https://github.com/ubilabs/kd-tree-javascript).
 *
 * KEYS
 * s                   : save png
 */
'use strict';

var cam;

// var emojis -> defined in file emoji-average-colors.js
var icons;
var emojisPath = "../../data/twemoji/";
var tree;


function preload() {
  icons = {};
  for (var name in emojis) {
    icons[name] = loadImage(emojisPath + "16x16/" + name + ".png");
  }
}

function setup(){
  createCanvas(80*16, 60*16);

  // setup kdTree to find neareast color in a speedy way
  var colors = [];
  for (var name in emojis) {
    var col = emojis[name].averageColor;
    col.emoji = name;
    colors.push(col);
  }
  var distance = function(a, b){
    return Math.pow(a.r - b.r, 2) + Math.pow(a.g - b.g, 2) + Math.pow(a.b - b.b, 2);
  }
  tree = new kdTree(colors, distance, ["r", "g", "b"]);

  // setup camera
  cam = createCapture(VIDEO);
  cam.size(80, 60);
  cam.hide();
}

function draw(){
  background(255);
  // image(cam, 0, 0, width, width*cam.height/cam.width);
  cam.loadPixels();

  var titleWidth = width / cam.width;
  var titleHeight = height / cam.height;
  // console.log("tile size: "+titleWidth+" x "+titleHeight);
  for (var gridX = 0; gridX < cam.width; gridX++){
    for(var gridY = 0; gridY < cam.height; gridY++){
      // grid position
      var posX = titleWidth*gridX;
      var posY = titleHeight*gridY;
      // get current color
      var rgba = cam.get(min(gridX,cam.width-1), gridY);
      // find emoji with 'nearest' color
      var nearest = tree.nearest({r: rgba[0], g: rgba[1], b: rgba[2]}, 1)[0][0];
      //console.log(nearest);
      image(icons[nearest.emoji], posX, posY, titleWidth, titleHeight);
      //fill(rgba);
      //ellipse(posX, posY, titleWidth, titleHeight);
    }
  }
}

function keyReleased(){
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
}
