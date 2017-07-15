// P_3_2_5_type_moire_8
/**
 * Drawing tool for creating moire effect compositions using
 * smooth path of any length, width, smoothness and colour.
 *
 * MOUSE
 * mouse               : click and drag to draw moire pattern path
 *
 * KEYS
 * enter               : redraw
 * arrow right         : increase smoothness
 * arrow left          : decrease smoothness
 * arrow up            : increase ribbon width
 * arrow down          : decrease ribbon width
 * control             : save png
 *
 * CONTRIBUTED BY
 * [Niels Poldervaart](http://NielsPoldervaart.nl)
 */
"use strict";

var shapes = [];
var density = 2.5;
var ribbonWidth = 92;
var shapeColor;
var smoothness = 8;
var fontSize = 800;
var pathSimplification = 0.5;
var randomPathSimplification = true;

var textTyped = 'moire';

var font;

function preload() {
  font = loadFont('NotoSans-Bold.ttf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noFill();
  strokeWeight(1);
  shapeColor = color(0);
  textFont(font, fontSize);

  createShapes();
}

function draw() {
  background(255);

  translate(ribbonWidth, (fontSize / 4) + (height / 2));

  shapes.forEach(function(shape) {
    shape.draw();
  });
}

function createShapes() {
  shapes = textTyped.split('').map(function(char, index) {
    var x = index > 0 ? font.textBounds(textTyped.substring(0, index), 0, 0, fontSize).w : 0;
    return new Shape(x, 0, ribbonWidth, shapeColor, char);
  });
}

function Shape(x, y, h, color, char) {
  this.shapePath = [];
  this.x = x;
  this.y = y;
  this.color = color;
  this.char = char;

  this.shapePath = font.textToPoints(
    this.char, this.x, this.y, fontSize,
    {
      simplifyThreshold: randomPathSimplification ? random(pathSimplification) : pathSimplification
    }
  );
  this.shapePath.push(this.shapePath[2]);

  Shape.prototype.draw = function() {
    stroke(this.color);
    for (var i = -ribbonWidth; i < 0; i += density) {
      beginShape();
      this.shapePath.forEach(function(pos, index, shapePath) {
        var previousPos = shapePath[index - 1];
        if (previousPos && dist(pos.x, pos.y, previousPos.x, previousPos.y) > smoothness) {
          var a = atan2(previousPos.y - pos.y, previousPos.x - pos.x);
          var offsetPos = p5.Vector.fromAngle(a);
          offsetPos.add(0, i);
          offsetPos.rotate(a);
          offsetPos.add(pos.x, pos.y);
          curveVertex(offsetPos.x, offsetPos.y);
        }
      });
      endShape(CLOSE);
    }
  };
}

function keyReleased() {
  if (keyCode === CONTROL) saveCanvas(gd.timestamp(), 'png');

  if (keyCode === RIGHT_ARROW) smoothness += density;
  if (keyCode === LEFT_ARROW) smoothness -= density;

  if (keyCode === UP_ARROW) ribbonWidth += density;
  if (keyCode === DOWN_ARROW) ribbonWidth -= density;

  if (keyCode === ENTER) createShapes();
}

function keyPressed() {
  if (keyCode === DELETE || keyCode === BACKSPACE) {
    if (textTyped.length > 0) {
      textTyped = textTyped.substring(0, textTyped.length - 1);
      createShapes();
    }
  }
}

function keyTyped() {
  if (keyCode >= 32) {
    textTyped += key;
    createShapes();
  }
}
