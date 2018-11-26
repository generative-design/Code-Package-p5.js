function Ribbon(colorPoints, additionalN, options) {

  this.colorPoints = [];
  this.additionalN = additionalN || 0;
  for (var i = 0; i < colorPoints.length; i++) {
    this.colorPoints.push(new ColorPoint(colorPoints[i].num, colorPoints[i].col, colorPoints[i].fitT));
    // make some more colorPoints to lerp the color
    if (i < colorPoints.length - 1) {
      for (var j = 0; j < this.additionalN; j++) {
        var t = j / this.additionalN;
        var num = lerp(colorPoints[i].num, colorPoints[i + 1].num, t);
        var col = lerpColor(colorPoints[i].col, colorPoints[i + 1].col, t);
        var fitT = lerp(colorPoints[i].fitT, colorPoints[i + 1].fitT, t);
        this.colorPoints.push(new ColorPoint(num, col, fitT));
      }
    }
  }
  this.options = options;

  Ribbon.prototype.draw = function() {
    penX = 0;
    penY = 0;
    penA = -HALF_PI;
    penW = 50;
    penFit = 0;

    for (var i = 0; i < this.colorPoints.length; i++) {
      var t = map(i, 0, this.colorPoints.length - 1, 0, 1);
      this.colorPoints[i].draw(t, options);
    }

    fill(255);
    noStroke();
    rect(-30, -2, 60, 10);
  };
}

function ColorPoint(num, col, fitT) {
  this.num = num;
  this.col = col;
  this.fitT = fitT;
  this.hueIndex = 0;
  this.alphaIndex = 0;

  ColorPoint.prototype.draw = function(tAll, opt) {
    // strokeCap(SQUARE);
    strokeWeight(0.3);
    stroke(0);
    noFill();

    var r = red(this.col);
    var g = green(this.col);
    var b = blue(this.col);
    var a = alpha(this.col);

    var newA = penA + angleDifference(radians(map(this.num, 9, 0, 0, 360) - 90), penA) * 0.02;
    var newX = penX + cos(newA) * opt.step;
    var newY = penY + sin(newA) * opt.step;
    var newW = penW + (map(this.num, 0, 9, opt.minW, opt.maxW) - penW) * 0.05;
    var newFit = penFit + (this.fitT - penFit) * 0.02;
    var x1o = penX + cos(penA - HALF_PI) * penW / 2;
    var y1o = penY + sin(penA - HALF_PI) * penW / 2;
    var x1u = penX + cos(penA + HALF_PI) * penW / 2;
    var y1u = penY + sin(penA + HALF_PI) * penW / 2;

    var x2o = newX + cos(newA - HALF_PI) * newW / 2;
    var y2o = newY + sin(newA - HALF_PI) * newW / 2;
    var x2u = newX + cos(newA + HALF_PI) * newW / 2;
    var y2u = newY + sin(newA + HALF_PI) * newW / 2;

    var bw = 184;
    var bxoff = 12.5;
    var bs = bw / opt.maxW;

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

      t = (barcodeInfo[i].x + barcodeInfo[i].width / 2 - bxoff) / bw;
      var bx1 = lerp(x1o, x1u, t);
      var by1 = lerp(y1o, y1u, t);
      var bx2 = lerp(x2o, x2u, t);
      var by2 = lerp(y2o, y2u, t);
      var bsw = barcodeInfo[i].width * bs / bw * 14 * map(tAll, 0, 1, 1, 0.3);
      var balph = lerp(a, alph, tAll);
      // var bcol =

      var fitx1 = lerp(bx1, x1, newFit);
      var fity1 = lerp(by1, y1, newFit);
      var fitx2 = lerp(bx2, x2, newFit);
      var fity2 = lerp(by2, y2, newFit);
      var fitsw = lerp(bsw, 0.3, newFit);
      var fitalph = lerp(balph, alph, newFit);

      strokeWeight(bsw);
      stroke(r, g, b, balph);
      // stroke(r, g, b);
      line(bx1, by1, bx2, by2);
    }

    penX = newX;
    penY = newY;
    penA = newA;
    penW = newW;
    penFit = newFit;

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
