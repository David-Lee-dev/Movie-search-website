# 1. 프로젝트 생성

## 1.1 npm 프로젝트 생성

```bash
npm init -y
```

<br>

## 1.2 패키지 설치

### 1.2.1 Webpack 설치

> ```bash
> npm init -y
> npm i -D webpack webpack-cli webpack-dev-server@next copy-webpack-plugin
> ```
>
> - webpack
> - webpack-cli : 웹팩을 사용하여 프로젝트를 진행할 떄 생산성을 높이기 위해서 사용한다.
> - webpack configuration을 설정하는데 도움을 주는 도구들을 제공. Commend line interface를 사용할 수 있게 한다.
> - webpack-dev-server : 개발환경에서만 사용되며, 개발과정에서 코드를 실시간으로 서버에 적용하기 위해서 사용한다.

> ### webpack.config.js 설정
>
> ```js
> //webpack.config.js
> 
> const path = require('path')
> 
> module.exports = {
>   entry: './src/main.js',
>   output: {
>     path: path.resolve(__dirname, 'dist'),
>     filename: 'main.js',
>     clean: true // 기존 내용을 제거
>   },
> }
> ```
>
> 
>
> ### entry
>
> 웹팩에서 사용할 진입점 파일을 지정해주는 것으로 기본 값은 `./src/index.js`지만, 설정을 통해 **여러 개 혹은 다른 것**을 지정할 수 있다. (웹팩은 기본적으로 자바스크립트 파일을 진입점으로 사용한다.)
>
> ### output
>
> entry에 입력된 파일들을 분석해서 웹팩이 결과물(생성된 번들)을 지정하는 설정이다. 기본 출력 파일은 `./dist/main.js` 이고 다른 파일들은 `./dist`파일로 설정된다.
>
> ### path
>
> path 속성은 절대 경로를 필요로 하기 때문에 해당 경로를 명시해주어야 한다. node.js 에서 사용할 수 있는 `require`라는 전역함수를 이용해서 `webpack.config.js`파일이 있는 디렉터리(__dirname)에 `dist`라는 폴더를 생성한 뒤 해당 폴더에 번들(filename으로) 반환한다.
>
> ### loder
>
> ```bash
> npm i -D postcss sass
> npm i -D css-loader file-loader postcss-loader sass-loader style-loader
> ```
>
> 웹팩은 모든 파일을 모듈로 취급한다. css, scss, img 등을 모두 모듈로 취급하기 때문에 js코드에서 직접 import가 가능한데 이것이 로더의 역할이다.
>
> 로더의 적용 순서는 기본적으로 오른쪽에서 왼쪽이다. `,`단위로 개행해서 입력하면 아래에서 위로 순차적으로 적용된다.
>
> ```js
> //webpack.config.js
> 
> module: {
>  //생략
>     rules: [
>       {
>         test: /\.s?css$/,
>         use: [
>           'style-loader',
>           'css-loader',
>           'postcss-loader',
>           'sass-loader'
>         ]
>       }, 
>       {
>         test: /\.(png|jpe?g|gif|webp)$/,
>         use: 'file-loader'
>       },
>   ]
>   },
> //생략
> }
> ```
>
> ```js
> //.postcssrc.js
> module.exports = {
>   plugins: [
>     require('autoprefixer')
>   ]
> }
> ```
>
> 
>
> ### plugin
>
> ```bash
> npm i -D html-webpack-plugin
> ```
>
> entry의 js파일을 loader를 이용해 웹팩이 만든 번들에 추가적인 작업을 하기 위한 것으로 결과물의 형태를 바꾸는 역할을 한다.

<br>

### 1.2.2 babel 설치

> 최신의 자바스크립트 문법(ES6 이상)을 브라우저가 이해할 수 있도록 ES5로 변환해주는 자바스크립트 컴파일러
>
> ```bash
> npm i -D @babel/core @babel/plugin-transform-runtime @babel/preset-env
> ```
>
> - [babel/core](https://babeljs.io/docs/en/babel-plugin-transform-runtime)
> - [babel/plugin-transform-runtime](https://babeljs.io/docs/en/babel-plugin-transform-runtime)
> - [babel/preset-env](https://babeljs.io/docs/en/babel-preset-env)
>
> ### .babelrc.js  설정
>
> ```js
> module.exports = {
>   presets: ['@babel/preset-env'],
>   plugins: [
>     ['@babel/plugin-transform-runtime']
>   ]
> }
> ```
>
> ### loader 추가
>
> ```js
> //webpack.config.js
> module.exports = {
> // 생략
>   module: {
>     rules: [
>       {
>         test: /\.js$/,
>         exclude: /node_modules/, // 제외할 경로
>         use: [
>           'babel-loader'
>         ]
>       },
>     ]
>   }
> // 생략
> }
> ```

<br>

### 1.2.3 vue 설치

> ### vue 설치
>
> ```bash
> npm i -D vue@next
> ```
>
> ### 패키지 설치
>
> ```bash
> npm i -D vue-loader@next vue-style-loader @vue/compiler-sfc
> ```
>
> ### webpack.config.js 설정
>
> ```js
> //webpack.config.js
> // 생략
> const { VueLoaderPlugin } = _require('vue-loader')
> 
> module.exports = {
> //생략
>   module: {
>   //생략
>     rules: [
>       {
>         test: /\.vue$/,
>         use: 'vue-loader'
>       },
>       {
>         test: /\.s?css$/,
>         use: [
>           'vue-style-loader',
>         ]
>       },
>     ]
>     //생략
>   },
> 
>   plugin: [
> //생략
>     new VueLoaderPlugin()
>   ],
> }
> ```

### 1.2.4 eslint

> ```bash
> npm i -D eslint eslint-plugin-vue babel-eslint
> ```
>
> ### .eslintrc.js 설정
>
> ```js
> // .eslintrc.js
> module.exports = {
>   env: {
>     browser: true,
>     node: true
>   },
>   extends: [
>     // 'plugin:vue/vue3-essential', // Lv1
>     'plugin:vue/vue3-strongly-recommended', // Lv2
>     // 'plugin:vue/vue3-recommended', // Lv3
>     'eslint:recommended'
>   ],
>   parserOptions: {
>     parser: 'babel-eslint'
>   },
>   rules: {
>     'vue/html-self-closing': ['error', {
>       html: {
>         void: 'always',
>         normal: 'never',
>         component: 'always'
>       },
>       svg: 'always',
>       math: 'always'
>     }],
>     'vue/html-closing-bracket-newline': ['error', {
>       singleline: 'never',
>       multiline: 'never'
>     }]
>   }
> }
> ```



