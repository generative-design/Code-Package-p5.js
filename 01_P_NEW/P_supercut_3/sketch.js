/**
 * Create montage of video with a search query.
 *
 */
"use strict";

var videoSrc = 'data/video.mp4';
var video;
var subtitleSrc = 'data/subs.vtt';
var subtitles;

var searchQuery = 'day mission';
var lexicon = new RiLexicon();

var searchResults = [];
var currentResult;

var fragmentTimer;

var gui;

function preload() {
  video = createVideo(videoSrc);
  loadStrings(subtitleSrc, parseSubtitles);
}

function parseSubtitles(lines) {
  subtitles = [];
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
  this.dialogWords = RiTa.tokenize(RiTa.stripPunctuation(this.dialog.toLowerCase()));
}

function getTimeInSeconds(timeString) {
	var hours = parseInt(timeString.replace(/:.+$/, ''));
	var minutes = parseInt(timeString.replace(/^\d.+?:|:\d.+$/, ''));
	var seconds = parseInt(timeString.replace(/^\d.+:|(\,|\.).+$/, ''));
	var milSeconds = parseInt(timeString.replace(/^.+(\,|\.)/, ''));
	return (hours * 60 * 60) + (minutes * 60) + seconds + (milSeconds / 1000);
}

function findSubtiles(searchPattern) {
  // AABBA
  searchPattern = searchPattern.split(/\s+/);
  var results = [];
  var rhymeA = [];
  var rhymeB = [];
  subtitles.forEach(function(subtitle) {
    var lastWord = subtitle.dialogWords[subtitle.dialogWords.length - 1];
    searchPattern.forEach(function(rhymeWord, index) {
      if (lexicon.isRhyme(rhymeWord, lastWord)) {
        if (index % 2 === 0) {
          rhymeA.push(subtitle);
        } else {
          rhymeB.push(subtitle);
        }
      }
    });
  });
  var rhymesLength = rhymeA.length + rhymeB.length;
  for (var i = 0; i <= rhymesLength; i++) {
    if (!rhymeA.length || !rhymeB.length) {
      break;
    }
    if (i % 5 - 2 === 0 || i % 5 - 3 === 0) {
        results.push(rhymeB.shift());
    } else {
        results.push(rhymeA.shift());
    }
  }
  results.splice(results.length - results.length % 5);
  return results;
}

function generateMontage() {
  clearTimeout(fragmentTimer);
  video.stop();

  searchResults = findSubtiles(searchQuery);
  print(
    'Found ' + searchResults.length + ' results for search query ' + searchQuery,
    searchResults
  );

  if (searchResults.length) {
    queryResultMontage(searchResults, 0);
  }
}

function queryResultMontage(searchResults, i) {
  currentResult = searchResults[i];
  var duration = currentResult.duration;
  video.play();
  video.time(currentResult.startTime);
  print(currentResult.startTimeStamp, currentResult.dialog);
  fragmentTimer = setTimeout(function() {
    video.pause();
    if (i < searchResults.length - 1) {
      queryResultMontage(searchResults, i + 1);
    } else {
      clearTimeout(fragmentTimer);
    }
  }, duration * 1000);
}

function setSearchQuery(newSearchQuery) {
  searchQuery = newSearchQuery;
}

function togglePlayback() {
  clearTimeout(fragmentTimer);
  if (video.elt.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function setup() {
  noCanvas();

  createGUI();

  generateMontage(searchQuery);
}
