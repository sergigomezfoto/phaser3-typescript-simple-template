const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: {
    app: './src/index.ts'
  },
  devtool: "eval-source-map",
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build'),
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all'
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        include: path.resolve(__dirname, 'src'),
        loader: 'ts-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  devServer: {
    static: [
      {
        directory: path.join(__dirname, 'build'), // Directori on estan els fitxers compilats
        publicPath: '/'
      },
      {
        directory: path.join(__dirname, 'assets'), // Directori on estan els assets
        publicPath: '/assets'
      }
    ],
    compress: true,
    port: 8080,
    historyApiFallback: true,
    hot: true,
    open: true
  },
  plugins: [
    new webpack.DefinePlugin({
      'CANVAS_RENDERER': JSON.stringify(true),
      'WEBGL_RENDERER': JSON.stringify(true)
    }),
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'assets', '**', '*'),
          to: path.resolve(__dirname, 'build', 'assets'), // Assegura que això reflecteix el teu desig
          noErrorOnMissing: true
        }
      ]
    })
  ]
};
