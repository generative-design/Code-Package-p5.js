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

var searchQuery = /\b(human|klingon|romulan|vulcan)\b/i;

var searchResults = [];

var timeout;

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
  this.dialog = dialog.replace(/\s\d+\s$/, '').trim();
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

function loopSearchResults(searchResults, i) {
  var duration = searchResults[i].duration;
  video.play();
  video.time(searchResults[i].startTime);
  timeout = window.setTimeout(playFragment, duration * 1000, searchResults, i);
}

function playFragment(searchResults, i) {
  video.pause();
  if (i < searchResults.length - 1) {
    loopSearchResults(searchResults, i + 1);
  } else {
    window.clearTimeout(timeout);
  }
}

function keyPressed() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
  if (key == ' ') {
    window.clearTimeout(timeout);
    loopSearchResults(searchResults, 0);
  }
}
