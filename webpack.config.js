var path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');// плагин для загрузки кода Vue

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist/',
        filename: 'main.js'
    },
    module: {
        rules: [
          {
            test: /\.vue$/,
            loader: 'vue-loader'
          }, {
           test: /\.css$/,
           use: [
             'vue-style-loader',
             'css-loader'
           ]
         },
         {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader"
            }
          }
        ]
      },
      plugins: [
         new VueLoaderPlugin()
        ]
}