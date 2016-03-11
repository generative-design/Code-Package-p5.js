// P_2_3_6_02.pde
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
 * draw tool. draws a specific module according to
 * its east, south, west and north neighbours.
 * with switchable tileset
 *
 * MOUSE
 * drag left           : draw new module
 * drag right          : delete a module
 *
 * KEYS
 * 1-8                 : switch tileset
 * y,x,c,v,b           : switch colors
 * del, backspace      : clear screen
 * r                   : random tiles
 * s                   : save png
 * g                   : toogle. show grid
 * d                   : toogle. show module values
 */
'use strict';

var modules = [];
var moduleType = ["A", "B", "C", "D", "E", "F", "J", "K"];
var activeModuleSet = "A";

var tileSize = 30;
var gridResolutionX;
var gridResolutionY;
var tiles = [];
var tileColors = [];
var tileType = [];
var activeTileColor;

var doDrawGrid = true;
var randomMode = false;
var debugMode = false;

function preload() {
  for (var i = 0; i < moduleType.length; i++) {
    modules[moduleType[i]] = [];
    for (var j = 0; j < 16; j++) {
      modules[moduleType[i]].push(loadImage("data/" + moduleType[i] + "_" + nf(j,2) + ".svg"));
    }
  }
}

function setup() {
  // use full window size
  createCanvas(windowWidth, windowHeight);

  colorMode(HSB,360,100,100,100);
  cursor(CROSS);
  rectMode(CENTER);
  imageMode(CENTER);
  strokeWeight(0.15);
  textSize(8);
  textAlign(CENTER,CENTER);

  gridResolutionX = round(width / tileSize) + 2;
  gridResolutionY = round(height / tileSize) + 2;
  activeTileColor = color(0);

  // invert shape color so image tint can be applied
  for (var i = 0; i < moduleType.length; i++) {
    for (var j = 0; j < modules[moduleType[i]].length; j++) {
      modules[moduleType[i]][j].filter(INVERT);
    }
  }

  initTiles();
}

function draw() {
  background(360);

  if (mouseIsPressed && mouseButton == LEFT) setTile();
  if (mouseIsPressed && mouseButton == RIGHT) unSetTile();

  if (doDrawGrid) drawGrid();
  drawModules();
}

function initTiles() {
  for (var gridX = 0; gridX < gridResolutionX; gridX++) {
    tiles[gridX] = [];
    tileColors[gridX] = [];
    tileType[gridX] = [];
    for (var gridY = 0; gridY < gridResolutionY; gridY++) {
      tiles[gridX][gridY] = 0;
      tileColors[gridX][gridY] = color(random(360), 0, random(100));
    }
  }
}

function setTile() {
  // convert mouse position to grid coordinates
  var gridX = floor(mouseX / tileSize) + 1;
  gridX = constrain(gridX, 1, gridResolutionX - 2);
  var gridY = floor(mouseY / tileSize) + 1;
  gridY = constrain(gridY, 1, gridResolutionY - 2);
  tiles[gridX][gridY] = 1;
  tileColors[gridX][gridY] = activeTileColor;
  if (randomMode) {
    tileType[gridX][gridY] = moduleType[int(random(moduleType.length))];
  } else {
    tileType[gridX][gridY] = activeModuleSet;
  }
}

function unsetTile() {
  var gridX = floor(mouseX / tileSize) + 1;
  gridX = constrain(gridX, 1, gridResolutionX - 2);
  var gridY = floor(mouseY / tileSize) + 1;
  gridY = constrain(gridY, 1, gridResolutionY - 2);
  tiles[gridX][gridY] = 0;
}

function drawGrid() {
  for (var gridX = 0; gridX < gridResolutionX; gridX++) {
    for (var gridY = 0; gridY < gridResolutionY; gridY++) {
      var posX = tileSize * gridX - tileSize / 2;
      var posY = tileSize * gridY - tileSize / 2;
      fill(360);
      if (debugMode) {
        if (tiles[gridX][gridY] == 1) fill(220);
      }
      stroke(0);
      noFill();
      rect(posX, posY, tileSize, tileSize);
    }
  }
}

function drawModules() {
  for (var gridX = 1; gridX < gridResolutionX - 1; gridX++) {
    for (var gridY = 1; gridY < gridResolutionY - 1; gridY++) {
      // use only active tiles
      var currentTile = tiles[gridX][gridY];
      if (tiles[gridX][gridY]  != 0) {
        var binaryResult = "";
        // check the four neightbours, each can be true or false
        // create a binary result out of it, eg. 1011
        // NORTH
        if (tiles[gridX][gridY - 1] != 0) {
          binaryResult += "1";
        } else {
          binaryResult += "0";
        }
        // WEST
        if (tiles[gridX - 1][gridY] != 0) {
          binaryResult += "1";
        } else {
          binaryResult += "0";
        }
        // SOUTH
        if (tiles[gridX][gridY + 1] != 0) {
          binaryResult += "1";
        } else {
          binaryResult += "0";
        }
        // EAST
        if (tiles[gridX + 1][gridY] != 0) {
          binaryResult += "1";
        } else {
          binaryResult += "0";
        }

        // convert binary string to a decimal values from 0 - 15
        var decimalResult = parseInt(binaryResult, 2);
        var posX = tileSize * gridX - tileSize / 2;
        var posY = tileSize * gridY - tileSize / 2;

        noStroke();
        tint(tileColors[gridX][gridY]);

        // decimalResult is also the index for the shape array
        image(modules[tileType[gridX][gridY]][decimalResult], posX, posY, tileSize, tileSize);

        if (debugMode) {
          fill(150);
          text(currentTile + "\n" + decimalResult + "\n" + binaryResult, posX, posY);
        }
      }
    }
  }
}

function keyPressed(){
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');

  if (keyCode === DELETE || keyCode === BACKSPACE) initTiles();
  if (key == 'g' || key == 'G') doDrawGrid = !doDrawGrid;
  if (key == 'd' || key == 'D') debugMode = !debugMode;
  if (key == 'r' || key == 'R') randomMode = !randomMode;

  if (key == '1') activeModuleSet = "A";
  if (key == '2') activeModuleSet = "B";
  if (key == '3') activeModuleSet = "C";
  if (key == '4') activeModuleSet = "D";
  if (key == '5') activeModuleSet = "E";
  if (key == '6') activeModuleSet = "F";
  if (key == '7') activeModuleSet = "J";
  if (key == '8') activeModuleSet = "K";

  if (key == 'y' || key == 'Y') activeTileColor = color(0);
  if (key == 'x' || key == 'X') activeTileColor = color(52, 100, 71);
  if (key == 'c' || key == 'C') activeTileColor = color(192, 100, 64);
  if (key == 'v' || key == 'V') activeTileColor = color(273, 73, 51);
  if (key == 'b' || key == 'B') activeTileColor = color(323, 100, 77);
}
