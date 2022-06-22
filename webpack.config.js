const path = require('path');

const webpack = require('webpack');

module.exports = {
  entry: './assets/js/script.js', // The root of the bundle and the beginning ofo the dependency graph
  // webpack will take the above entry point, bundle that cde and 'output' the bundled code to a folder
  output: {
    path: path.resolve(__dirname, 'dist'), // Common practice is to put the bundled code in a 'dist' (distribution) folder
    filename: 'main.bundle.js',
  },
  // The mode in which we want the webpack to run
  // By default, webpack runs in production mode.
  mode: 'development', // In this mode, webpack will minify our code for us automatically

  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
  ],
};
