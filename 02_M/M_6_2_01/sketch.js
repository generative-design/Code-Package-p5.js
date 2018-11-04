// M_6_2_01
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
 * loads the names of the links on the wikipedia-site "Superegg"
 * and prints them to the console
 */

'use strict';

var sketch = function(p) {

  p.setup = function() {
    getLinks('Superegg', function(links) {
      console.log('This is what you get:');

      links.forEach(function(el) {
        console.log(el);
      });

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
