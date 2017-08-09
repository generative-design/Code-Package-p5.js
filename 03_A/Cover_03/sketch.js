// Cover_03
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

var fontBook;
var fontBold;

var trailDensity = 1;
var lineWeight = 0.1;

function preload() {
  fontBook = loadFont('MaisonNeue-Book.ttf');
  fontBold = loadFont('MaisonNeue-Bold.ttf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  // pixelDensity(4);

  var titlePos = createVector(205, 128);
  var titleLineHeight = 84;
  textBlocks.push(new TextBlock('Generative', fontBold, 100, titlePos.x, titlePos.y + titleLineHeight * 0));
  textBlocks.push(new TextBlock('Gestaltung', fontBold, 100, titlePos.x, titlePos.y + titleLineHeight * 1));

  var subHeadingPos = createVector(448, 440);
  var subHeadingLineHeight = 54;
  textBlocks.push(new TextBlock('The Web', fontBold, 64, subHeadingPos.x, subHeadingPos.y + subHeadingLineHeight * 0));
  textBlocks.push(new TextBlock('Workbook', fontBold, 64, subHeadingPos.x, subHeadingPos.y + subHeadingLineHeight * 1));

  var aboutPos = createVector(205, 640);
  var aboutPosLineHeight = 28;
  textBlocks.push(new TextBlock('für JavaScript', fontBook, 25, aboutPos.x, aboutPos.y + aboutPosLineHeight * 0));
  textBlocks.push(new TextBlock('Entwerfen, Programmieren', fontBold, 25, aboutPos.x, aboutPos.y + aboutPosLineHeight * 1));
  textBlocks.push(new TextBlock('und Visualisieren', fontBold, 25, aboutPos.x, aboutPos.y + aboutPosLineHeight * 2));

  var authorPos = createVector(500, 840);
  var authorPosLineHeight = 28;
  textBlocks.push(new TextBlock('Herausgeber', fontBook, 25, authorPos.x, authorPos.y + authorPosLineHeight * 0));
  textBlocks.push(new TextBlock('Benedikt Groß', fontBold, 25, authorPos.x, authorPos.y + authorPosLineHeight * 1));
  textBlocks.push(new TextBlock('Hartmut Bohnacker', fontBold, 25, authorPos.x, authorPos.y + authorPosLineHeight * 2));
  textBlocks.push(new TextBlock('Julia Laub', fontBold, 25, authorPos.x, authorPos.y + authorPosLineHeight * 3));
  textBlocks.push(new TextBlock('mit beiträgen von', fontBook, 25, authorPos.x, authorPos.y + authorPosLineHeight * 4));
  textBlocks.push(new TextBlock('Niels Poldervaart', fontBold, 25, authorPos.x, authorPos.y + authorPosLineHeight * 5));
  textBlocks.push(new TextBlock('Joey Lee', fontBold, 25, authorPos.x, authorPos.y + authorPosLineHeight * 6));

  var publisherPos = createVector(205, 840);
  var publisherPosLineHeight = 28;
  textBlocks.push(new TextBlock('verlag', fontBook, 25, publisherPos.x, publisherPos.y + publisherPosLineHeight * 4));
  textBlocks.push(new TextBlock('hermann', fontBook, 25, publisherPos.x, publisherPos.y + publisherPosLineHeight * 5));
  textBlocks.push(new TextBlock('schmidt', fontBook, 25, publisherPos.x, publisherPos.y + publisherPosLineHeight * 6));

  var allChars = [];
  textBlocks.forEach(function(textBlock) {
    allChars = allChars.concat(textBlock.s.toLowerCase().split(''));
  });
  uniqChars = allChars.filter(function(char, index) {
    return allChars.indexOf(char) === index;
    // return allChars.indexOf('e') === index;
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

    noFill();
    strokeWeight(lineWeight);

    var fromColor = color(200, 250, 0);
    var toColor = color(0, 250, 200);

    charShapes.forEach(function(charShape, index) {
      var previousChar = charShapes[index - 1];
      if (previousChar) {
        var d = dist(charShape.x, charShape.y, previousChar.x, previousChar.y);
        for (var i = 0; i < 1; i += trailDensity / d) {
          stroke(lerpColor(fromColor, toColor, i));
          beginShape();
          previousChar.nodes.forEach(function(previousCharNode, nodeIndex) {

            var mapIndex = int(map(nodeIndex, 0, previousChar.nodes.length, 0, charShape.nodes.length));
            var currentCharNode = charShape.nodes[mapIndex];

            // https://stackoverflow.com/a/37642695
            var midPoint = p5.Vector.lerp(previousCharNode, currentCharNode, 0.5);
            var controlPointsSpan = d / 3;
            var midPointAngle = atan2(currentCharNode.y - previousCharNode.y, currentCharNode.x - previousCharNode.x);
            // var controlPointA = p5.Vector.fromAngle(midPointAngle);
            // controlPointA.add(0, controlPointsSpan);
            // controlPointA.rotate(midPointAngle - previousCharNode.angleBetween(currentCharNode));
            // controlPointA.add(midPoint);
            // var controlPointB = p5.Vector.fromAngle(midPointAngle);
            // controlPointB.add(0, controlPointsSpan);
            // controlPointB.rotate(midPointAngle + PI + previousCharNode.angleBetween(currentCharNode));
            // controlPointB.add(midPoint);

            // var controlPointA = createVector(previousCharNode.x, currentCharNode.y + (max(previousCharNode.x - currentCharNode.x) / 3));
            // var controlPointB = createVector(currentCharNode.x, previousCharNode.y - (max(previousCharNode.x - currentCharNode.x) / 3));
            //
            // var xa = getPoint(previousCharNode.x, controlPointA.x, i);
            // var ya = getPoint(previousCharNode.y, controlPointA.x, i);
            // var xb = getPoint(controlPointA.x, controlPointB.x, i);
            // var yb = getPoint(controlPointA.y, controlPointB.y, i);
            // var xc = getPoint(controlPointB.x, currentCharNode.x, i);
            // var yc = getPoint(controlPointB.y, currentCharNode.y, i);
            //
            // var xm = getPoint(xa, xb, i);
            // var ym = getPoint(ya, yb, i);
            // var xn = getPoint(xb, xc, i);
            // var yn = getPoint(yb, yc, i);
            //
            // var x = getPoint(xm, xn, i);
            // var y = getPoint(ym, yn, i);

            var controlPoint = p5.Vector.fromAngle(midPointAngle);
            controlPoint.add(0, controlPointsSpan);
            controlPoint.rotate(midPointAngle);
            controlPoint.add(midPoint);

            var xa = getPoint(previousCharNode.x, controlPoint.x, i);
            var ya = getPoint(previousCharNode.y, controlPoint.y, i);
            var xb = getPoint(controlPoint.x, currentCharNode.x, i);
            var yb = getPoint(controlPoint.y, currentCharNode.y, i);

            var x = getPoint(xa, xb, i);
            var y = getPoint(ya, yb, i);

            vertex(x, y);

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

function TextBlock(s, font, textSize, x, y) {
  this.s = s;
  this.font = font;
  this.textSize = textSize;
  this.x = x;
  this.y = y;
  this.charShapes = [];

  TextBlock.prototype.createCharShapes = function() {
    this.s.split('').forEach(function(char, index) {
      textFont(this.font, this.textSize);
      var x = this.x + textWidth(this.s.substring(0, index));
      this.charShapes.push(new CharShape(char, this.font, this.textSize, x, this.y));
    }.bind(this));
  };

  TextBlock.prototype.draw = function() {
    fill(0);
    textFont(this.font, this.textSize);
    text(this.s, this.x, this.y);

    // this.charShapes.forEach(function(charShape) {
    //   charShape.draw();
    // });
  };
}

function CharShape(char, font, textSize, x, y) {
  this.char = char;
  this.font = font;
  this.x = x;
  this.y = y;
  this.textSize = textSize;
  this.textBounds = this.font.textBounds(this.char, this.x, this.y, this.textSize);
  this.center = createVector(this.textBounds.x + (this.textBounds.w / 2), this.textBounds.y + (this.textBounds.h / 2));
  this.nodes = this.font.textToPoints(this.char, this.x, this.y, this.textSize, {simplifyThreshold: 0, sampleFactor: 0.25}).map(function(node) {
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

function getPoint(n1, n2, amt) {
  var diff = n2 - n1;
  return n1 + (diff * amt);
}

function keyReleased() {
  if (keyCode === CONTROL) saveCanvas(gd.timestamp(), 'png');
}
