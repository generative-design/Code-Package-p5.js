/**
 * Play fragments of the video where search query is mentioned in dialog
 *
 *
 * KEYS
 * r                   : restart current montage from the beginning
 * p                   : play/pause video
 */
"use strict";

var videoSrc = 'data1/video.mkv';
var video;
var subtitleSrc = 'data1/subs.srt';
var subtitles;

var searchQuery = '\\b(warp)\\b';

var searchResults = [];
var currentResult;

var fragmentTimer;

var gui;

function selectVideoFile(file) {
  videoSrc = URL.createObjectURL(file);
  remove();
  new p5;
}

function selectSubtitleFile(file) {
  subtitleSrc = URL.createObjectURL(file);
  remove();
  new p5;
}

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

function generateMontage() {
  clearTimeout(fragmentTimer);
  video.stop();

  searchResults = findSubtiles(searchQuery);
  print(
    'Found ' + searchResults.length + ' results for search query ' + searchQuery,
    searchResults
  );
  gui.setValue(
    'output',
    'Found ' + searchResults.length + ' results for search query ' + searchQuery
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
  updateGUI();
  fragmentTimer = setTimeout(function() {
    video.pause();
    if (i < searchResults.length - 1) {
      queryResultMontage(searchResults, i + 1);
    } else {
      clearTimeout(fragmentTimer);
    }
  }, duration * 1000);
}

function updateGUI() {
  gui.setValue('output', '<pre>' + currentResult.startTimeStamp + '</pre>' + currentResult.dialog);
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

  gui = QuickSettings.create(10, 10, 'P_supercut_1');
  gui.addFileChooser('video', 'video file', 'video/*', selectVideoFile);
  gui.addFileChooser('subtitles', 'subtitle file', undefined, selectSubtitleFile);
  gui.addText('searchQuery', searchQuery, setSearchQuery);
  gui.addButton('generateMontage', generateMontage);
  gui.addHTML('output', '');
  gui.addButton('togglePlayback', togglePlayback);

  generateMontage(searchQuery);
}
