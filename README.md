# next-plugin-modernizr

Use [Modernizr](https://modernizr.com/) browser feature checking with [Next.js](https://github.com/zeit/next.js).
This utilizes the [webpack-modernizr-loader](https://www.npmjs.com/package/webpack-modernizr-loader) plugin.

## Installation

```sh
npm install next-plugin-modernizr
```

## Usage

After installing let's setup the options we'd like to include to configure Modernizr.
In your project's root create a `.modernizrrc` file and format it like so:

```js
module.exports = {
  "options": [
    "addTest",
    "setClasses"
  ],
  "feature-detects": [
    "css/cssgrid"
  ]
}
```

Create a `next.config.js` in your project

```js
// next.config.js
const withModernizr = require("next-plugin-modernizr");
module.exports = withModernizr();
```

Optionally you can add your custom Next.js configuration as parameter

```js
// next.config.js
const withModernizr = require("next-plugin-modernizr");
module.exports = withModernizr({
  webpack(config, options) {
    return config;
  }
});
```

If you'd like to combine this with other plugins you can do it this way

```js
const withCSS = require('@zeit/next-css');
const withSass = require('@zeit/next-sass');
const withModernizr = require('next-plugin-modernizr');

module.exports = withModernizr(
  withSass(
    withCSS({
      cssModules: true,
      cssLoaderOptions: {},
      webpack(config, options) {
        return config;
      },
    })
  )
);
```

## Custom Modernizr Tests

To add custom tests to your project create a file such as `ModernizrTests.js`:

```js
import Modernizr from 'modernizr';

// since Modernizr is only used on the client side we must specify process.browser
if (process.browser) {
  Modernizr.addTest('hastouch', 'ontouchstart' in window);
}
```
 
Then simply import in your `index.js` or a shared entry point.

```js
import '../modules/ModernizrTests.js';
```

From there you are able to import Modernizr in any component or module to use:

```js
// MyCustomComponent.js
import Modernizr from 'modernizr';

if (Modernizr.hastouch) {
  // do stuff
}
```