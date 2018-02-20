// M_6_1_03
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
 * more nodes and more springs
 *
 * KEYS
 * r             : reset positions
 * s             : save png
 * p             : save pdf
 */

'use strict';

var sketch = function(p) {
  // an array for the nodes
  var nodeCount = 100;
  var nodes = [];
  // an array for the springs
  var springs = [];

  // dragged node
  var selectedNode = null;

  var nodeDiameter = 16;

  p.setup = function() {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.background(255);
    p.noStroke();

    initNodesAndSprings();
  }

  p.draw = function() {

    p.background(255);

    // let all nodes repel each other
    for (var i = 0; i < nodes.length; i++) {
      nodes[i].attractNodes(nodes);
    }
    // apply spring forces
    for (var i = 0; i < springs.length; i++) {
      springs[i].update();
    }
    // apply velocity vector and update position
    for (var i = 0; i < nodes.length; i++) {
      nodes[i].update();
    }

    if (selectedNode != null) {
      selectedNode.x = p.mouseX;
      selectedNode.y = p.mouseY;
    }

    // draw nodes
    p.stroke(0, 130, 164);
    p.strokeWeight(2);
    for (var i = 0; i < springs.length; i++) {
      p.line(springs[i].fromNode.x, springs[i].fromNode.y, springs[i].toNode.x, springs[i].toNode.y);
    }
    // draw nodes
    p.noStroke();
    for (var i = 0; i < nodes.length; i++) {
      p.fill(255);
      p.ellipse(nodes[i].x, nodes[i].y, nodeDiameter, nodeDiameter);
      p.fill(0);
      p.ellipse(nodes[i].x, nodes[i].y, nodeDiameter - 4, nodeDiameter - 4);
    }

  }


  var initNodesAndSprings = function() {
    // init nodes
    nodes = [];

    var rad = nodeDiameter / 2;
    for (var i = 0; i < nodeCount; i++) {
      var newNode = new Node(p.width / 2 + p.random(-200, 200), p.height / 2 + p.random(-200, 200));
      newNode.minX = rad;
      newNode.minY = rad;
      newNode.maxX = p.width - rad;
      newNode.maxY = p.height - rad;
      newNode.radius = 100;
      newNode.strength = -5;
      nodes.push(newNode);
    }

    // set springs randomly
    springs = [];

    for (var j = 0; j < nodes.length - 1; j++) {
      var rCount = p.floor(p.random(1, 2));
      for (var i = 0; i < rCount; i++) {
        var r = p.floor(p.random(j + 1, nodes.length));
        var newSpring = new Spring(nodes[j], nodes[r]);
        newSpring.length = 20;
        newSpring.stiffness = 1;
        springs.push(newSpring);
      }
    }

  }


  p.mousePressed = function() {
    // Ignore anything greater than this distance
    var maxDist = 20;
    for (var i = 0; i < nodes.length; i++) {
      var checkNode = nodes[i];
      var d = p.dist(p.mouseX, p.mouseY, checkNode.x, checkNode.y);
      if (d < maxDist) {
        selectedNode = checkNode;
        maxDist = d;
      }
    }
  }

  p.mouseReleased = function() {
    if (selectedNode != null) {
      selectedNode = null;
    }
  }


  p.keyPressed = function() {
    if (p.key == 's' || p.key == 'S') p.saveCanvas(gd.timestamp(), 'png');

    if (key == 'r' || key == 'R') {
      p.background(255);
      initNodesAndSprings();
    }
  }


}

var myp5 = new p5(sketch);
