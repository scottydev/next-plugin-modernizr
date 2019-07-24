# next-plugin-modernizr

Use [Modernizr](https://modernizr.com/) files with [Next.js](https://github.com/zeit/next.js).
This uses the [webpack-modernizr-loader](https://www.npmjs.com/package/webpack-modernizr-loader) plugin.

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
