// P_4_2_3_04
//
// Generative Gestaltung – Creative Coding im Web
// ISBN: 978-3-87439-902-9, First Edition, Hermann Schmidt, Mainz, 2018
// Benedikt Groß, Hartmut Bohnacker, Julia Laub, Claudius Lazzeroni
// with contributions by Joey Lee and Niels Poldervaart
// Copyright 2018
//
// http://www.generative-gestaltung.de
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * Play the movie normally and increase playback speed every time when something matching
 * the search query (either a string or a Regular Expression) is encounterd.
 *
 * CONTRIBUTED BY
 * [Niels Poldervaart](http://NielsPoldervaart.nl)
 *
 * VIDEO CREDITS
 * European Space Agency. (2016, December 23). The amazing adventures of Rosetta and Philae. Retrieved from http://m.esa.int/spaceinvideos/Videos/2016/12/The_amazing_adventures_of_Rosetta_and_Philae
 */
'use strict';

// You have to download the video file first
// Please see https://github.com/generative-design/Code-Package-p5.js/tree/master/data
var videoSrc = '../../data/P_4_2_3_supercut-media/video.mp4';
var video;
var subtitleSrc = '../../data/P_4_2_3_supercut-media/subs.vtt';
var subtitles;

var searchQuery = '\\b(comet)\\b';

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
        i++;
      }
    } else {
      video.elt.ontimeupdate = null;
      return false;
    };
  };
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
