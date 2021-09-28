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
> npm i -D webpack webpack-cli webpack-dev-server@next copy-webpack-plugin html-webpack-plugin
> ```
>
> - webpack : 패키지 번들러 동작을 위한 패키지
> - webpack-cli : 웹팩을 사용하여 프로젝트를 진행할 떄 생산성을 높이기 위해서 사용한다. webpack configuration을 설정하는데 도움을 주는 도구들을 제공. Commend line interface를 사용할 수 있게 한다.
> - webpack-dev-server : 개발환경에서만 사용되며, 개발과정에서 코드를 실시간으로 서버에 적용하기 위해서 사용한다.
> - html-webpack-plugin : 최초 실행될 HTML 템플릿 연결
> - copy-webpack-plugin : 정적 파일 복사

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
> npm i -D postcss sass autoprefixeㄱ
> npm i -D css-loader file-loader postcss-loader sass-loader style-loader
> ```
>
> - sass: SCSS(Sass) 문법을 해석
> - postcss: Autoprefixer 등의 다양한 스타일 후처리기 패키지
> - autoprefixer: 스타일에 자동으로 공급 업체 접두사(Vendor prefix)를 적용하는 PostCSS의 플러그인
> - sass-loader: SCSS(Sass) 파일을 로드
> - postcss-loader: PostCSS(Autoprefixer)로 스타일 파일을 처리
> - css-loader: CSS 파일을 로드
> - file-loader: 지정된 파일(이미지)을 로드
> - style-loader: 로드된 스타일(CSS)을 `<style>`로 `<head>`에 삽입
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
> npm i -D @babel/core @babel/plugin-transform-runtime @babel/preset-env babel-loader
> ```
>
> - @babel/core: ES6 이상의 코드를 ES5 이하 버전으로 변환
> - @babel/preset-env: Babel 지원 스펙을 지정
> - @babel/plugin-transform-runtime: Async/Await 문법 지원
> - babel-loader: JS 파일을 로드
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

<br>

### 1.2.5 기타 설정 및 webpack.config.js 최종

> ```js
> const _require = id => require(require.resolve(id, {
>   paths: [require.main.path]
> }))
> const path = _require('path')
> const HtmlPlugin = _require('html-webpack-plugin')
> const CopyPlugin = _require('copy-webpack-plugin')
> const {
>   VueLoaderPlugin
> } = _require('vue-loader')
> 
> module.exports = {
>   resolve: {
>     extensions: ['.js', '.vue'],
>     alias: {
>       '~': path.resolve(__dirname, 'src'),
>       'assets': path.resolve(__dirname, 'src/assets')
>     }
>   },
> 
>   entry: './src/main.js',
> 
>   output: {
>     path: path.resolve(__dirname, 'dist'),
>     filename: 'main.js',
>     clean: true
>   },
> 
>   module: {
>     rules: [{
>         test: /\.vue$/,
>         use: 'vue-loader'
>       },
>       {
>         test: /\.s?css$/,
>         use: [
>           'vue-style-loader',
>           'style-loader',
>           'css-loader',
>           'postcss-loader',
>           'sass-loader'
>         ]
>       },
>       {
>         test: /\.js$/,
>         exclude: /node_modules/,
>         use: [
>           'babel-loader'
>         ]
>       },
>       {
>         test: /\.(png|jpe?g|gif|webp)$/,
>         use: 'file-loader'
>       }
>     ]
>   },
> 
>   plugins: [
>     new HtmlPlugin({
>       template: './index.html'
>     }),
>     new CopyPlugin({
>       patterns: [{
>         from: 'static'
>       }]
>     }),
>     new VueLoaderPlugin()
>   ],
> 
>   devServer: {
>     host: 'localhost',
>     port: 8080,
>     hot: true
>   }
> }
> ```
>
> ### 브라우저 지원 설정
>
> ```json
> //package.json
> 
>   "__browserslist": "이 프로젝트가 지원하는 대상 브라우저를 지정 for Autoprefixer!",
>   "browserslist": [
>     "> 1%",
>     "last 2 versions"
>   ],
> ```

---

# 2. Header

## 2.1 Vue-router

### 2.3.1 설치

> ```bash
> npm install vue-router@4
> ```

### 2.3.2 router-link

> ``a``태그 대신해서 링크 연결을 제공하는 Vue-router의 태그. 실질적으로는 ``a``태그로 변환되어 출력된다.
>
> ### active-class 속성
>
> 활성화 되고 있는 ``a``태그에 남기는 속성으로 ``router-link-active``을 기본값으로 한다. 클래스를 이용해서 스타일을 적용시키는 부트스트랩을 이용할 경우 값을 바꿔서 사용해야 한다.
>
> ```vue
> <RouterLink
> 	:to="nav.href" 
> 	active-class="active" // 값을 바꾸었다.
> 	class="nav-link">
> 	{{ nav.name }}
> </RouterLink>
> ```
>
> ### components 와 routes
>
> ![image-20210928173512381](note.assets/image-20210928173512381.png)
>
> 프로젝트에서 Vue 파일이 들어있는 폴더의 구조가 위와 같이 구성되어 있다. **components**는 개별적인 기능?이라고 할 수 있다. 레고 블록을 조립해서 완성품을 만들 듯, 컴포넌트가 모여서 페이지가 완성된다. **routes**는 페이지에 해당한다. 즉, **routes 폴더 안에 있는 특정 Vue 파일에 컴포넌트에 해당하는 Vue파일이 쌓여서 페이지를 장식**한다.
>
> <br>
>
> ```js
> //main.js
> import {
>   createApp
> } from 'vue'
> import App from './App.vue'
> import router from './routes/index.js'
> 
> createApp(App)
>   .use(router)
>   .mount('#app')
> ```
>
> main.js 에서 어떤 파일들을 vue routing하는데 사용할지 설정하고
>
> ```js
> // routes/index.js
> import {
>   createRouter,
>   createWebHashHistory
> } from "vue-router";
> import Home from './Home'
> import About from './About'
> import Movie from './Movie'
> 
> export default createRouter({
>   history: createWebHashHistory(),
>   // 웹사이트 페이지 구분
>   routes: [{
>       path: '/',
>       component: Home
>     },
>     {
>       path: '/about',
>       component: About
>     },
>     {
>       path: '/movie',
>       component: Movie
>     }
>   ]
> })
> ```
>
> index.js에 해당 정보를 저장해두었다. Home, About, Movie에 해당하는 Vue 파일들이 route되는 페이지에 해당한다.
