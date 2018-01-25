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

var tileWidth = 20;
var tileHeight = 20;

// var emojis -> defined in file emoji-average-colors.js
var icons;
var img;

// You will have to download the emoji files first
// Please see https://github.com/generative-design/Code-Package-p5.js/tree/master/data
var emojisPath = "../../data/twemoji/";

var tree;

function preload() {
  img = loadImage("data/pic.png");
  icons = {};
  for (var name in emojis) {
    icons[name] = loadImage(emojisPath + "36x36/" + name + ".png");
  }
}

function setup() {
  createCanvas(img.width * tileWidth, img.height * tileHeight);

  // setup kdTree to find neareast color in a speedy way
  var colors = [];
  for (var name in emojis) {
    var col = emojis[name].averageColor;
    col.name = name;
    colors.push(col);
  }
  var distance = function(a, b){
    return Math.pow(a.r - b.r, 2) + Math.pow(a.g - b.g, 2) + Math.pow(a.b - b.b, 2);
  }
  tree = new kdTree(colors, distance, ["r", "g", "b"]);
}

function draw() {
  background(255);

  for (var gridX = 0; gridX < img.width; gridX++) {
    for(var gridY = 0; gridY < img.height; gridY++) {
      // grid position
      var posX = tileWidth * gridX;
      var posY = tileHeight * gridY;

      // get current color
      var c = color(img.get(gridX, gridY));

      // find emoji with 'nearest' color
      var nearest = tree.nearest({r:red(c), g:green(c), b:blue(c)}, 1);

      var name = nearest[0][0].name;
      image(icons[name], posX, posY, tileWidth, tileHeight);
    }
  }
  noLoop();
}

function keyReleased() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
}
