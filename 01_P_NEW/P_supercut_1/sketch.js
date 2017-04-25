/**
 * Play fragments of the video where search query is mentioned in dialog
 *
 *
 * KEYS
 * r                   : restart current montage from the beginning
 * p                   : play/pause video
 */
"use strict";

var video;
var subtitles = [];

var searchQuery = /\b(comet|asteroid|planet|moon|sun)\b/i;
var queryInputElement;

var searchResults = [];
var currentResult;

var fragmentTimer;

function preload() {
  video = createVideo('data/video.mkv');
  loadStrings('data/subs.vtt', parseSubtitles);
}

function parseSubtitles(lines) {
  var timecodeRegEx = new RegExp(/((\d{2}:){2}\d{2}(,|\.)\d{3})\s-->\s((\d{2}:){2}\d{2}(,|\.)\d{3})/);
  var subtitleObject;
  var startTime;
  var endTime;
  var dialog;
  lines.forEach(function(line, i) {
    if (timecodeRegEx.test(line) || i === lines.length) {

      if (dialog) {
        subtitles.push(new SubTitleObject(startTime, endTime, dialog));
      }

      if (i < lines.length) {
        startTime = line.replace(/\s.+$/, '');
        endTime = line.replace(/^.+\s/, '');
        dialog = '';
      }

    } else {
      if (startTime && endTime) {
        dialog += line + ' ';
      }
    }
  });
  print(subtitles);
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
  generateMontage();
}

function generateMontage() {
  clearTimeout(fragmentTimer);
  video.stop();

  searchResults = findSubtiles(searchQuery);
  print('Found ' + searchResults.length + ' results for search query ' + searchQuery);
  print(searchResults);

  if (searchResults.length) {
    queryResultMontage(searchResults, 0);
  }
}

function queryResultMontage(searchResults, i) {
  var duration = searchResults[i].duration;
  video.play();
  video.time(searchResults[i].startTime);
  currentResult = searchResults[i];
  print(searchResults[i].startTimeStamp, searchResults[i].dialog);
  fragmentTimer = setTimeout(function() {
    video.pause();
    if (i < searchResults.length - 1) {
      queryResultMontage(searchResults, i + 1);
    } else {
      clearTimeout(fragmentTimer);
    }
  }, duration * 1000);
}

function setup() {
  createCanvas(windowWidth, 200);
  background(52);
  noStroke();

  queryInputElement = createInput(searchQuery);
  var searchSubmitButton = createButton('SEARCH');
  searchSubmitButton.mousePressed(submitQueryInput);

  generateMontage();
}

function draw() {
  subtitles.forEach(function(subtitle) {
    var x = map(subtitle.startTime, subtitles[0].startTime, subtitles[subtitles.length - 1].endTime, 0, width);
    var w = map(subtitle.endTime, subtitles[0].startTime, subtitles[subtitles.length - 1].endTime, 0, width) - x;
    var h = map(subtitle.dialog.length, 0, 100, 0, height);

    if (video.time() > subtitle.startTime && video.time() < subtitle.endTime) {
      fill(232, 65, 36);
    } else {
      fill(100);
    }
    rect(x, 0, w, h);
  });
}

function keyPressed() {
  if (key == 'r' || key == 'R') generateMontage();

  if (keyCode === ENTER) submitQueryInput();

  if (key == 'p' || key == 'P') {
    clearTimeout(fragmentTimer);
    if (video.elt.paused) {
      video.play();
    } else {
      video.pause();
    }
  }
}
