const WebpackPwaManifest = require('webpack-pwa-manifest');

const webpack = require('webpack');
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// const SWPrecacheWebpackPlugin = require("sw-precache-webpack-plugin");
// const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require('path');

const config = {
  entry: {
    app: './assets/js/script.js',
    events: './assets/js/events.js',
    schedule: './assets/js/schedule.js',
    tickets: './assets/js/tickets.js',
  },
  output: {
    path: path.join(__dirname + '/dist'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        // We can expand this to test other files as well
        test: /\.(png|jpe?g|gif)$/i,
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
              publicPath(url) {
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
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
    }),
    new WebpackPwaManifest({
      name: 'Food Event',
      short_name: 'Foodies',
      description: 'An app that allows you to view upcoming food events.',
      start_url: '../index.html',
      background_color: '#01579b',
      theme_color: '#ffffff',
      fingerprints: false,
      inject: false,
      icons: [
        {
          src: path.resolve('./assets/img/icons/icon-512x512.png'),
          sizes: [96, 128, 192, 256, 384, 512],
          destination: path.join('assets', 'icons'),
        },
      ],
    }),
  ],
  // The mode in which we want the webpack to run
  // By default, webpack runs in production mode.
  mode: 'development', // In this mode, webpack will minify our code for us automatically
};

module.exports = config;
