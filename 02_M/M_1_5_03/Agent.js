var Agent = function(noiseZRange) {
  this.vector = myp5.createVector(myp5.random(myp5.width), myp5.random(myp5.height));
  this.vectorOld = this.vector.copy();
  this.stepSize = myp5.random(1, 5);
  this.angle;
  this.noiseZ = myp5.random(noiseZRange);
};

Agent.prototype.update = function(strokeWidth, noiseZVelocity) {
  this.vector.x += myp5.cos(this.angle) * this.stepSize;
  this.vector.y += myp5.sin(this.angle) * this.stepSize;

  if (this.vector.x < -10) this.vector.x = this.vectorOld.x = myp5.width + 10;
  if (this.vector.x > myp5.width + 10) this.vector.x = this.vectorOld.x = -10;
  if (this.vector.y < -10) this.vector.y = this.vectorOld.y = myp5.height + 10;
  if (this.vector.y > myp5.height + 10) this.vector.y = this.vectorOld.y = -10;

  myp5.strokeWeight(strokeWidth * this.stepSize);
  myp5.line(this.vectorOld.x, this.vectorOld.y, this.vector.x, this.vector.y);

  this.vectorOld = this.vector.copy();

  this.noiseZ += noiseZVelocity;
};

Agent.prototype.update1 = function(strokeWidth, noiseScale, noiseStrength, noiseZVelocity) {
  this.angle = myp5.noise(this.vector.x / noiseScale, this.vector.y / noiseScale, this.noiseZ) * noiseStrength;

  this.update(strokeWidth, noiseZVelocity);
};

Agent.prototype.update2 = function(strokeWidth, noiseScale, noiseStrength, noiseZVelocity) {
  this.angle = myp5.noise(this.vector.x / noiseScale, this.vector.y / noiseScale, this.noiseZ) * 24;
  this.angle = (this.angle - myp5.floor(this.angle)) * noiseStrength;

  this.update(strokeWidth, noiseZVelocity);
};
