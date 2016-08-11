// M_6_1_01.pde
// Node.pde
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
 * distribute nodes on the display by letting them repel each other
 *
 * KEYS
 * r             : reset positions
 * s             : save png
 */
'use strict';

var sketch = function( p ) {

  // An array with nodes
  var nodes = [];

  var nodeCount = 200;

  p.setup = function() {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.noStroke();

    // Create nodes
    createNodes();
  }

  p.draw = function() {
    p.fill(255, 20);
    p.rect(0, 0, p.width, p.height);

    p.fill(0);
    for (var i = 0; i < nodes.length; i++) {
      // Let all nodes repel each other
      nodes[i].attractNodes(nodes);
      // Apply velocity vector and update position
      nodes[i].updateNode();
      // Draw node
      p.ellipse(nodes[i].x, nodes[i].y, 10, 10);
    }
  }

  p.keyPressed = function() {
    if (p.key == 's' || p.key == 'S') p.saveCanvas(gd.timestamp(), 'png');
    if (p.key =='r' || p.key =='R') {
      p.background(255);
      createNodes();
    }
  }

  function createNodes() {
    nodes = [];
    for (var i = 0; i < nodeCount; i++) {
      nodes.push(new Node(
        p.width / 2 + p.random(-1, 1),
        p.height / 2 + p.random(-1, 1),
        5,
        p.width - 5,
        5,
        p.height - 5
      ));
    }
  }

  function Node(x, y, minX, maxX, minY, maxY) {
    this.x = x;
    this.y = y;
    this.minX = minX;
    this.maxX = maxX;
    this.minY = minY;
    this.maxY = maxY;
    this.radius = 200; // Radius of impact
    this.ramp = 1; // Influences the shape of the function
    this.strength = -1; // Strength: positive value attracts, negative value repels
    this.damping = 0.5;
    this.velocity = p.createVector();
    this.pVelocity = p.createVector();
    this.maxVelocity = 10;

    Node.prototype.attractNodes = function(nodeArray) {
      for (var i = 0; i < nodeArray.length; i++) {
        var otherNode = nodeArray[i];
        // Stop when empty
        if (otherNode === undefined) break;
        // Continue from the top when node is itself
        if (otherNode === this) continue;

        this.attractNode(otherNode);
      }
    }

    Node.prototype.attractNode = function(otherNode) {
      var thisNodeVector = p.createVector(this.x, this.y);
      var otherNodeVector = p.createVector(otherNode.x, otherNode.y);
      var d = thisNodeVector.dist(otherNodeVector);

      if (d > 0 && d < this.radius) {
        var s = p.pow(d / this.radius, 1 / this.ramp);
        var f = s * 9 * this.strength * (1 / (s + 1) + ((s - 3) / 4)) / d;
        var df = thisNodeVector.sub(otherNodeVector);
        df.mult(f);

        otherNode.velocity.x += df.x;
        otherNode.velocity.y += df.y;
      }
    }

    Node.prototype.updateNode = function() {
      this.velocity.limit(this.maxVelocity);

      this.x += this.velocity.x;
      this.y += this.velocity.y;

      if (this.x < this.minX) {
        this.x = this.minX - (this.x - this.minX);
        this.velocity.x = -this.velocity.x;
      }
      if (this.x > this.maxX) {
        this.x = this.maxX - (this.x - this.maxX);
        this.velocity.x = -this.velocity.x;
      }

      if (this.y < this.minY) {
        this.y = this.minY - (this.y - this.minY);
        this.velocity.y = -this.velocity.y;
      }
      if (this.y > this.maxY) {
        this.y = this.maxY - (this.y - this.maxY);
        this.velocity.y = -this.velocity.y;
      }

      this.velocity.mult(1 - this.damping);
    }

  }

}

var myp5 = new p5(sketch);
