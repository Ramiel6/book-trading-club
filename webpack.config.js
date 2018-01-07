const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/client/index.html',
  filename: 'index.html',
  inject: 'body'
});

const configs = {
     entry: __dirname +  '/react/app.js',
     output: {
         path: __dirname + '/client/js',
         filename: 'bundle.js'
     },
    module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.css$/, loader: 'style-loader!css-loader', include: /flexboxgrid/ }
    ]
  }
 };
if (process.env.NODE_ENV === 'production') {
    configs.devtool = 'source-map';
    configs.plugins = [
     HtmlWebpackPluginConfig,
    new UglifyJSPlugin({
       sourceMap: true,
       comments: false, // remove comments
          compress: {
            unused: true,
            dead_code: true, // big one--strip code that will never execute
            warnings: false, // good for prod apps so users can't peek behind curtain
            drop_debugger: true,
            conditionals: true,
            evaluate: true,
            drop_console: true, // strips console statements
            sequences: true,
            booleans: true,
          }
     }),
    // new webpack.DefinePlugin({
    //     'process.env': {
    //         'NODE_ENV': JSON.stringify('production')
    //     }
    // })
 ];
}
// else{
//     configs.plugins = [HtmlWebpackPluginConfig];
// }
 
module.exports = configs;