/**
 * generates a specific color palette and some random "rect-tilings" with radial gradient
 *
 * MOUSE
 *
 *
 * KEYS
 * s                   : save png
 */
"use strict";

var video;
var subtitles = [];

var searchQuery = /\b(warp)\b/i;

var searchResults = [];
var currentResult;

var fragmentTimer;

function preload() {
  video = createVideo('data/video.mp4');
  loadStrings('data/subs.srt', parseSubtitles);
}

function parseSubtitles(lines) {
  var timecodeRegEx = new RegExp(/((\d{2}:){2}\d{2},\d{3})\s-->\s((\d{2}:){2}\d{2},\d{3})/);
  var subtitleObject;
  var startTime;
  var endTime;
  var dialog;
  for (var i = 1; i <= lines.length; i++) {
    if (timecodeRegEx.test(lines[i]) || i === lines.length) {

      if (dialog) {
        subtitles.push(new SubTitleObject(startTime, endTime, dialog));
      }

      if (i < lines.length) {
        startTime = lines[i].replace(/\s.+$/, '');
        endTime = lines[i].replace(/^.+\s/, '');
        dialog = '';
      }

    } else  {
      dialog += lines[i] + ' ';
    }
  }
  console.log(subtitles);
}

function SubTitleObject(startTime, endTime, dialog) {
  this.startTimeStamp = startTime;
  this.endTimeStamp = endTime;
  this.startTime = getTimeInSeconds(startTime);
  this.endTime = getTimeInSeconds(endTime);
  this.dialog = dialog.replace(/\s\d+\s$|<(?:.)*?>/g, '').trim();
  this.duration = this.endTime - this.startTime;
}

function getTimeInSeconds(timeString) {
	var hours = parseInt(timeString.replace(/:.+$/, ''));
	var minutes = parseInt(timeString.replace(/^\d.+?:|:\d.+$/, ''));
	var seconds = parseInt(timeString.replace(/^\d.+:|\,.+$/, ''));
	var milSeconds = parseInt(timeString.replace(/^.+\,/, ''));
	return (hours * 60 * 60) + (minutes * 60) + seconds + (milSeconds / 1000);
}

function findSubtiles(searchPattern) {
  searchPattern = new RegExp(searchPattern);
  var results = [];
  subtitles.forEach(function(subtitle) {
    if (searchPattern.test(subtitle.dialog)) {
      results.push(subtitle);
    };
  });
  return results;
}

function setup() {
  createCanvas(windowWidth, 200);
  background(52);
  noStroke();

  searchResults = findSubtiles(searchQuery);
  console.log(searchResults);
  loopSearchResults(searchResults, 0);
}

function draw() {
  for (var i = 0; i < subtitles.length; i++) {

    var x = map(subtitles[i].startTime, subtitles[0].startTime, subtitles[subtitles.length - 1].endTime, 0, width);
    var w = map(subtitles[i].endTime, subtitles[0].startTime, subtitles[subtitles.length - 1].endTime, 0, width) - x;
    var h = map(subtitles[i].dialog.length, 0, 80, 0, height);

    if (currentResult === subtitles[i]) {
      fill(0, 255, 251);
    } else if (searchResults.indexOf(subtitles[i]) != -1) {
      fill(232, 65, 36);
    } else {
      fill(100);
    }
    rect(x, 0, w, h);

  }
}

function loopSearchResults(searchResults, i) {
  var duration = searchResults[i].duration;
  video.play();
  video.time(searchResults[i].startTime);
  currentResult = searchResults[i];
  console.log(searchResults[i].startTimeStamp, searchResults[i].dialog);
  fragmentTimer = setTimeout(playFragment, duration * 1000, searchResults, i);
}

function playFragment(searchResults, i) {
  video.pause();
  if (i < searchResults.length - 1) {
    loopSearchResults(searchResults, i + 1);
  } else {
    clearTimeout(fragmentTimer);
  }
}

function keyPressed() {
  // if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
  if (key == ' ') {
    clearTimeout(fragmentTimer);
    loopSearchResults(searchResults, 0);
  }

  if (key == 'p' || key == 'P') {
    clearTimeout(fragmentTimer);
    if (video.elt.paused) {
      video.play();
    } else {
      video.pause();
    }
  }
}
