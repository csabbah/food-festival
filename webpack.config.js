const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const path = require('path');

const webpack = require('webpack');

module.exports = {
  entry: {
    app: './assets/js/script.js',
    events: './assets/js/events.js',
    schedule: './assets/js/schedule.js',
    tickets: './assets/js/tickets.js',
  },
  output: {
    // The name of each attribute in the entry object will be used in place of [name] in bundle.js
    filename: '[name].bundle.js',
    path: __dirname + '/dist',
  },
  // The mode in which we want the webpack to run
  // By default, webpack runs in production mode.
  mode: 'development', // In this mode, webpack will minify our code for us automatically

  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static', // the report outputs to an HTML file in the dist folder
    }),
  ],
};
