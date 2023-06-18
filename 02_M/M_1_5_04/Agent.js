var Agent = function(noiseStickingRange, agentAlpha, noiseScale, noiseStrength, strokeWidth, agentWidthMin, agentWidthMax, zNoiseVelocity) {
  this.vector = myp5.createVector(myp5.random(myp5.width), myp5.random(myp5.height));
  this.vectorOld = this.vector.copy();
  this.randomizer = myp5.random();
  this.stepSize = 1 + this.randomizer * 4;
  this.noiseZ = myp5.random(noiseStickingRange);
  this.angle = 0
  this.color = this.randomizer < 0.5 ? myp5.color(myp5.random(170, 190), 70, myp5.random(100), agentAlpha) : myp5.color(myp5.random(40, 60), 70, myp5.random(100), agentAlpha);
  this.noiseScale = noiseScale;
  this.noiseStrength = noiseStrength;
  this.strokeWidth = strokeWidth;
  this.agentWidthMin = agentWidthMin;
  this.agentWidthMax = agentWidthMax;
  this.zNoiseVelocity = zNoiseVelocity;
};

Agent.prototype.updateStart = function() {
  this.angle = myp5.noise(this.vector.x / this.noiseScale, this.vector.y / this.noiseScale, this.noiseZ) * this.noiseStrength;

  this.vector.x += myp5.cos(this.angle) * this.stepSize;
  this.vector.y += myp5.sin(this.angle) * this.stepSize;

  if (this.vector.x < -10) this.vector.x = this.vectorOld.x = myp5.width + 10;
  if (this.vector.x > myp5.width + 10) this.vector.x = this.vectorOld.x = -10;
  if (this.vector.y < -10) this.vector.y = this.vectorOld.y = myp5.height + 10;
  if (this.vector.y > myp5.height + 10) this.vector.y = this.vectorOld.y = -10;
};

Agent.prototype.updateEnd = function() {
  this.vectorOld = this.vector.copy();

  this.noiseZ += this.zNoiseVelocity;
};

Agent.prototype.update1 = function() {
  this.updateStart();

  myp5.stroke(this.color);
  myp5.strokeWeight(this.strokeWidth);
  myp5.line(this.vectorOld.x, this.vectorOld.y, this.vector.x, this.vector.y);

  var agentWidth = myp5.map(this.randomizer, 0.1, 1, this.agentWidthMin, this.agentWidthMax);
  myp5.push();
  myp5.translate(this.vectorOld.x, this.vectorOld.y);
  myp5.rotate(myp5.atan2(this.vector.y - this.vectorOld.y, this.vector.x - this.vectorOld.x));
  myp5.line(0, -agentWidth, 0, agentWidth);
  myp5.pop();

  this.updateEnd();
};

Agent.prototype.update2 = function() {
  this.updateStart();

  myp5.stroke(this.color);
  myp5.strokeWeight(2);
  var agentWidth = myp5.map(this.randomizer, 0.1, 1, this.agentWidthMin, this.agentWidthMax) * 2;
  myp5.ellipse(this.vectorOld.x, this.vectorOld.y, agentWidth, agentWidth);

  this.updateEnd();
};
