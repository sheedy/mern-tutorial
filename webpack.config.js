var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:8080',
    'webpack/hot/only-dev-server',
    './src/app.js'
  ],

  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/'
  },

  plugins: [
    new webpack.NoErrorsPlugin()
  ],

  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['react-hot', 'babel?presets[]=react,presets[]=es2015'],
      include: path.join(__dirname, 'src'),
      exclude: /node_modules/
    }]
  },

  devServer: {
    contentBase: "public/",
    proxy: {
      '/api/*': {
        target: 'http://localhost:3000',
        secure: false
      }
    }
  }
};
