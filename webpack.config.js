const path = require(`path`)
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: ['react-hot-loader/patch', './client/index.js'],
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
    new HTMLWebpackPlugin({
      template: path.join(__dirname, 'client/index.html'),
      filename: 'index.html',
    }),
  ],
  devServer: {
    static: path.join(__dirname, 'public'),
    firewall: false,
    host: '0.0.0.0',
    hot: true
  },
}
