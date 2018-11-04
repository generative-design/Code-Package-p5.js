var Spring = function(fromNode, toNode, length, stiffness, damping) {
  this.fromNode = fromNode;
  this.toNode = toNode;

  this.length = length || 100;
  this.stiffness = stiffness || 0.6;
  this.damping = damping || 0.9;
};

// ------ apply forces on spring and attached nodes ------
Spring.prototype.update = function() {
  // calculate the target position
  // target = normalize(to - from) * length + from

  var diff = p5.Vector.sub(this.toNode, this.fromNode);
  diff.normalize();
  diff.mult(this.length);
  var target = p5.Vector.add(this.fromNode, diff);

  var force = p5.Vector.sub(target, this.toNode);
  force.mult(0.5);
  force.mult(this.stiffness);
  force.mult(1 - this.damping);

  this.toNode.velocity.add(force);
  this.fromNode.velocity.add(p5.Vector.mult(force, -1));
};
