// P_3_1_4_01
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
 * treemap. wordcounts of a textfile.
 *
 * KEYS
 * s                    : save png
 */
var wordMap = [];

var font;
var margin = 4;

function preload() {
  font = loadFont('data/miso-bold.ttf');
  loadStrings('data/Macbeth.txt', parseText);
}

function parseText(lines) {
  var wordList = [];
  lines.forEach(function(line) {
    wordList.push.apply(wordList, splitTokens(line.toLowerCase(), [' ', '_', '-', '–', '(', ')', '.', ',', ';', ':', '?', '!']));
  });

  wordList.forEach(function(word) {
    var countedWord = wordMap.find(function(mappedWord) {
      return mappedWord.word === word;
    });

    if (countedWord) {
      countedWord.count++;
    } else {
      wordMap.push(new WordItem(word));
    }
  });
  wordMap.sort(function(a, b) {
    return b.count - a.count;
  });

}

function setup() {
  createCanvas(1000, 800);

  textFont(font);
  textAlign(CENTER, CENTER);

  var boxes = Treemap.generate(
    wordMap.map(function(mappedWord) { return mappedWord.count }),
    width,
    height
  );
  wordMap.forEach(function(mappedWord, index) {
    mappedWord.setBoundingBox(boxes[index]);
    mappedWord.drawBox();
  });

}

function keyPressed() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
}

var WordItem = function(word) {
  this.word = word;
  this.count = 1;
  this.x = 0;
  this.y = 0;
  this.w = 0;
  this.h = 0;
  this.fontSize = 1;
}

WordItem.prototype.setBoundingBox = function(boundingBox) {
  this.x = boundingBox[0];
  this.y = boundingBox[1];
  this.w = boundingBox[2] - boundingBox[0];
  this.h = boundingBox[3] - boundingBox[1];

  for (var i = 1; i < this.h; i++) {
    textSize(i);
    if (
      this.w < textWidth(this.word) + margin ||
      this.h < textAscent() + textDescent() + margin
    ) {
      this.fontSize = i;
      break;
    }
  }
}

WordItem.prototype.drawBox = function() {
  noFill();
  strokeWeight(0.25);
  stroke(0);
  rect(this.x, this.y, this.w, this.h);

  fill(0);
  noStroke();
  textSize(this.fontSize);
  text(this.word, this.x + this.w / 2, this.y + this.h / 2);
}
