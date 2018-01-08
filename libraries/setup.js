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
var html = '<head><link href="styles/list.css" rel="stylesheet" type="text/css"></head><body><nav>';
var currentFolder = '';
sketches.forEach(function(sketchPath) {
  var url = path.dirname(path.relative('../', sketchPath));
  var dir = path.dirname(url).split(path.sep).pop();
  var name = path.basename(url);
  if (currentFolder !== dir) {
    html += '</nav>\n<h3>' + dir + '</h3>\n<nav>';
    currentFolder = dir;
  }
  html += '<div>\n\t<img src="' + url + '/' + name + '.png" alt="' + name + '" />\n';
  html += '\t<a class="btn--link" href="' + url + '/index.html" title="' + name + '">' + name + '</a>\n</div>\n';
});
html += '</nav></body>';
fs.write('../index.html', html);
