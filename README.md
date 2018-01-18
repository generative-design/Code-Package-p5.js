# work in progress! plz ignore!

# Generative Design Code Package (for [P5.js](https://p5js.org/))

Hi! This GitHub repository contains all of the source code for the book [Generative Design: Creative Coding for the Web](http://www.generative-gestaltung.de) with JavaScript in [p5.js](https://p5js.org/). To get started, please follow the intructions in the sections: [Setup](#Setup) and [Running the Sketches](#Running-the-sketches). Enjoy!

--------------------------------------------------------------------------------

**Authors**

- [Benedikt Groß](http://benedikt-gross.de/)
- [Hartmut Bohnacker](https://www.hartmut-bohnacker.de)
- [Julia Laub](http://www.onformative.com/)
- [Claudius Lazzeroni](http://www.lazzeroni.de/)

**with contributions by**: [Joey Lee](http://jk-lee.com/) & [Niels Poldervaart](http://nielspoldervaart.nl/)

## Setup

1. Install [node.js](https://nodejs.org) (go for the latest stable version)
2. Open Terminal and navigate over to the `Code-Package-p5.js` folder that you downloaded onto your computer:

  ```
  $ cd path/to/folder
  # e.g. cd /Users/GG/Documents/Code-Package-p5.js
  ```

3. Run:

  ```
  $ npm install
  ```

## Running the sketches

1. Start a local web server

  <sup>1</sup>

   (with live reload) by typing in your Terminal the command below. This will open the `index.html` file (list of all sketches) a new browser window.

  ```
  $ npm start
  ```

2. Click on any of the links 🔗 listed to view and interact with the sketches.

3. Interact, create, save, and share your work! 🌈`#GenerativeGestaltung #generativedesign #p5js`

<sup>1</sup>

Some sketches work only as expected when the files are placed online, as the rely on "security" sensitive functionality like loading external files. If you try to view them locally without running a web server, you get some kind of "cross-origin" errors 😭 (see your browser's console). The solution is to serve the files using what's called a [local web server](https://github.com/processing/p5.js/wiki/Local-server). This is what happens when you run `npm start` as shown above.
