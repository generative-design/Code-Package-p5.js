function Ribbon(colorPoints, additionalN, options) {

  this.colorPoints = [];
  this.additionalN = additionalN || 0;
  for (var i = 0; i < colorPoints.length; i++) {
    this.colorPoints.push(new ColorPoint(colorPoints[i].col));
    // make some more colorPoints to lerp the color
    if (i < colorPoints.length - 1) {
      for (var j = 0; j < this.additionalN; j++) {
        var t = j / this.additionalN;
        var col = lerpColor(colorPoints[i].col, colorPoints[i + 1].col, t);
        this.colorPoints.push(new ColorPoint(col));
      }
    }
  }
  this.options = options;

  Ribbon.prototype.draw = function(x, y) {
    penX = x;
    penY = y;
    penA = 0;
    penW = 50;

    for (var i = 0; i < this.colorPoints.length; i++) {
      var t = map(i, 0, this.colorPoints.length - 1, 0, 1);
      this.colorPoints[i].draw(t, options);
    }
  };
}

function ColorPoint(col) {
  this.col = col;
  this.hueIndex = 0;
  this.alphaIndex = 0;

  ColorPoint.prototype.draw = function(t, opt) {
    // strokeCap(SQUARE);
    strokeWeight(0.3);
    stroke(this.col);
    noFill();

    var r = red(this.col);
    var g = green(this.col);
    var b = blue(this.col);
    var a = alpha(this.col);

    var newA = penA + angleDifference(radians(hue(this.col)), penA) * 0.02;
    var newX = penX + cos(newA) * opt.step;
    var newY = penY + sin(newA) * opt.step;
    var newW = penW + (map(alpha(this.col), 0, 255, opt.minW, opt.maxW) - penW) * 0.05;

    var x1o = penX + cos(penA - HALF_PI) * penW / 2;
    var y1o = penY + sin(penA - HALF_PI) * penW / 2;
    var x1u = penX + cos(penA + HALF_PI) * penW / 2;
    var y1u = penY + sin(penA + HALF_PI) * penW / 2;

    var x2o = newX + cos(newA - HALF_PI) * newW / 2;
    var y2o = newY + sin(newA - HALF_PI) * newW / 2;
    var x2u = newX + cos(newA + HALF_PI) * newW / 2;
    var y2u = newY + sin(newA + HALF_PI) * newW / 2;

    for (var i = 0; i <= opt.n; i++) {
      var t = i / opt.n;
      var x1 = lerp(x1o, x1u, t);
      var y1 = lerp(y1o, y1u, t);
      var x2 = lerp(x2o, x2u, t);
      var y2 = lerp(y2o, y2u, t);

      var afac = 1 - 2 * abs(t - 0.5);
      // var afac = 1 - pow(2 * (t - 0.5), 2);
      var alph = a * afac;
      alph = pow(alph / 255, 0.75) * 255;

      stroke(r, g, b, alph);
      line(x1, y1, x2, y2);
    }

    penX = newX;
    penY = newY;
    penA = newA;
    penW = newW;

  };
}

function angleDifference(theAngle1, theAngle2) {
  var a1 = (theAngle1 % TWO_PI + TWO_PI) % TWO_PI;
  var a2 = (theAngle2 % TWO_PI + TWO_PI) % TWO_PI;

  if (a2 > a1) {
    var d1 = a2 - a1;
    var d2 = a1 + TWO_PI - a2;
    if (d1 <= d2) {
      return -d1;
    } else {
      return d2;
    }
  } else {
    var d1 = a1 - a2;
    var d2 = a2 + TWO_PI - a1;
    if (d1 <= d2) {
      return d1;
    } else {
      return -d2;
    }
  }
}
