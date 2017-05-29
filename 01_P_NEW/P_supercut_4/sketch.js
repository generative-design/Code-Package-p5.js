// P_supercut_4
/**
 * Play the movie normally and increase playback speed every time when something matching
 * the search query (either a string or a Regular Expression) is encounterd .
 *
 * CREDITS
 * Niels Poldervaart
 */
"use strict";

// Download video file from https://github.com/generative-design/Code-Package-Data/blob/master/P_supercut_media/video.mp4
var videoSrc = 'data/video.mp4';
var video;
var subtitleSrc = 'data/subs.vtt';
var subtitles;

var searchQuery = '\\b(comet)\\b';

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
}

function getTimeInSeconds(timeString) {
	var hours = parseInt(timeString.replace(/:.+$/, ''));
	var minutes = parseInt(timeString.replace(/^\d.+?:|:\d.+$/, ''));
	var seconds = parseInt(timeString.replace(/^\d.+:|(\,|\.).+$/, ''));
	var milSeconds = parseInt(timeString.replace(/^.+(\,|\.)/, ''));
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

function generateMontage() {
  clearTimeout(fragmentTimer);
  video.stop();

  searchResults = findSubtiles(searchQuery);
  print(
    'Found ' + searchResults.length + ' results for search query ' + searchQuery,
    searchResults
  );

  if (searchResults.length) {
    video.play();
    video.speed(1);
    queryResultMontage(searchResults, 0);
  }
}

function queryResultMontage(searchResults, i) {
  video.elt.ontimeupdate = function() {
    updateGUI();
    if (i < searchResults.length - 1) {
      if (video.time() > searchResults[i].startTime) {
        currentResult = searchResults[i];
        video.speed(video.speed() / QUARTER_PI);
        print(video.speed(), currentResult.startTimeStamp, currentResult.dialog);
        i++;
      }
    } else {
      video.elt.ontimeupdate = null;
      return false;
    };
  }
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
