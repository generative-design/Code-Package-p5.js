// P_2_4_1_01
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
 * draw tool. draw with a mutating line.
 *
 * MOUSE
 * drag                : draw
 *
 * KEYS
 * 1-4                 : switch default colors
 * del, backspace      : clear screen
 * space               : new random color
 * arrow left          : change origin along x axis
 * arrow right         : change origin along y axis
 * arrow up            : line size +
 * arrow down          : line size -
 * s                   : save png
*/

'use strict';

var socket;
var params = {
  x1:0,
  y1:0,
  x2:0,
  y2:0,
  lineModuleSize:1,
  c: null
};

function setup(){
  createCanvas(600,600);
  background(255);
  cursor(CROSS);
  strokeWeight(0.75);
  params.c = color(181,157,0,100);

  // include the socket connection
  socket = io.connect('http://localhost:3000')
  socket.on('mouse', newDrawing);

  // set starting origin point
  selectOrigin(random(0,3));

}

function selectOrigin(_edge){
  var edge = round(_edge);
  if(edge === 0) {
    params.x1 = 0;
    params.y1 = random(height);
  } else if (edge === 1) {
    params.x1 = width;
    params.y1 = random(height);
  } else if(edge === 2) {
    params.x1 = random(width);
    params.y1 = 0;
  } else {
    params.x1 = random(width);
    params.y1 = height;
  }

}

function newDrawing(data){
  stroke(parseColor(data.c));
  strokeWeight(data.lineModuleSize);
  line(data.x1, data.y1, data.x2, data.y2)

}


function draw(){
  if(mouseIsPressed){
    params.x2 = mouseX;
    params.y2 = mouseY;

    stroke(parseColor(params.c));
    strokeWeight(params.lineModuleSize);
    line(params.x1, params.y1, params.x2, params.y2)

    socket.emit('mouse',params);
  }

}


function keyPressed() {
  if (keyCode === UP_ARROW) params.lineModuleSize += 2;
  if (keyCode === DOWN_ARROW) params.lineModuleSize -= 2;

  if (keyCode === RIGHT_ARROW) selectOrigin(random(0,1));
  if (keyCode === LEFT_ARROW) selectOrigin(random(2,3));

}

function parseColor(colorObject){
  return color(colorObject.levels[0],colorObject.levels[1],colorObject.levels[2],colorObject.levels[3]);

}


function keyReleased() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
  if (keyCode === DELETE || keyCode === BACKSPACE) background(255);

  // change color
  if (key == ' ') params.c = color(random(255), random(255), random(255), random(80, 150));
  //default colors from 1 to 4
  if (key == '1') params.c = color(181,157,0,100);
  if (key == '2') params.c = color(0,130,164,100);
  if (key == '3') params.c = color(87,35,129,100);
  if (key == '4') params.c = color(197,0,123,100);

}


