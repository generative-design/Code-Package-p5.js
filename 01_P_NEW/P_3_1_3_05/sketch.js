// P_3_1_3_05

/**
 * analysing and sorting the words of a text by Part of Speech
 * connecting subsequent letters with lines
 *
 * MOUSE
 * position x          : interpolate between normal text and sorted position
 *
 * KEYS
 * 1                   : toggle grey lines on/off
 * 2                   : toggle colored lines on/off
 * 3                   : toggle text on/off
 * 4                   : switch all letters off
 * 5                   : switch all letters on
 * a-z                 : switch letter on/off
 * ctrl                : save png
 */
'use strict';

var joinedText;
var textPOSTags = [];
var allPOSTags = [];
var counters = [];

var posX;
var posY;

var drawGreyLines = false;
var drawColoredLines = true;
var drawText = true;

function preload() {
  joinedText = loadStrings("data/Part_of_Speech.txt");
}

function setup() {
  createCanvas(1200, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);

  textFont("monospace", 18);
  fill(0);

  joinedText = joinedText.join(" ");
  joinedText = joinedText.split(/\s+/);
  for (var i = 0; i < joinedText.length; i++) {

    var wordPOSTag = RiTa.getPosTags(RiTa.stripPunctuation(joinedText[i]))[0];

    textPOSTags.push(wordPOSTag);

    var tagIndex = allPOSTags.indexOf(wordPOSTag);
    if (tagIndex >= 0) {
      counters[tagIndex]++;
    } else {
      allPOSTags.push(wordPOSTag);
      counters.push(1);
    }

    joinedText[i] += ' ';

  }
}

function draw() {
  background(360);

  translate(50, 0);

  noStroke();

  posX = 0;
  posY = 200;
  var sortPositionsX = [];
  var oldPositionsX = [];
  var oldPositionsY = [];
  for (var i = 0; i < joinedText.length; i++) {
    sortPositionsX[i] = 0;
    oldPositionsX[i] = 0;
    oldPositionsY[i] = 0;
  }
  var oldX = 0;
  var oldY = 0;

  // draw counters
  if (mouseX >= width - 50) {
    textSize(10);
    for (var i = 0; i < allPOSTags.length; i++) {
      textAlign(LEFT);
      text(allPOSTags[i], -20, i * 20 + 40);
      textAlign(RIGHT);
      text(counters[i], -25, i * 20 + 40);
    }
    textAlign(LEFT);
    textSize(18);
  }

  // go through all characters in the text to draw them
  for (var i = 0; i < joinedText.length; i++) {
    // again, find the index of the current letter in the alphabet
    var wordPOSTag = textPOSTags[i];
    var index = allPOSTags.indexOf(wordPOSTag);
    if (index < 0) continue;

    var m = map(mouseX, 50, width - 50, 0, 1);
    m = constrain(m, 0, 1);

    var sortX = sortPositionsX[index];
    var interX = lerp(posX, sortX, m);

    var sortY = index * 20 + 40;
    var interY = lerp(posY, sortY, m);

    if (drawGreyLines) {
      if (oldX != 0 && oldY != 0) {
        stroke(0, 10);
        line(oldX, oldY, interX, interY);
      }
      oldX = interX;
      oldY = interY;
    }

    if (drawColoredLines) {
      if (oldPositionsX[index] != 0 && oldPositionsY[index] != 0) {
        stroke(index * 10, 80, 60, 50);
        line(oldPositionsX[index], oldPositionsY[index], interX, interY);
      }
      oldPositionsX[index] = interX;
      oldPositionsY[index] = interY;
    }

    if (drawText) {
      text(joinedText[i], interX, interY);
    }

    sortPositionsX[index] += textWidth(joinedText[i]);
    posX += textWidth(joinedText[i]);
    if (posX >= width - 200) {
      posY += 40;
      posX = 0;
    }
  }
}

function keyReleased() {
  if (keyCode === CONTROL) saveCanvas(gd.timestamp(), 'png');

  if (key == '1') drawGreyLines = !drawGreyLines;
  if (key == '2') drawColoredLines = !drawColoredLines;
  if (key == '3') drawText = !drawText;
}
