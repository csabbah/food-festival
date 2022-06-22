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
    filename: '[name].bundle.js',
    path: __dirname + '/dist',
  },
  module: {
    rules: [
      {
        // We can expand this to test other files as well
        test: /\.jpg$/i,
        use: [
          {
            // The actual loader is implemented here
            loader: 'file-loader',
            // By adding the below options, loader will not
            // modify the name of the image files, in other cases, the images
            // names would've been like 'funafaioof23r2h3.png'
            options: {
              esModule: false,
              name(file) {
                return '[path][name].[ext]';
              },
              publicPath: function (url) {
                return url.replace('../', '/assets/');
              },
            },
          },
          {
            // The below line will optimize the images (reduce in size) that get emitted (added to dist)
            loader: 'image-webpack-loader',
          },
        ],
      },
    ],
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
