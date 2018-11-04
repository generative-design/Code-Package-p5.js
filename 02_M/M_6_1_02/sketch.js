// M_6_1_02
// Spring.js
//
// Generative Gestaltung – Creative Coding im Web
// ISBN: 978-3-87439-902-9, First Edition, Hermann Schmidt, Mainz, 2018
// Benedikt Groß, Hartmut Bohnacker, Julia Laub, Claudius Lazzeroni
// with contributions by Joey Lee and Niels Poldervaart
// Copyright 2018
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
 * two nodes and a spring
 *
 * MOUSE
 * click, drag   : postion of one of the nodes
 *
 * KEYS
 * s             : save png
 */

'use strict';

var sketch = function(p) {

  var nodeA, nodeB;
  var spring;

  p.setup = function() {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.noStroke();
    p.fill(0);

    nodeA = new Node(p.width / 2 + p.random(-50, 50), p.height / 2 + p.random(-50, 50));
    nodeB = new Node(p.width / 2 + p.random(-50, 50), p.height / 2 + p.random(-50, 50));

    nodeA.damping = 0.1;
    nodeB.damping = 0.1;

    spring = new Spring(nodeA, nodeB);
    spring.length = 100;
    spring.stiffness = 0.6;
    spring.damping = 0.3;
  };

  p.draw = function() {
    p.background(255);

    if (p.mouseIsPressed == true) {
      nodeA.x = p.mouseX;
      nodeA.y = p.mouseY;
    }

    // update spring
    spring.update();

    // update node positions
    nodeA.update();
    nodeB.update();

    // draw spring
    p.stroke(0, 130, 164);
    p.strokeWeight(4);
    p.line(nodeA.x, nodeA.y, nodeB.x, nodeB.y);

    // draw nodes
    p.noStroke();
    p.fill(0);
    p.ellipse(nodeA.x, nodeA.y, 20, 20);
    p.ellipse(nodeB.x, nodeB.y, 20, 20);
  };

  p.keyPressed = function() {
    if (p.key == 's' || p.key == 'S') p.saveCanvas(gd.timestamp(), 'png');
  };

};

var myp5 = new p5(sketch);
