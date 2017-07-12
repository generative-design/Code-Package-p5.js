treemap-squared
===============

![Example](https://github.com/imranghory/treemap-squared/raw/master/examples/example-4.png)


Treemap Squared provides a way to easily generate attractive treemaps.

Historically most treemap libraries have been focused purely on function rather than aesthetics resulting in very brutalist styles of design (some examples can been seen on the [Wikipedia Treemap Page](http://en.wikipedia.org/wiki/Treemapping)), they've also focused on representing trees with high levels of depth.

However modern uses such as web applications and infographics place higher importance on aesthetics and tend to require low levels of depth (for example the New York Times typically uses [zero depth in it's treemaps](http://www.nytimes.com/imagepages/2007/02/25/business/20070225_CHRYSLER_GRAPHIC.html) and financial treemaps are generally [one level deep](http://www.smartmoney.com/map-of-the-market/)) and that's the need this library aims to serve.

(Treemap Squared does support arbitary levels of depth, but the default styles will probably need to be over-ridden at higher levels of depth to ensure readability)

As a secondary objective it also provides a clean open-source implementation of the Squarified Treemap algorithm. While there have been other open-source implementations in the past they've generally been tightly coupled with visualization code. Treemap Squared's implementation of the algorithm (and extensions) is completely independent of the visualization code. This should make it both more readable and reusable.

The code base is split into two files:

* treemap-squarify.js  -  Code to calculate the treemap structure for given data
* treemap-raphael.js - Visualize output of treemap-squarify.js (based on the Raphael vector graphics library)

However most users will want to use the minified version which merges both of these. This can be found in the [/min](/min) directory.

Browser Compatibility
=========================

Treemap Squared has been tested with IE6+, Chrome, Safari, and Firefox.

The core functionality should work across all browser.


Using Treemap Squared
=========================

Feel free to skip the descriptions here to the examples below.

```javascript   
Treemap.draw(element, width, height, data, labels, styles);
// element - the "id" of the HTML DOM element to insert the chart into, alternatively you can
//           specify the element directly. For example using jQuery you could use $("#myId")[0].
// width - the width of the chart in pixels
// height - the height of the chart in pixels
// data - an array of numeric values to chart 
// labels - the labels associated with the numeric values in the same order as the data array
// styles - optional associative array of styles
```

It's common that users of treemaps will sort the data in descending order to make the charts more attractive (this will result in the largest items appearing in the top left and the smallest in the bottom right), however this isn't neccesary.

The styles array allows for the treemaps appearance to be customized:

```javascript   
styles['background'] // the style of the background in the treemap
styles['box'] // the style of the boxes in the treemap
styles['label'] // the style of the labels in the treemap
styles['draw'] // the drawing method
```   

The background, box, and label tags can be assigned properties that will be passed to the [Rapheal attr method](http://raphaeljs.com/reference.html#Element.attr) of the relevent graphic element. The box and label tags can alternatively be supplied a function with the signature function(coordinates, index){} which returns the desired properties. The best way of understanding how to use these is to consult the examples given below.

The styles['draw'] property can be safely ignored by most users. It allows the caller to completely replace the draw method of the library. See the source code in treemap-raphael.js directly for more details.

Basic example
-------------

First include the dependencies in your &lt;head&gt; tags:

```html   
 /*  the raphael vector library */
 <script type="text/javascript" src="raphael-min.js"></script>
    
/* treemapping library */
<script type="text/javascript" src="treemap-squared-0.5.min.js"></script>
```

Add a div where you want the treemap to be inserted:

```html   
<div id="example-1"></div>
```

And then the javascript to do the drawing:

```html   
<script type="text/javascript">
    $(document).ready(function () {
        data = [60000, 60000, 40000, 30000, 20000, 10000];
        labels = ["Paris", "London", "New York", "Moscow", "Berlin", "Tokyo"];
        Treemap.draw("example-1", 400, 300, data, labels);
    });
</script>
```

Resulting treemap:  
![Example](https://github.com/imranghory/treemap-squared/raw/master/examples/example-1.png)  
[Example-1 Source Code](https://github.com/imranghory/treemap-squared/blob/master/examples/example-1.html)

Multidimensional data
---------------------

Treemap Squared also supports multidimensional data using nested arrays allowing items to be grouped together. You can nest data to an arbitary number of levels of depth.

```html   
<script type="text/javascript">
    $(document).ready(function () {
        data = [[60000, 60000, 40000], [30000, 20000, 10000]];
        labels = [["Paris", "London", "New York"], ["Moscow", "Berlin", "Tokyo"]];
        Treemap.draw("example-1", 400, 300, data, labels);
    });
</script>
```
Resulting treemap:  
![Example](https://github.com/imranghory/treemap-squared/raw/master/examples/example-2.png)  
[Example-2 Source Code](https://github.com/imranghory/treemap-squared/blob/master/examples/example-2.html)

Styling
-------

If you wanted to draw a treemap which would be photocopied frequently (i.e for an academic paper) you might want to style it in black and white and thicken the lines:

```html   
<script type="text/javascript">
    $(document).ready(function () {
        var data = [60000, 60000, 40000, 30000, 20000, 10000];
        var labels = ["Paris", "London", "New York", "Moscow", "Berlin", "Tokyo"];
        Treemap.draw("example-3", 600, 450, data, labels, 
        	{'label' : {'fill' : 'black'}, 
        	 'box'   : {'fill' : 'white', 'stroke' : 'black', 'stroke-width' : '3px'}});
    });
</script>
```
Resulting treemap:  
![Example](https://github.com/imranghory/treemap-squared/raw/master/examples/example-3.png)  
[Example-3 Source Code](https://github.com/imranghory/treemap-squared/blob/master/examples/example-3.html)

Alternatively you might want to add some texture to your treemap making it feel less flat. You can achieve this by setting a texture as the background and increasing the opacity of the boxes.

```html   
<script type="text/javascript">
    $(document).ready(function () {
        var data = [[60000, 60000, 40000], [30000, 20000, 10000]];
        var labels = [["Paris", "London", "New York"], ["Moscow", "Berlin", "Tokyo"]];  

        Treemap.draw("example-4", 600, 450, data, labels, 
        	{'background' : {'fill': 'url("marble.jpg")'}, 
        	 'box' : {'fill-opacity' : "0.7"}});
    });
</script>
```
(While the CSS3 'fill-opacity' property is only supported by Webkit, treemap-raphael includes a shim adding support to most modern browsers including Firefox and IE9+. Older versions of IE back to IE6 will fallback to showing solid colours instead.)

Resulting treemap:  
![Example](https://github.com/imranghory/treemap-squared/raw/master/examples/example-4.png)   
[Example-4 Source Code](https://github.com/imranghory/treemap-squared/blob/master/examples/example-4.html)

Styling using functions
-----------------------

Styling can also be done using functions as demonstrated in this chart in which the shade of the box depends on the value of the data point it represents. The colours here are specified in HSB due to being easier to set programatically but you can just as well use RGB values.

```html   
<script type="text/javascript">
    $(document).ready(function () {
        var data = [[60000, 60000, 40000], [30000, 20000, 10000]];
        var labels = [["Paris", "London", "New York"], ["Moscow", "Berlin", "Tokyo"]]; 

        var boxFormatter = function (coordinates, index) {
        	// so in this case an index of [1,1] would refer to "London" and [2,1] to "Berlin"
        	// coordinates are in the form [x1,y1,x2,y2]

            var datapoint,i, color;

            // get the value of the data point using the index to find it         
            datapoint = data;
            for (i=0; i<index.length; i++){
                datapoint = datapoint[index[i]];
            }  

            var saturation = ((datapoint / 60000)*0.6) + 0.4;
            var brightness = ((datapoint / 60000)*0.3) + 0.2;
            color = "hsb(0.2," + saturation + "," + brightness + ")";

            return{ "fill" : color };
        };

        Treemap.draw("example-5", 600, 200, data, labels, {'box' : boxFormatter});
    });
</script>
```
Resulting treemap:  
![Example](https://github.com/imranghory/treemap-squared/raw/master/examples/example-5.png)  
[Example-5 Source Code](https://github.com/imranghory/treemap-squared/blob/master/examples/example-5.html)

treemap-squarify.js
====================

treemap-squarify.js contains the code to calculate the structure of the treemap. It's designed so it can easily be used with any graphics library that supports the drawing of boxes.

The treemap algorithm used can be found in:

> [Squarified Treemaps](http://www.win.tue.nl/~vanwijk/stm.pdf) (2000)  
> by Bruls, Mark; Huizing, Kees; van Wijk, Jarke J.  
> *Data Visualization 2000: Proc. Joint Eurographics and IEEE TCVG Symp. on Visualization, Springer-Verlag, pp. 33-42.*

The core algorithm is as found in the paper with a few additional (straight forward) features needed to make it practically useful:

* Data normalization allowing any arbitary numeric data to be used as input
* Support for multidimensional data by recursively applying the algorithm

Unlike other implementations which directly call into visualization methods from within the algorithms implementation, the treemap-squarify.js library instead returns a ordered array of cartesian coordinates (the order matching that of the input data) which represents each of the boxes to be drawn which can then be passed to a visulization library. This allows for a clean decoupling of the treemap structure generation and the actual visualization.

Licence
=======

Treemap Squared is licenced under the MIT Licence.

Copyright (c) 2012 Imran Ghory

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.