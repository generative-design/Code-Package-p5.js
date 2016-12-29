var Agent = function() {
  this.vector = p.createVector(p.random(p.width), p.random(p.height));
  this.vectorOld = this.vector.copy();
  this.stepSize = p.random(1, 5);
  this.isOutside = false;
  this.angle;
}

Agent.prototype.update = function() {
  this.vector.x += p.cos(this.angle) * this.stepSize;
  this.vector.y += p.sin(this.angle) * this.stepSize;
  this.isOutside = this.vector.x < 0 || this.vector.x > p.width || this.vector.y < 0 || this.vector.y > p.height;
  if (this.isOutside) {
    this.vector.set(p.random(p.width), p.random(p.height));
    this.vectorOld = this.vector.copy();
  }
  p.strokeWeight(strokeWidth * this.stepSize);
  p.line(this.vectorOld.x, this.vectorOld.y, this.vector.x, this.vector.y);
  this.vectorOld = this.vector.copy();
  this.isOutside = false;
}

Agent.prototype.update1 = function() {
  this.angle = p.noise(this.vector.x / noiseScale, this.vector.y / noiseScale) * noiseStrength;
  this.update();
}

Agent.prototype.update2 = function() {
  this.angle = p.noise(this.vector.x / noiseScale, this.vector.y / noiseScale) * 24;
  this.angle = (this.angle - p.floor(this.angle)) * noiseStrength;
  this.update();
}
