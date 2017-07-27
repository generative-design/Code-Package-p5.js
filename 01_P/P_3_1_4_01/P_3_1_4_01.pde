// P_3_1_4_01.pde
// WordItem.pde, WordMap.pde
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

// CREDITS
// Code is based on a treemap example from Visualizing Data, First Edition, Copyright 2008 Ben Fry.
// Example input text: Faust by Johann Wolfgang von Goethe

/**
 * treemap. wordcounts of a textfile. 
 * 
 * KEYS
 * 1-5                  : set treemap layout algorithm
 * s                    : save png
 * p                    : save pdf
 */

import treemap.*;
import processing.pdf.*;
import java.util.Calendar;

Treemap map;
MapLayout layoutAlgorithm = new SquarifiedLayout();

boolean savePDF = false;

int maxFontSize = 1000;
int minFontSize = 1;

PFont font;


void setup() {
  size(800,600);
    
  font = createFont("miso-bold.ttf", 10);
  smooth();

  WordMap mapData = new WordMap();

  //  ------ read a textfile ------
  String[] lines = loadStrings("Faust.txt");
  // join all lines to a big string
  String joinedText = join(lines, " ");

  // replacings
  joinedText = joinedText.replaceAll("_", "");  

  // split tex into words by delimiters
  String[] words = splitTokens(joinedText, " ¬ª¬´‚Äì_-–().,;:?!\u2014\"");

  // add all words to the treemap
  for (int i = 0; i < words.length; i++) {
    // translate all to UPPERCASE
    String word = words[i].toLowerCase();
    mapData.addWord(word);     
  }

  //  ------ treemap data is ready ------
  mapData.finishAdd();

  // create treemap with mapData
  map = new Treemap(mapData, 0, 0, width, height);
}


void draw() {
  if (savePDF) beginRecord(PDF, timestamp()+".pdf");

  background(255);
  map.setLayout(layoutAlgorithm);
  map.updateLayout();
  map.draw();

  if (savePDF) {
    savePDF = false;
    endRecord();
  }

  noLoop();
}


void keyReleased() {
  if (key == 's' || key == 'S') saveFrame(timestamp()+"_##.png");
  if (key == 'p' || key == 'P') savePDF = true;

  // set layout algorithm
  if (key=='1') layoutAlgorithm = new SquarifiedLayout();
  if (key=='2') layoutAlgorithm = new PivotBySplitSize();
  if (key=='3') layoutAlgorithm = new SliceLayout();
  if (key=='4') layoutAlgorithm = new OrderedTreemap();
  if (key=='5') layoutAlgorithm = new StripTreemap();

  if (key=='1'||key=='2'||key=='3'||key=='4'||key=='5'||
    key=='s'||key=='S'||key=='p'||key=='P') loop();
}


// timestamp
String timestamp() {
  Calendar now = Calendar.getInstance();
  return String.format("%1$ty%1$tm%1$td_%1$tH%1$tM%1$tS", now);
}


















