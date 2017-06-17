// P_pendulum_4
/**
 * Drawing tool that moves a branching pendulum contraption along paths drawn by the mouse.
 * The last joint of the pendulum leaves behind its own vertex, which is used to draw a
 * shape on each iteration.
 *
 * MOUSE
 * mouse               : click and drag to create a path to draw a pendulum along with
 *
 * KEYS
 * 1                   : toggle path line
 * 2                   : toggle pendulum
 * 3                   : toggle pendulum path
 * arrow up            : increase amplitude
 * arrow down          : decrease amplitude
 * arrow left          : decrease gravity
 * arrow right         : increase gravity
 * s                   : save png
 *
 * CONTRIBUTED BY
 * [Niels Poldervaart](http://NielsPoldervaart.nl)
 */
"use strict";

var shapes = [];

var newShape;

var joints = 4;
var amplitude = 64;
var resolution = 0.2;
var gravity = 0.099;
var damping = 0.995;
var maxArms = 3;
var armSizeDeviation = 0.25;

var showPath = true;
var showPendulum = true;
var showPendulumPath = true;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);
  noFill();
  strokeWeight(1);
  background(220);
}

function draw() {
  background(0, 0, 100);

  shapes.forEach(function(shape) {
    shape.draw();
    shape.update();
  });

  if (newShape) {
    newShape.addPos(mouseX, mouseY);
    newShape.draw();
    newShape.update();
  }
}

function Shape(pendulumPathColor) {
  this.shapePath = [];
  this.iterator = 0;
  this.resolution = resolution;
  this.amplitude = amplitude;
  this.pendulum = new Pendulum(this.amplitude, joints);
  this.pendulumPath = [];
  this.pendulumPathColor = pendulumPathColor;

  Shape.prototype.addPos = function(x, y) {
    var newPos = createVector(x, y);
    this.shapePath.push(newPos);
  };

  Shape.prototype.draw = function() {
    strokeWeight(0.8);
    stroke(0, 10);

    if (showPath) {
      beginShape();
      this.shapePath.forEach(function(pos) {
        vertex(pos.x, pos.y);
      });
      endShape();
    }

    if (showPendulumPath && this.pendulumPath.length) {
      strokeWeight(1);
      stroke(this.pendulumPathColor);
      fill(this.pendulumPathColor);
      this.pendulumPath.forEach(function(group) {
        beginShape();
        group.forEach(function(pos) {
          vertex(pos.x, pos.y);
        });
        endShape();
      });
      noFill();
    }

    if (this.iterator < this.shapePath.length) {
      var currentIndex = floor(this.iterator);

      var currentPos = this.shapePath[currentIndex];
      var previousPos = this.shapePath[currentIndex - 1];
      if (previousPos) {
        var offsetPos = p5.Vector.lerp(previousPos, currentPos, this.iterator - currentIndex);
        var heading = atan2(currentPos.y - previousPos.y, currentPos.x - previousPos.x) - HALF_PI;

        push();
        translate(offsetPos.x, offsetPos.y);
        this.pendulum.update(heading);
        if (showPendulum) {
          this.pendulum.draw();
        }
        pop();

        this.pendulumPath.push(this.pendulum.getTrail(offsetPos));
      }
    }
  };

  Shape.prototype.update = function() {
    this.iterator += this.resolution;
    this.iterator = constrain(this.iterator, 0, this.shapePath.length);
  };
}

function Pendulum(size, hierarchy) {
  this.hierarchy = hierarchy - 1;
  this.armCount = floor(random(2, maxArms + 1));
  this.pendulumArms = [];
  this.size = size;
  this.angle = random(TAU);
  this.origin = createVector(0, 0);
  this.end = createVector(0, 0);
  this.gravity = gravity;
  this.damping = damping;
  this.angularAcceleration = 0;
  this.angularVelocity = 0;

  for (var i = 0; i < this.armCount && this.hierarchy > 0; i++) {
    this.pendulumArms.push(new Pendulum(this.size / randomGaussian(1.5, armSizeDeviation), this.hierarchy));
  }

  Pendulum.prototype.update = function(heading) {
    this.end.set(this.origin.x + this.size * sin(this.angle), this.origin.y + this.size * cos(this.angle));

    this.angularAcceleration = (-this.gravity / this.size) * sin(this.angle + heading);
    this.angle += this.angularVelocity;
    this.angularVelocity += this.angularAcceleration;
    this.angularVelocity *= this.damping;

    this.pendulumArms.forEach(function(pendulumArm) {
      pendulumArm.update(heading);
    });
  };

  Pendulum.prototype.getTrail = function(offset, pendulumTrailPaths) {
    pendulumTrailPaths = pendulumTrailPaths || [];

    offset = offset.copy().add(this.end);

    this.pendulumArms.forEach(function(pendulumArm) {
      if (pendulumArm.pendulumArms.length) {
        pendulumArm.getTrail(offset, pendulumTrailPaths);
      } else {
        pendulumTrailPaths.push(offset.copy().add(pendulumArm.end));
      }
    });

    return pendulumTrailPaths;
  };

  Pendulum.prototype.draw = function() {
    stroke(0, 40);
    beginShape();
    vertex(this.origin.x, this.origin.y);
    vertex(this.end.x, this.end.y);
    endShape();

    fill(0, 20);
    ellipse(this.end.x, this.end.y, 2, 2);
    noFill();

    this.pendulumArms.forEach(function(pendulumArm) {
      push();
      translate(this.end.x, this.end.y);
      pendulumArm.draw();
      pop();
    }.bind(this));
  };
}

function mousePressed() {
  newShape = new Shape(color(random(360), 80, 60, 10));
  newShape.addPos(mouseX, mouseY);
}

function mouseReleased() {
  shapes.push(newShape);
  newShape = undefined;
}

function keyPressed() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');

  if (key == ' ') {
    shapes = [];
    background(255);
    loop();
  }

  if (key == '1') showPath = !showPath;
  if (key == '2') showPendulum = !showPendulum;
  if (key == '3') showPendulumPath = !showPendulumPath;

  if (keyCode == UP_ARROW) amplitude += 2;
  if (keyCode == DOWN_ARROW) amplitude -= 2;
  if (keyCode == LEFT_ARROW) gravity -= 0.001;
  if (keyCode == RIGHT_ARROW) gravity += 0.001;
}
