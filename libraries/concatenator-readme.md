
# Bundling dependencies for the p5.js web editor

```
cd Code-Package-p5.js/libraries/
node concatenator-with-sourcemap.js
```

make sure to `copy and paste` the `./gif.js/gif.worker.js.map` into the `/gg-dep-bundle` directory so we don't get a `sourcemap error` later on.


NOTE: the `concatenator.js` script probably works also fine + it is much simpler but just for good measure we use the `concatenator-with-sourcemap.js` .
