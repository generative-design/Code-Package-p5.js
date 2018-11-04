// M_6_2_02
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
 * loads an xml asynchronously, thus not disrupting the animation
 *
 * MOUSE
 * left click          : starts loading the xml
 */

'use strict';

var sketch = function(p) {

  var angle = 0;

  var linksLoading = false;
  var linksLoaded = false;
  var links = [];

  p.setup = function() {
    p.createCanvas(200, 200);

    p.strokeWeight(4);
  };

  p.draw = function() {
    // some animation
    p.background(255);
    p.translate(p.width / 2, p.height / 2);
    p.rotate(angle);
    angle += 0.02;
    p.line(-100, 0, 100, 0);

    // Has loading already started?
    if (linksLoading) {
      console.log('not loaded yet');
    }

    // Are the links already loaded?
    if (linksLoaded) {
      links.forEach(function(el, i) {
        console.log('Link ' + i + ': ' + el.title);
      });

      linksLoaded = false;
    }
  };

  p.mouseReleased = function() {
    console.log('Starting to load links');
    linksLoading = true;

    getLinks('Superegg', function(result) {
      linksLoaded = true;
      linksLoading = false;
      links = result;
    });
  };

  // Helping function that makes the queries to Wikipedia.
  function getLinks(title, callback, plcontinue, links) {
    links = links || [];

    $.ajax({
      url: 'http://en.wikipedia.org/w/api.php',
      data: {
        action: 'query',
        prop: 'links',
        pllimit: 'max',
        plcontinue: plcontinue,
        titles: title,
        format: 'json',
      },
      headers: { 'Api-User-Agent': 'M_6_2_01 (http://www.generative-gestaltung.de/; info@generative-gestaltung.de)', },
      dataType: 'jsonp',
      success: function(data) {
        var ids = Object.keys(data.query.pages);
        // Add the returned links to the array
        links = links.concat(data.query.pages[ids[0]].links);

        if (data.continue) {
          // A maximum of 500 results will be returned by Wikipedia,
          // so there might be some more requests necessary to get all results
          getLinks(title, callback, data.continue.plcontinue, links);

        } else {
          // If all is collected, deliver the results to the callback function
          callback(links);
        }
      },
    });
  }

};

var myp5 = new p5(sketch);
