var fs = require('fs-sync');
var path = require('path');
var glob = require('glob');

var pkg = fs.readJSON('../package.json');
var sources = pkg.install.sources;

// copy dependencies from ./node_modules to ./libraries
for (var libName in sources) {
  var sourcePaths = sources[libName];
  for (var sourcePath of sourcePaths) {
    var fileName = path.basename(sourcePath);
    var filePath = path.join('..', sourcePath);
    var targetPath = path.join(libName, fileName);
    console.log('Copy:', filePath, '->', targetPath);
    fs.copy(filePath, targetPath, {force: true});
  }
}

// generate index.html file with links to all sketches
var sketches = glob.sync('../0*/*_*/sketch.js');
var html = '<head>\n';
html += '\t<link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:600" rel="stylesheet">\n';
html += '\t<link href="styles/list.css" rel="stylesheet" type="text/css">\n';
html += '</head>\n<body>\n<section><nav>\n';
var currentFolder = '';
sketches.forEach(function(sketchPath) {
  var url = path.dirname(path.relative('../', sketchPath));
  var dir = path.dirname(url).split(path.sep).pop();
  var name = path.basename(url);
  if (currentFolder !== dir) {
    html += '</nav>\n<h3>' + dir + '</h3>\n<nav>\n';
    currentFolder = dir;
  }
  html += '<a class="sketch" href="' + url + '/index.html" title="' + name + '">\n';
  html += '\t<div class="sketch__img">\n';
  html += '\t\t<img src="' + url + '/' + name + '.png" alt="' + name + '" />\n';
  html += '\t</div>\n';
  html += '\t<span class="btn--link">' + name + '</span>\n';
  html += '</a>\n';
});
html += '</nav></section>\n</body>';
fs.write('../index.html', html);
