---
id: webpack4-react
title: webpack4+babel7+eslint+react配置
---

### 1. 安装webpack、babel7、eslint

```
npm init -y
npm install webpack webpack-cli --save-dev

//安装babel
npm install babel-loader @babel/core @babel/preset-env @babel/preset-react @babel/plugin-transform-runtime -D

npm install babel-polyfill

//安装eslint
npm install -g eslint
eslint --init

//安装eslint依赖
npm install eslint babel-eslint eslint-config-airbnb eslint-config-standard eslint-loader eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-node eslint-plugin-promise eslint-plugin-react eslint-plugin-standard -D

//安装webpack依赖和插件
npm install autoprefixer clean-webpack-plugin compression-webpack-plugin css-loader extract-text-webpack-plugin@next file-loader html-webpack-plugin postcss-loader sass-loader style-loader uglifyjs-webpack-plugin url-loader webpack-dev-server webpack-merge -D

//安装react
npm install react react-dom react-hot-loader react-redux react-router-dom redux
```
所有依赖如下

```
"devDependencies": {
    "@babel/core": "^7.3.4",
    "@babel/plugin-transform-runtime": "^7.3.4",
    "@babel/preset-env": "^7.3.4",
    "@babel/preset-react": "^7.0.0",
    "autoprefixer": "^9.4.9",
    "babel-eslint": "^10.0.1",
    "babel-loader": "^8.0.5",
    "clean-webpack-plugin": "^1.0.1",
    "compression-webpack-plugin": "^2.0.0",
    "css-loader": "^2.1.0",
    "eslint": "^5.14.1",
    "eslint-config-airbnb": "^17.1.0",
    "eslint-config-standard": "^12.0.0",
    "eslint-loader": "^2.1.2",
    "eslint-plugin-import": "^2.16.0",
    "eslint-plugin-jsx-a11y": "^6.2.1",
    "eslint-plugin-node": "^8.0.1",
    "eslint-plugin-promise": "^4.0.1",
    "eslint-plugin-react": "^7.12.4",
    "eslint-plugin-standard": "^4.0.0",
    "extract-text-webpack-plugin": "^4.0.0-beta.0",
    "file-loader": "^3.0.1",
    "html-webpack-plugin": "^3.2.0",
    "postcss-loader": "^3.0.0",
    "redux-devtools-extension": "^2.13.8",
    "sass-loader": "^7.1.0",
    "style-loader": "^0.23.1",
    "uglifyjs-webpack-plugin": "^2.1.2",
    "url-loader": "^1.1.2",
    "webpack": "^4.29.6",
    "webpack-cli": "^3.2.3",
    "webpack-dev-server": "^3.2.1",
    "webpack-merge": "^4.2.1"
  },
  "dependencies": {
    "babel-polyfill": "^6.26.0",
    "react": "^16.8.3",
    "react-dom": "^16.8.3",
    "react-hot-loader": "^4.7.1",
    "react-redux": "^6.0.1",
    "react-router-dom": "^4.3.1",
    "redux": "^4.0.1"
  }
```

### 2 新建创建相关文件

```
mkdir src
touch src/index.js src/index.html App.js
```


###  3. 配置webpack
#### 3.1 创建webpack.common.config.js 公共配置 webpack.config.js 生产时需要的配置 webpack.dev.config.js 开发是需要的配置
##### 3.1.1 配置webpack.common.config.js

```
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const commonConfig = {
  /* 入口 */
  entry: {
    app: [
      'babel-polyfill',
      path.join(__dirname, 'src/index.js')
    ],
    vendor: ['react', 'react-router-dom', 'redux', 'react-dom', 'react-redux'] // 把react等库生成打包到vendor.hash.js里面去。
  },
  /* 输出到build文件夹，输出文件名字为[name].[chunkhash].js */
  output: {
    path: path.join(__dirname, './build'),
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
    publicPath: '/'
  },
  /* src文件夹下面的以.js结尾的文件，要使用babel解析 */
  /* cacheDirectory是用来缓存编译结果，下次编译加速 */
  module: {
    rules: [{
      test: /\.js$/,
      use: ['babel-loader?cacheDirectory=true'],
      include: path.join(__dirname, 'src')
    }, {
      test: /\.(png|jpg|gif|svg)$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 8192 // 小于等于8K的图片会被转成base64编码，直接插入HTML中，减少HTTP请求。
        }
      }]
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({// 每次自动把js插入到模板index.html里面去
      filename: 'index.html',
      template: path.join(__dirname, 'src/index.html')
    }),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({ // 提取并缓存公共库
      name: 'vendor'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'runtime'
    })
  ]
};

module.exports = commonConfig;

```

##### 3.1.2配置webpack.dev.config.js

```
const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');
const commonConfig = require('./webpack.common.config.js');

const devConfig = {
  devtool: 'inline-source-map',
  entry: {
    app: [
      'babel-polyfill',
      'react-hot-loader/patch',
      path.join(__dirname, 'src/index.js')
    ]
  },
  output: {
    /* 这里本来应该是[chunkhash]的，但是由于[chunkhash]和react-hot-loader不兼容。只能妥协 */
    filename: '[name].[hash].js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        include: /node_modules/,
        loader: 'style!css'
      }, {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader']
      }]
  },
  devServer: {
    contentBase: path.join(__dirname, './build'), // 让WEB服务器运行静态资源（index.html）
    historyApiFallback: true,
    host: '127.0.0.1',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    })
  ]
};

module.exports = merge({
  customizeArray(a, b, key) {
    /* entry.app不合并，全替换 */
    if (key === 'entry.app') {
      return b;
    }
    return undefined;
  }
})(commonConfig, devConfig);

```

##### 3.1.3 配置webpack.prod.config.js

```
const merge = require('webpack-merge');

const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const commonConfig = require('./webpack.common.config.js');

const publicConfig = {
  devtool: 'cheap-module-source-map',
  module: {
    rules: [{
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: 'css-loader'
      })
    },
    {
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader']
    }]
  },
  plugins: [
    new CleanWebpackPlugin(['build/*.*']),
    new CompressionPlugin(), // 提供带 Content-Encoding 编码的压缩版的资源
    new UglifyJSPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new ExtractTextPlugin({
      filename: '[name].[contenthash:5].css',
      allChunks: true
    })
  ]

};

module.exports = merge(commonConfig, publicConfig);

```

### 4 配置babel
#### 4.1 新建一个.babelrc文件

```
{
  "presets": [
    "@babel/preset-env",
    "@babel/preset-react"
  ],
  "plugins": [
    "react-hot-loader/babel",
    "@babel/plugin-transform-runtime"
  ]
}
```

### 5配置eslint
#### 5.1配置.eslintrc.js

```
module.exports = {
    extends: "airbnb",
    parserOptions: {
        ecmaVersion: 7
    },
    parser: "babel-eslint",
    env: {
        browser: true,
        webextensions: true,
        // jest: true,
        // jasmine: true
    },
    rules: {
        "max-len": [
            2,
            {
                code: 100,
                comments: 100,
                ignoreComments: true,
                ignoreStrings: true,
                ignoreTemplateLiterals: true,
                ignoreRegExpLiterals: true,
            },
        ],
        "object-shorthand": [
            2,
            "always",
            {
                "avoidExplicitReturnArrows": true
            }
        ],
        "function-paren-newline": 0,
        "class-methods-use-this": 0,
        "comma-dangle": 0,
        "prefer-destructuring": [
            2,
            {
                "AssignmentExpression": {
                    "array": false,
                    "object": false,
                },
            }
        ],
        "import/extensions": "off",
        "import/no-extraneous-dependencies": 1,
        "import/no-unresolved": 1,
        "import/prefer-default-export": 0,
        "jsx-a11y/label-has-for": 0, // allow implicit label for input implementation
        "jsx-a11y/no-static-element-interactions": 0,
        "jsx-a11y/no-noninteractive-element-interactions": 0,
        "jsx-a11y/mouse-events-have-key-events": 0,
        "linebreak-style": "off",
        "no-await-in-loop": 0,
        "no-console": 0,
        "no-empty-function": 1,
        "no-param-reassign": 0, // [].reduce are easier with this turned off,
        "no-restricted-syntax": [
            2,
            "DebuggerStatement",
            "LabeledStatement",
            "WithStatement"
        ],
        "no-shadow": 0,
        "no-underscore-dangle": 0,
        "no-unused-vars": 1,
        "react/sort-comp": 0,
        "react/forbid-prop-types": 0,
        "react/jsx-closing-bracket-location": 0,
        "jsx-a11y/click-events-have-key-events": 0,
        "jsx-a11y/anchor-is-valid": 0,
        "react/jsx-filename-extension": [
            1,
            {
                extensions: [
                    ".js",
                    ".jsx"
                ]
            }
        ],
        "react/destructuring-assignment": ['always'
        ],
        "react/no-array-index-key": 0,
        "react/require-default-props": 1,
        "no-mixed-operators": 0,
        "react/no-did-mount-set-state": 0, // dom size detection after mount may require setState in didMount
    }
};

```








