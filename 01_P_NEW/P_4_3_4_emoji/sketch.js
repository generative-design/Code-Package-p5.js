/**
 * Pixel mapping, each pixel of an image is translated into an emoji icon.
 * The pixel RGB value is mapped with the nearest (average) RGB value of an emoji.
 * Mapping via a [k-dimensional tree data structure](https://github.com/ubilabs/kd-tree-javascript).
 * See also "P_emoji_icon_analyser" for how to calculate the average color of emoji.
 *
 * KEYS
 * s                   : save png
 */
'use strict';

// var emojis -> defined in file emoji-average-colors.js
var icons;
var img;
var emojisPath = "../../data/twemoji/";
var tree;


function preload() {
  img = loadImage("data/pic.png");
  icons = {};
  for (var name in emojis) {
    icons[name] = loadImage(emojisPath + "36x36/" + name + ".png");
  }
}

function setup(){
  console.log("image size: "+img.width+" x "+img.height);
  createCanvas(670*2, 970*2);

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
}

function draw(){
  background(255);

  var titleWidth = width / img.width;
  var titleHeight = height / img.height;
  console.log("tile size: "+titleWidth+" x "+titleHeight);
  for (var gridX = 0; gridX < img.width; gridX++){
    for(var gridY = 0; gridY < img.height; gridY++){
      // grid position
      var posX = titleWidth*gridX;
      var posY = titleHeight*gridY;
      // get current color
      var rgba = img.get(min(gridX,img.width-1), gridY);
      // find emoji with 'nearest' color
      var nearest = tree.nearest({r: rgba[0], g: rgba[1], b: rgba[2]}, 1)[0][0];
      //console.log(nearest);
      image(icons[nearest.emoji], posX, posY, titleWidth, titleHeight);
      //fill(rgba);
      //ellipse(posX, posY, titleWidth, titleHeight);
    }
  }
  noLoop();
}

function keyReleased(){
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
}
