// https://www.npmjs.com/package/concat
// to run: npm install -g concat

const { exec } = require('child_process');

/*
./filesaver/FileSaver.js
./g.js/g.js
./generative-design-library/generative-design-library.js
./gif.js/gif.js
./gif.js/gif.worker.js
./kd-tree/kdTree.js
./quantize/quantize.js
./quicksettings/quicksettings.js
./treemap-squarify/treemap-squarify.js
*/


const cmd = 'concat -o ./gg-dep-bundle/gg-dep-bundle.js ./filesaver/FileSaver.js ./g.js/g.js ./generative-design-library/generative-design-library.js ./gif.js/gif.js ./gif.js/gif.worker.js ./kd-tree/kdTree.js ./quantize/quantize.js ./quicksettings/quicksettings.js ./treemap-squarify/treemap-squarify.js'
exec(cmd, (err, stdout, stderr) => {
  if (err) {
    // node couldn't execute the command
    return;
  }

  // the *entire* stdout and stderr (buffered)
  console.log("Bundled!");
});


