var path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');// плагин для загрузки кода Vue

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist/',
        filename: 'main.js'
    },
    mode: 'development',
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
              loader: "babel-loader",
              options: {
                  presets: ['@babel/preset-env'],
                  plugins: ["@babel/plugin-proposal-class-properties"]
              }
            }
          },
          {
            test: /\.(png|jpe?g|gif|svg)$/i,
            loader: 'file-loader',
            options: {
              name(file) {
                if (process.env.NODE_ENV === 'development') {
                  return '[path][name].[ext]';
                }
  
                return '[contenthash].[ext]';
              },
            },
           },
        ]
      },
      plugins: [
         new VueLoaderPlugin(),
        ]
}