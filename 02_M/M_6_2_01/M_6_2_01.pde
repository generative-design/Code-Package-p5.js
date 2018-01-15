// M_6_2_01.pde
// 
// Generative Gestaltung, ISBN: 978-3-87439-759-9
// First Edition, Hermann Schmidt, Mainz, 2009
// Hartmut Bohnacker, Benedikt Gross, Julia Laub, Claudius Lazzeroni
// Copyright 2009 Hartmut Bohnacker, Benedikt Gross, Julia Laub, Claudius Lazzeroni
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
 * loads the name of the links on the wikipedia-site "Superegg"
 * and prints them to the console
 */

XML myXML;
XML[] links;
String query;


void setup() {
  query = "http://en.wikipedia.org/w/api.php?titles=Superegg&format=xml&action=query&prop=links&pllimit=500";
  
  try {
    myXML = loadXML(query);
    links = myXML.getChildren("query/pages/page/links/pl"); 

    for (int i = 0; i < links.length; i++) {
      String title = links[i].getString("title");
      println("Link " + i + ": " + title);
    }
  } 
  catch (Exception exception) {
    println(exception);
  }
}

