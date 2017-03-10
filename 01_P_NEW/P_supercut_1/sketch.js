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

var searchQuery = /\b(human|klingon|romulan|vulcan|borg)\b/i;
var queryInputElement;
var montageMode = 1;

var searchResults = [];
var currentResult;

var fragmentTimer;

function preload() {
  video = createVideo('data1/video.mkv');
  loadStrings('data1/subs.srt', parseSubtitles);
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
  searchPattern = new RegExp(searchPattern, 'i');
  console.log(searchPattern);
  var results = [];
  subtitles.forEach(function(subtitle) {
    if (searchPattern.test(subtitle.dialog)) {
      results.push(subtitle);
    };
  });
  return results;
}

function submitQueryInput() {
  searchQuery = queryInputElement.value();
  resetMontage(montageMode);
}

function resetMontage(mode) {
  montageMode = mode;

  clearTimeout(fragmentTimer);
  video.stop();
  video.speed(1);
  video.elt.ontimeupdate = null;

  searchResults = findSubtiles(searchQuery);
  console.log(searchQuery, searchResults);

  if (searchResults.length) {
    switch (montageMode) {
      case 1:
      queryResultMontage(searchResults, 0);
      break;
      case 2:
      video.play();
      video.speed(1);
      everyTimeTheyMentionQueryItGetsFaster(searchResults, 0);
      break;
    }
  }

}

function queryResultMontage(searchResults, i) {
  var duration = searchResults[i].duration;
  video.play();
  video.time(searchResults[i].startTime);
  currentResult = searchResults[i];
  console.log(searchResults[i].startTimeStamp, searchResults[i].dialog);
  fragmentTimer = setTimeout(function() {
    video.pause();
    if (i < searchResults.length - 1) {
      queryResultMontage(searchResults, i + 1);
    } else {
      clearTimeout(fragmentTimer);
    }
  }, duration * 1000);
}

function everyTimeTheyMentionQueryItGetsFaster(searchResults, i) {
  video.elt.ontimeupdate = function() {
    if (i < searchResults.length - 1) {
      if (video.time() > searchResults[i].startTime) {
        video.speed(video.speed() / QUARTER_PI);
        console.log(video.speed(), searchResults[i].startTimeStamp, searchResults[i].dialog);
        i++;
      }
    } else {
      video.elt.ontimeupdate = null;
      return false;
    };
  }
}

function setup() {
  createCanvas(windowWidth, 200);
  background(52);
  noStroke();

  queryInputElement = createInput(searchQuery);
  var searchSubmitButton = createButton('SEARCH');
  searchSubmitButton.mousePressed(submitQueryInput);

  resetMontage(montageMode);
}

function draw() {
  for (var i = 0; i < subtitles.length; i++) {

    var x = map(subtitles[i].startTime, subtitles[0].startTime, subtitles[subtitles.length - 1].endTime, 0, width);
    var w = map(subtitles[i].endTime, subtitles[0].startTime, subtitles[subtitles.length - 1].endTime, 0, width) - x;
    var h = map(subtitles[i].dialog.length, 0, 100, 0, height);

    if (video.time() > subtitles[i].startTime && video.time() < subtitles[i].endTime) {
      fill(232, 65, 36);
    } else {
      fill(100);
    }
    rect(x, 0, w, h);

  }
}

function keyPressed() {
  // if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
  if (key == 'r' || key == 'R') {
    resetMontage(montageMode);
  }

  if (key == '1') resetMontage(1);
  if (key == '2') resetMontage(2);

  if (key == 'p' || key == 'P') {
    clearTimeout(fragmentTimer);
    if (video.elt.paused) {
      video.play();
    } else {
      video.pause();
    }
  }
}
