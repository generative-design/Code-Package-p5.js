/**
 * Analyses RGB pixel values of emoji icons to deduce the average colors.
 * The results are written in a json file.
 */
'use strict';

var emojiNames;
var counter = 0;
var imgSize = 72;
var results = {};

// You will have to download the emoji files first
// Please see https://github.com/generative-design/Code-Package-p5.js/tree/master/data
var emojisPath = "../../data/twemoji/";


function preload() {
  emojiNames = loadTable("emoji-names.csv", "csv", "header");
}

function setup() {
  createCanvas(imgSize, imgSize);
  print(emojiNames.getRowCount());
}

function draw() {
  if (counter >= emojiNames.getRowCount()) {
    saveJSON(results, "emoji-average-colors.json");
    print("done");
    noLoop();
    return;
  }

  noLoop();
  var currentEmoji = emojiNames.getString(counter, 0);
  print(currentEmoji);
  loadImage(emojisPath + "72x72/" + currentEmoji + ".png", function(img) {
    clear();
    image(img, 0, 0);
    loadPixels();
    var rgb = {r: 0, g: 0, b: 0};
    var pixCounter = 0;
    for (var i = 0; i < pixels.length; i += 4) {
      if (pixels[i+3] === 0) continue; // skip if alpha == 0
      rgb.r += pixels[i];
      rgb.g += pixels[i + 1];
      rgb.b += pixels[i + 2];
      pixCounter++;
    }
    // ~~ used to floor values
    rgb.r = ~~(rgb.r/pixCounter);
    rgb.g = ~~(rgb.g/pixCounter);
    rgb.b = ~~(rgb.b/pixCounter);

    results[currentEmoji] = {};
    results[currentEmoji].averageColor = rgb;

    //noStroke();
    //fill(rgb.r, rgb.g, rgb.b);
    //ellipse(width/2, height/2, 30, 30);
    counter++;
    loop();
  });
}
