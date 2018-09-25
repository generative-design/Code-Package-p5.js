var fs     = require("fs")
var path   = require("path")
var concat = require("source-map-concat")

var resolveSourceMapSync = require("source-map-resolve").resolveSourceMapSync
var createDummySourceMap = require("source-map-dummy")


var jsFiles = ["./filesaver/FileSaver.js","./g.js/g.js","./generative-design-library/generative-design-library.js","./gif.js/gif.js","./gif.js/gif.worker.js","./kd-tree/kdTree.js","./quantize/quantize.js","./quicksettings/quicksettings.js","./treemap-squarify/treemap-squarify.js"]

jsFiles = jsFiles.map(function(file) {
  return {
    source:  file,
    code: fs.readFileSync(file).toString()
  }
})
jsFiles.forEach(function(file) {
  var previousMap = resolveSourceMapSync(file.code, file.source, fs.readFileSync)
  if (previousMap) {
    file.map = previousMap.map
    file.sourcesRelativeTo = previousMap.sourcesRelativeTo
  } else {
    file.map = createDummySourceMap(file.code, {source: file.source, type: "js"})
  }
})

function wrap(node, file) {
  node.prepend("void function(){\n// File: " + file.source + "\n")
  node.add("}();")
}

var output = "./gg-dep-bundle/gg-dep-bundle.js"

var concatenated = concat(jsFiles, {
  delimiter: "\n",
  process: wrap,
  mapPath: output + ".map"
})


var result = concatenated.toStringWithSourceMap({
 file: path.basename(output)
})

fs.writeFileSync(output, result.code)
fs.writeFileSync(output + ".map", result.map.toString())
