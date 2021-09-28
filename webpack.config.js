const _require = id => require(require.resolve(id, {
  paths: [require.main.path]
}))

const path = _require('path')
const HtmlPulgin = _require('html-webpack-plugin')
const CopyPlugin = _require('copy-webpack-plugin')
const {
  VueLoaderPlugin
} = _require('vue-loader')

module.exports = {
  resolve: {
    // 경로에서 확장자 생략 설정
    extensions: ['.js', '.vue'],
    // 경로 별칭 설정
    alias: {
      '~': path.resolve(__dirname, 'src'),
      'assets': path.resolve(__dirname, 'src/assets')
    }
  },

  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    clean: true // 기존 내용을 제거
  },

  module: {
    rules: [{
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/, // 제외할 경로
        use: [
          'babel-loader'
        ]
      },
      {
        test: /\.s?css$/,
        use: [
          'vue-style-loader',
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|webp)$/,
        use: 'file-loader'
      },
    ]
  },

  plugin: [
    new HtmlPulgin({
      template: './index.html'
    }),
    new CopyPlugin({
      patterns: [{
        from: 'static'
      }]
    }),
    new VueLoaderPlugin()
  ],
}