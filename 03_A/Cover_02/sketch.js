// Cover_02
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

  var aboutPos = createVector(448, 350);
  textBlocks.push(new TextBlock('Entwerfen,', 25, aboutPos.x, aboutPos.y));
  textBlocks.push(new TextBlock('Programmieren,', 25, aboutPos.x, aboutPos.y + 28));
  textBlocks.push(new TextBlock('Visualisieren', 25, aboutPos.x, aboutPos.y + 28 * 2));
  textBlocks.push(new TextBlock('mit JavaScript', 25, aboutPos.x, aboutPos.y + 28 * 3));
  textBlocks.push(new TextBlock('in p5.js', 25, aboutPos.x, aboutPos.y + 28 * 4));

  var authorPos = createVector(261, 550);
  textBlocks.push(new TextBlock('Benedikt Groß', 18, authorPos.x, authorPos.y));
  textBlocks.push(new TextBlock('Hartmut Bohnacker', 18, authorPos.x, authorPos.y + 24));
  textBlocks.push(new TextBlock('Julia Laub', 18, authorPos.x, authorPos.y + 24 * 2));
  textBlocks.push(new TextBlock('mit beiträgen von', 10, authorPos.x, authorPos.y + (24 * 3) - 6));
  textBlocks.push(new TextBlock('Niels Poldervaart & Joey Lee', 18, authorPos.x, authorPos.y + (24 * 4) - 6));

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

    noFill();
    strokeWeight(0.1);
    stroke(122, 250, 166);

    charShapes.forEach(function(charShape, index) {
      var previousChar = charShapes[index - 1];
      if (previousChar) {
        var d = int(dist(charShape.x, charShape.y, previousChar.x, previousChar.y));
        for (var i = 0; i < 1; i += 4 / d) {
          beginShape();
          previousChar.nodes.forEach(function(node, nodeIndex) {
            var mapIndex = int(map(nodeIndex, 0, previousChar.nodes.length, 0, charShape.nodes.length));
            var lerpNode = p5.Vector.lerp(node, charShape.nodes[mapIndex], i);
            vertex(lerpNode.x, lerpNode.y);
          });
          endShape(CLOSE);
        }
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
  this.nodes = font.textToPoints(this.char, this.x, this.y, this.textSize, {simplifyThreshold: 0, sampleFactor: 0.25}).map(function(node) {
    return createVector(node.x, node.y);
  });
  this.extentions = this.nodes.map(function(node) {
    var a = atan2(this.center.y - node.y, this.center.x - node.x);
    var extention = p5.Vector.fromAngle(a);
    extention.add(0, this.textSize * 4);
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
