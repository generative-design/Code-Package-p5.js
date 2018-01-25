var fs = require('fs-extra');
var path = require('path');
var cheerio = require('cheerio');

// get the root directory;
var rootDirectory = path.dirname(__dirname);
// create a meaningful dirname add "-for-editor" to indicate
var codePackageCopyName = rootDirectory.split("/").slice(-1).pop() + "-for-editor";
// create a path to the parent directory of the root
var copyPathDirectory = path.join(__dirname, '../../', codePackageCopyName)

console.log(rootDirectory)
console.log(copyPathDirectory)

// check if the folder exists, if so remove it!
// NOTE: any changes to that dir will be removed!
// So be sure to always write changes to the main repo
if(fs.existsSync(copyPathDirectory)){
    fs.removeSync(copyPathDirectory)
}

/*
Here's where the magic happens
*/

// first make of copy of the sketches
copyFolderContents(rootDirectory, copyPathDirectory)

// then get the directories for the 01_P and 02_M sketches
var pDirs = getDirectories(copyPathDirectory+"/01_P/").map(function(dir){return copyPathDirectory +"/01_P/" + dir});
// var pNewDirs = getDirectories(copyPathDirectory+"/01_P_NEW/").map(function(dir){return copyPathDirectory +"/01_P_NEW/" + dir});
var mDirs = getDirectories(copyPathDirectory+"/02_M/").map(function(dir){return copyPathDirectory +"/02_M/" + dir});

// copy the libs and fix the paths
make(copyPathDirectory, pDirs)
// make(copyPathDirectory, pNewDirs)
make(copyPathDirectory, mDirs)



/*
@@@ make
Put it all together, Run through each sketch and
copy over the dependencies
*/
function make(newCodePackagePath,sketches){
  sketches.forEach(function(dir){
    if(dir.endsWith("_footage") == false){

      if(fs.existsSync(dir+'/index.html')){
        var dirIndex = dir+'/index.html'
        var sketchDeps = getSketchDependencies(dirIndex);
        copyDependencies(newCodePackagePath, sketchDeps, dir)
      } else{
        console.log("no index file for: " + dir)
      }
    }
  })
}


/*
@@@ getSketchDependencies
get the js & css dependencies based on the index.html file
*/
function getSketchDependencies(path){
  var indexFile = fs.readFileSync(path, "utf8");

  var reqSrcs = [];

  $ = cheerio.load(indexFile);

  // get the script tags
  $('script').each(function(i, elem) {
    var libsrc = $(elem)[0].attribs.src;

    if(libsrc !== undefined ){
      if(libsrc.split("/")[0] == ".."){
        libsrc = libsrc.split("/").slice(2).join("/");
        reqSrcs.push(libsrc);
      }
    }
    $(this).attr("src", libsrc);
    })

  // get the links
  $('link').each(function(i, elem) {
      var libhref = $(elem)[0].attribs.href;
      libhref = libhref.split("/").slice(2).join("/");
      reqSrcs.push(libhref);
      $(this).attr("href", libhref);
  })

  // console.log($.html())
  // console.log(reqSrcs)
  // write out the file
  fs.writeFileSync(path, $.html())

  return reqSrcs;

}


/*
@@@ copyDependencies
copy over all the dependencies in a loop
feeding in the lib array and the current sketch
*/
function copyDependencies(newCodePackagePath,myLibs, currentSketch){
  // copyFolderContents(codePackageCopyPath + sketchDeps[0], pDirs[0] + "/" + sketchDeps[0])
  myLibs.forEach(function(lib){
    copyFolderContents(newCodePackagePath+"/"+lib, currentSketch + "/" + lib);
  })
}

/*
@@@ getDirectories
return the path names
*/
function getDirectories(path) {
  return fs.readdirSync(path).filter(function (file) {
    return fs.statSync(path+'/'+file).isDirectory();
  });
}

/*
@@@ copyFolderContents
copy the folder contents
*/
function copyFolderContents(fromFolder, toFolder){
  // Sync:
  try {
    fs.copySync(fromFolder, toFolder, {overwrite: true})
    // console.log('success!')
  } catch (err) {
    console.error(err)
  }

}
