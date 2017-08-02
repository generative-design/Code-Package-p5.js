// P_MacPaint_1
/**
 * Simple drawing tool where mouse input gets mirrored over multiple axes
 *
 * MOUSE
 * left click          : draw line
 *
 * KEYS
 * 1                   : toggle vertical mirror
 * 2                   : toggle horizontal mirror
 * 3                   : toggle diagonal mirror 1
 * 4                   : toggle diagonal mirror 2
 * 5-9                 : change color
 * 0                   : color white (eraser)
 * arrow up            : increase line weight
 * arrow down          : decrease line weight
 * arrow right         : increase number of tiles
 * arrow left          : decrease number of tiles
 * d                   : show/hide mirror axes
 * del, backspace      : clear screen
 * s                   : save png
 *
 * CONTRIBUTED BY
 * [Niels Poldervaart](http://NielsPoldervaart.nl)
*/
"use strict";

var gif;
var canvasElement;
var recording = false;

var lineWidth = 3;
var lineColor;

var mv = true;
var mh = true;
var md1 = true;
var md2 = true;
var penCount = 1;

var showAxes = true;

var img;

function setup() {
  // Please work with a square canvas
  canvasElement = createCanvas(800, 800);
  noCursor();
  noFill();
  lineColor = color(0);

  // Create an offscreen graphics object to draw into
  img = createGraphics(width, height);
  img.pixelDensity(1);

  setupGIF();
}

function draw() {
  background(255);
  image(img, 0, 0);

  img.strokeWeight(lineWidth);
  img.stroke(lineColor);

  if (mouseIsPressed) {
    for (var i = 0; i < penCount; i++) {
      for (var j = 0; j < penCount; j++) {
        var w = width;
        var h = height;
        var x = (mouseX + i * w / penCount);
        var y = (mouseY + j * h / penCount);
        var px = (pmouseX + i * w / penCount);
        var py = (pmouseY + j * h / penCount);

        if (x > w) {
          x -= w;
          px -= w;
        }

        if (y > h) {
          y -= h;
          py -= h;
        }

        // Normal position
        img.line(x, y, px, py); 
        // Horizontal mirror or all three other mirrors
        if (mh || md2 && md1 && mv) img.line(w - x, y, w - px, py);
        // Vertical mirror
        if (mv || md2 && md1 && mh) img.line(x, h - y, px, h - py);
        // Horizontal and vertical mirror
        if (mv && mh || md2 && md1) img.line(w - x, h - y, w - px, h - py);

        // When mirroring diagonally, flip X and Y inputs.
        if (md1 || md2 && mv && mh) img.line(y, x, py, px);
        if (md1 && mh || md2 && mv) img.line(y, w - x, py, w - px);
        if (md1 && mv || md2 && mh) img.line(h - y, x, h - py, px);
        if (md1 && mv && mh || md2) img.line(h - y, w - x, h - py, w - px);
      }
    }

    if (recording) {
      gif.addFrame(canvasElement.canvas, {delay: 1, copy: true});
    }

  }

  if (showAxes) {
    var w = width / penCount;
    var h = height / penCount;

    // draw mirror axes
    stroke(0, 50);
    strokeWeight(1);
    for (var i = 0; i < penCount; i++) {
      for (var j = 0; j < penCount; j++) {
        var x = i * w;
        var y = j * h;

        if (mh) line(x + w / 2, y, x + w / 2, y + h);
        if (mv) line(x, y + h / 2, x + w, y + h / 2);
        if (md1) line(x, y, x + w, y + h);
        if (md2) line(x + w, y, x, y + h);
      }
    }

    // draw pen
    fill(lineColor);
    noStroke();
    ellipse(mouseX, mouseY, lineWidth + 2, lineWidth + 2)
    stroke(0, 50);
    noFill();
    ellipse(mouseX, mouseY, lineWidth + 1, lineWidth + 1)

  }

}

function mouseWheel(e) {
  //lineWidth = max(lineWidth += e.delta / 100, 0.1);
}

function keyPressed() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
  if (keyCode === DELETE || keyCode === BACKSPACE) img.clear();

  if (keyCode == RIGHT_ARROW) penCount++;
  if (keyCode == LEFT_ARROW) penCount = max(1, penCount - 1);

  if (keyCode == UP_ARROW) lineWidth++;
  if (keyCode == DOWN_ARROW) lineWidth = max(1, lineWidth - 1);

  if (key == '1') mv = !mv;
  if (key == '2') mh = !mh;
  if (key == '3') md1 = !md1;
  if (key == '4') md2 = !md2;

  if (key == '5') lineColor = color(0);
  if (key == '6') lineColor = color(15, 233, 118);
  if (key == '7') lineColor = color(245, 95, 80);
  if (key == '8') lineColor = color(65, 105, 185);
  if (key == '9') lineColor = color(255, 231, 108);
  if (key == '0') lineColor = color(255);

  if (key == 'd' || key == 'D') showAxes = !showAxes;
  if (key == 'g' || key == 'G') {
    recording = !recording;
    if (!recording) {
      gif.render();
    }
  }
}

function setupGIF() {
  background(255);
  gif = new GIF({
    workers: 16,
    quality: 10000,
    debug: true,
    workerScript: '../../libraries/gif.js/gif.worker.js'
  });
  gif.on('finished', function(blob) {
    saveAs(blob, gd.timestamp() + '.gif');
    setupGIF();
  });
}
