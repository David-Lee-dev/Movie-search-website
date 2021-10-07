const _require = id => require(require.resolve(id, {
  paths: [require.main.path]
}))
const path = _require('path')
const HtmlPlugin = _require('html-webpack-plugin')
const CopyPlugin = _require('copy-webpack-plugin')
const {
  VueLoaderPlugin
} = _require('vue-loader')
const Dotenv = require('dotenv-webpack')

module.exports = {
  resolve: {
    extensions: ['.js', '.vue', 'scss'],
    alias: {
      '~': path.resolve(__dirname, 'src'),
      'assets': path.resolve(__dirname, 'src/assets')
    }
  },

  entry: './src/main.js',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    clean: true
  },

  module: {
    rules: [{
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.s?css$/,
        use: [
          'vue-style-loader',
          'style-loader',
          'css-loader',
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              additionalData: '@import "~/scss/main";'
            }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          'babel-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|webp)$/,
        use: 'file-loader'
      }
    ]
  },

  plugins: [
    new HtmlPlugin({
      template: './index.html'
    }),
    new CopyPlugin({
      patterns: [{
        from: 'static'
      }]
    }),
    new VueLoaderPlugin(),
    new Dotenv()
  ],

  devServer: {
    host: 'localhost',
    port: 8079,
    hot: true
  }
}