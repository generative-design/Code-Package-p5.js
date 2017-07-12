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
    console.log("Copy:", filePath, "->", targetPath);
    fs.copy(filePath, targetPath, {force: true});
  }
}

// generate index.html file with links to all sketches
var sketches = glob.sync('../0*/*_*/sketch.js');
var html = "<ul>\n";
sketches.forEach(function(sketchPath) {
  var url = path.dirname(path.relative('../', sketchPath));
  var name = path.basename(url);
  html += "<li>";
  html += "<a href='"+url+"'>"+name+"</a>";
  html += "</li>\n";
});
html += "</ul>\n";
fs.write('../index.html', html);
