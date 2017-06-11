// M_1_4_01.pde
// TileSaver.pde
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
 * creates a terrain like mesh based on noise values.
 *
 * MOUSE
 * position x/y + left drag   : specify noise input range
 * position x/y + right drag  : camera controls
 *
 * KEYS
 * l                          : toogle display strokes on/off
 * arrow up                   : noise falloff +
 * arrow down                 : noise falloff -
 * arrow left                 : noise octaves -
 * arrow right                : noise octaves +
 * space                      : new noise seed
 * +                          : zoom in
 * -                          : zoom out
 * s                          : save png
 * p                          : high resolution export (please update to processing 1.0.8 or
 *                              later. otherwise this will not work properly)
 */


// ------ mesh ------
var tileCount;
var zScale;

// ------ noise ------
var noiseXRange;
var noiseYRange;
var octaves;
var falloff;

// ------ mesh coloring ------
var midColor,
    topColor,
    bottomColor;
var strokeColor;
var threshold;

// ------ mouse interaction ------
var offsetX,
   offsetY,
   clickX,
   clickY,
   zoom;
var rotationX,
   rotationZ,
   targetRotationX,
   targetRotationZ,
   clickRotationX,
   clickRotationZ;

// ------ image output ------
var qualityFactor;
// TileSaver tiler;
var showStroke;




function setup() {
  createCanvas(600, 600, WEBGL);
  colorMode(HSB, 360, 100, 100);
  // tiler = new TileSaver(this);
  cursor(CROSS);

   // ------ mesh ------
  tileCount = 50;
  zScale = 150;

  // ------ noise ------
  noiseXRange = 10;
  noiseYRange = 10;
  octaves = 4;
  falloff = 0.5;

  // ------ mesh coloring ------
  topColor = color(0, 0, 100);
  midColor = color(191, 99, 63);
  bottomColor = color(0, 0, 0);
  strokeColor = color(0, 0, 0);
  threshold = 0.30;

  // ------ mouse interaction ------
  offsetX = 0;
  offsetY = 0;
  clickX = 0;
  clickY = 0;
  zoom = -300;
  rotationX = 0;
  rotationZ = 0;
  targetRotationX = -PI/3
  targetRotationZ = 0;


  // ------ image output ------
  qualityFactor = 4;
  // TileSaver tiler;
  showStroke = true;

}



function draw() {
  // if (tiler==null) return;
  // tiler.pre();

  if (showStroke){
    stroke(strokeColor);
  }
  else{
    noStroke();
  }

  background(0, 0, 100);
  ambientLight(150);

  // ------ set view ------
  push();
  translate(width*0.05, height*0.05, zoom);

  if (mouseIsPressed && mouseButton==RIGHT) {
    offsetX = mouseX-clickX;
    offsetY = mouseY-clickY;
    targetRotationX = min(max(clickRotationX + offsetY/float(width) * TWO_PI, -HALF_PI), HALF_PI);
    targetRotationZ = clickRotationZ + offsetX/float(height) * TWO_PI;
  }
  rotationX += (targetRotationX-rotationX)*0.25;
  rotationZ += (targetRotationZ-rotationZ)*0.25;
  rotateX(-rotationX);
  rotateZ(-rotationZ);


  // ------ mesh noise ------
  if (mouseIsPressed && mouseButton==LEFT) {
    noiseXRange = mouseX/10;
    noiseYRange = mouseY/10;
  }

  noiseDetail(octaves, falloff);
  var noiseYMax = 0;

  var tileSizeY = height/tileCount;
  var noiseStepY = noiseYRange/tileCount;


  for (var meshY=0; meshY<=tileCount; meshY++) {
    beginShape(TRIANGLE_STRIP);
    for (var meshX=0; meshX<=tileCount; meshX++) {

      var x = map(meshX, 0, tileCount, -width/2, width/2);
      var y = map(meshY, 0, tileCount, -height/2, height/2);

      var noiseX = map(meshX, 0, tileCount, 0, noiseXRange);
      var noiseY = map(meshY, 0, tileCount, 0, noiseYRange);
      var z1 = noise(noiseX, noiseY);
      var z2 = noise(noiseX, noiseY+noiseStepY);

      noiseYMax = max(noiseYMax, z1);
      var interColor;
      colorMode(RGB);
      if (z1 <= threshold) {
        var amount = map(z1, 0, threshold, 0.15, 1);
        interColor = lerpColor(bottomColor, midColor, amount);
      }
      else {
        var amount = map(z1, threshold, noiseYMax, 0, 1);
        interColor = lerpColor(midColor, topColor, amount);
      }
      colorMode(HSB, 360, 100, 100);
      fill(interColor);
      // stroke() and strokeweight() not implemented in P5 OPENGL yet
      strokeWeight(10);
      stroke(0, 0, 0);
      vertex(x, y, z1*zScale);
      vertex(x, y+tileSizeY, z2*zScale);
    }
    endShape();
  }
  pop();
  // tiler.post();
}

function mousePressed() {
  clickX = mouseX;
  clickY = mouseY;
  clickRotationX = rotationX;
  clickRotationZ = rotationZ;
}

function keyPressed() {
  if (keyCode == UP_ARROW) falloff += 0.05;
  if (keyCode == DOWN_ARROW) falloff -= 0.05;
  if (falloff > 1.0) falloff = 1.0;
  if (falloff < 0.0) falloff = 0.0;

  if (keyCode == LEFT_ARROW) octaves--;
  if (keyCode == RIGHT_ARROW) octaves++;
  if (octaves < 0) octaves = 0;

  if (key == '+') zoom += 20;
  if (key == '-') zoom -= 20;
}

function keyReleased() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
  // if (key == 'p' || key == 'P') tiler.init(timestamp()+".png", qualityFactor);
  if (key == 'l' || key == 'L') showStroke = !showStroke;
  if (key == ' ') noiseSeed( floor(random(100000)));
}

function timestamp() {
  return String.format("%1$ty%1$tm%1$td_%1$tH%1$tM%1$tS", Calendar.getInstance());
}

