// P_4_2_2_02
/**
 * Create montage of video with a search query for Part Of Speech.
 *
 * CONTRIBUTED BY
 * [Niels Poldervaart](http://NielsPoldervaart.nl)
 */
'use strict';

// Download video file from https://github.com/generative-design/Code-Package-Data/blob/master/P_supercut_media/video.mp4
var videoSrc = '../../data/P_supercut_media/video.mp4';
var video;
var subtitleSrc = '../../data/P_supercut_media/subs.vtt';
var subtitles;

// List space-seperated PENN tags (see https://rednoise.org/rita/reference/PennTags.html)
var searchQuery = 'nns jjr';

var searchResults = [];
var currentResult;

var fragmentTimer;

var row = 0;
var col = 0;
var frameWidth;
var frameHeight;

var tileMode = true;

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
  this.dialogPOS = RiTa.getPosTags(this.dialog);
}

function getTimeInSeconds(timeString) {
	var hours = parseInt(timeString.replace(/:.+$/, ''));
	var minutes = parseInt(timeString.replace(/^\d.+?:|:\d.+$/, ''));
	var seconds = parseInt(timeString.replace(/^\d.+:|(\,|\.).+$/, ''));
	var milSeconds = parseInt(timeString.replace(/^.+(\,|\.)/, ''));
	return (hours * 60 * 60) + (minutes * 60) + seconds + (milSeconds / 1000);
}

function findSubtiles(searchPattern) {
  searchPattern = searchPattern.split(' ');
  var results = subtitles.filter(function(subtitle) {
    return searchPattern.every(function(searchGroup) {
      return subtitle.dialogPOS.indexOf(searchGroup) !== -1;
    });
  });
  return results;
}

function generateMontage() {
  clearTimeout(fragmentTimer);
  video.stop();
  selectAll('.subtitle').forEach(function(dialogElement) {
    dialogElement.remove();
  });
  video.elt.style.width = tileMode ? '25%' : '100%';
  video.position(0, 0);
  video.show();
  clear();
  row = 0;
  col = 0;

  searchResults = findSubtiles(searchQuery);
  print(
    'Found ' + searchResults.length + ' results for search query ' + searchQuery,
    searchResults
  );

  if (searchResults.length) {
    resizeCanvas(windowWidth, searchResults.length * video.size().height);
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

    if (tileMode) {
      var framePos = getFramePos();
      var img = video.get();
      image(img, framePos.x, framePos.y, frameWidth, frameHeight);

      var dialogElement = createSpan(currentResult.dialog);
      dialogElement.addClass('subtitle');
      dialogElement.size(frameWidth, frameHeight);
      dialogElement.position(framePos.x, framePos.y);

      text(currentResult.endTimeStamp, framePos.x, framePos.y);

      col++;
      framePos = getFramePos();
      video.position(framePos.x, framePos.y);
    }

    if (i < searchResults.length - 1) {
      queryResultMontage(searchResults, i + 1);
    } else {
      clearTimeout(fragmentTimer);
    }

  }, duration * 1000);
}

function togglePlayback() {
  clearTimeout(fragmentTimer);
  if (video.elt.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function getFramePos() {
  frameWidth = video.size().width;
  frameHeight = video.size().height;
  var x = frameWidth * col;
  var y = frameHeight * row;
  if (x + frameWidth > width) {
    col = 0;
    row++;
    x = frameWidth * col;
    y = frameHeight * row;
  }
  return createVector(x, y);
}

function setup() {
  createCanvas(windowWidth, 1000);

  fill(255);
  stroke(0);
  textSize(10);
  textAlign(LEFT, TOP);

  createGUI();

  generateMontage(searchQuery);
}
