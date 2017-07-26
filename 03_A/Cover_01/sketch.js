// Cover_01
/**
 * KEYS
 * control             : save png
 *
 * CONTRIBUTED BY
 * [Niels Poldervaart](http://NielsPoldervaart.nl)
 */
"use strict";

var textBlocks = [];

var uniqChars = [];

var font;

function preload() {
  font = loadFont('MaisonNeue-Bold.ttf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  var titlePos = createVector(205, 188);
  textBlocks.push(new TextBlock('Generative', 100, titlePos.x, titlePos.y));
  textBlocks.push(new TextBlock('Gestaltung', 100, titlePos.x, titlePos.y + 84));

  var subheadingPos = createVector()

  var aboutPos = createVector(448, 313);
  textBlocks.push(new TextBlock('Entwerfen,', 25, aboutPos.x, aboutPos.y));
  textBlocks.push(new TextBlock('Programmieren,', 25, aboutPos.x, aboutPos.y + 28));
  textBlocks.push(new TextBlock('Visualisieren', 25, aboutPos.x, aboutPos.y + 28 * 2));
  textBlocks.push(new TextBlock('mit JavaScript', 25, aboutPos.x, aboutPos.y + 28 * 3));
  textBlocks.push(new TextBlock('in p5.js', 25, aboutPos.x, aboutPos.y + 28 * 4));

  var authorPos = createVector(261, 500);
  textBlocks.push(new TextBlock('Benedikt Groß', 14, authorPos.x, authorPos.y));
  textBlocks.push(new TextBlock('Hartmut Bohnacker', 14, authorPos.x, authorPos.y + 20));
  textBlocks.push(new TextBlock('Julia Laub', 14, authorPos.x, authorPos.y + 20 * 2));
  textBlocks.push(new TextBlock('mit beiträgen von', 10, authorPos.x, authorPos.y + 20 * 3));
  textBlocks.push(new TextBlock('Niels Poldervaart & Joey Lee', 10, authorPos.x, authorPos.y + (20 * 4) - 4));

  translate(0, 200);

  var allChars = [];
  textBlocks.forEach(function(textBlock) {
      allChars = allChars.concat(textBlock.s.toLowerCase().split(''));
  });
  uniqChars = allChars.filter(function(char, index) {
      return allChars.indexOf(char) === index;
  });

  textBlocks.forEach(function(textBlock) {
    textBlock.createCharShapes();
  });

  uniqChars.forEach(function(char) {

    // Gather all charShapes with the same char
    var charShapes = [];
    textBlocks.forEach(function(textBlock) {
      charShapes = charShapes.concat(textBlock.charShapes.filter(function(charShape) {
        return charShape.char.toLowerCase() === char;
      }));
    });
    console.log(char, charShapes);

    charShapes.forEach(function(charShape, index) {
      var previousChar = charShapes[index - 1];
      if (previousChar) {
        previousChar.nodes.forEach(function(node, index) {
          noFill();
          strokeWeight(0.4);
          stroke(122, 250, 166);
          beginShape();
          vertex(node.x, node.y);
          var randomIndex = int(random(charShape.nodes.length));
          bezierVertex(
            previousChar.extentions[index].x, previousChar.extentions[index].y,
            charShape.extentions[randomIndex].x, charShape.extentions[randomIndex].y,
            charShape.nodes[randomIndex].x, charShape.nodes[randomIndex].y
          );
          endShape();
        })
      }
    });

  });

  textBlocks.forEach(function(textBlock) {
    textBlock.draw();
  });
}

function TextBlock(s, textSize, x, y) {
  this.s = s;
  this.textSize = textSize;
  this.x = x;
  this.y = y;
  this.charShapes = [];

  TextBlock.prototype.createCharShapes = function() {
    this.s.split('').forEach(function(char, index) {
      textFont(font, this.textSize);
      var x = this.x + textWidth(this.s.substring(0, index));
      this.charShapes.push(new CharShape(char, this.textSize, x, this.y));
    }.bind(this));
  };

  TextBlock.prototype.draw = function() {
    fill(0)
    textFont(font, this.textSize);
    text(this.s, this.x, this.y);

    // this.charShapes.forEach(function(charShape) {
    //   charShape.draw();
    // });
  };
}

function CharShape(char, textSize, x, y) {
  this.char = char;
  this.x = x;
  this.y = y;
  this.textSize = textSize;
  this.textBounds = font.textBounds(this.char, this.x, this.y, this.textSize);
  this.center = createVector(this.textBounds.x + (this.textBounds.w / 2), this.textBounds.y + (this.textBounds.h / 2));
  this.nodes = font.textToPoints(this.char, this.x, this.y, this.textSize, {simplifyThreshold: 0, sampleFactor: 0.1}).map(function(node) {
    return createVector(node.x, node.y);
  });
  this.extentions = this.nodes.map(function(node) {
    var a = atan2(this.center.y - node.y, this.center.x - node.x);
    var extention = p5.Vector.fromAngle(a);
    extention.add(0, this.textSize * 6);
    extention.rotate(a + HALF_PI);
    extention.add(node);
    return extention;
  }.bind(this));

  CharShape.prototype.draw = function() {
    noStroke();
    fill(0);
    text(this.char, this.x, this.y);
  };
}

function keyReleased() {
  if (keyCode === CONTROL) saveCanvas(gd.timestamp(), 'png');
}
