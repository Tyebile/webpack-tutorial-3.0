const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BabiliPlugin = require('babili-webpack-plugin');
//const webpack = require('webpack');

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build'),
};

const plugin = new ExtractTextPlugin({
  filename: '[name].css',
  ignoreOrder: true,
});

module.exports = {
  devServer: {
    host: '0.0.0.0', //nodejs webpack
    port: 8080,
  },
  performance: {
    hints: 'warning', // 'error'
    maxEntrypointSize: 200000, // entry 200kb
    maxAssetSize: 450000, // 450kb css
  },
  devtool: 'source-map',
  entry: {
    app: PATHS.app,
    // vendor: ['react']  //继承react
  },
  output: {
    path: PATHS.build,
    filename: '[name].js',
  },
  module:{
    rules:[
      {
        test: /\.js$/,
        enforce: 'pre',
        loader: 'eslint-loader',
        options: {
          emitWarning: true,
        },
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: plugin.extract({
          use: {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
          fallback: 'style-loader',
        }),
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Webpack 3.0 Tutorial',
    }),
    plugin,
    new BabiliPlugin(),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'vendor',
    // })
  ],
};