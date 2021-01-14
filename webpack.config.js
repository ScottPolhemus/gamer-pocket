const path = require(`path`)
const HTMLWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const EnvironmentPlugin = require('webpack').EnvironmentPlugin;

module.exports = {
  entry: ['react-hot-loader/patch', './client/index.js'],
  output: {
    publicPath: process.env.ASSET_PATH || '',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
  plugins: [
    new EnvironmentPlugin({
      ASSET_PATH: ''
    }),
    new HTMLWebpackPlugin({
      template: path.join(__dirname, 'client/index.html'),
      filename: 'index.html',
    }),
    new CopyPlugin({
      patterns: [
        { from: 'public', to: '' },
      ],
    }),
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
    }),
  ],
  devServer: {
    static: false,
    firewall: false,
    host: '0.0.0.0',
    hot: true
  },
}
