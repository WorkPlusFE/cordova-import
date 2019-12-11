# cordova-import [![Build Status](https://travis-ci.org/WorkPlusFE/cordova-import.svg?branch=master)](https://travis-ci.org/WorkPlusFE/cordova-import) [![npm version](https://badge.fury.io/js/%40w6s%2Fcordova-import.svg)](https://badge.fury.io/js/%40w6s%2Fcordova-import)

> `cordova-import.js`提供在 WorkPlus WebView 中注入 cordova 的能力，默认以`local`的方式注入，但同时会根据不同的环境，例如轻应用的访问协议（http、https），是否在 iframe 内打开等，自动选择最佳的注入方式，开发者无需关注过多的注入细节，开箱即用，一步到位！

### 如何使用

请确保脚本`cordova-import.js`与`ios.cordova.min.js`及`android.cordova.min.js`放置到同一个资源目录，以确保脚本的正确加载。并且，为了提高资源的下载速度，请配置相关服务端的资源压缩策略，例如开启`gzip`。

相关脚本可在[Release页面](https://github.com/WorkPlusFE/cordova-import/releases/tag/v1.3.1)进行下载。

#### 一、通过 script 标签直接引入

> 单页面应用（SPA）引入一次即可，多页面应用还需在每个页面都单独引入

简单地在`index.html`头部引入即可：

```html
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <!-- 直接添加即可 -->
    <script src="//workplus.io/cordova-import.js" type="text/javascript"></script>
    
    <title>Cordova Import Demo</title>
  </head>
  <body>
    <div id="app"></div> 
  </body>
</html>
```

#### 二、通过 npm 安装

```bash
yarn add @w6s/cordova-import
# or 
npm install @w6s/cordova-import -S
```

尽可能在应用入口引入并初始化，以确保尽可能早地注入 CordovaJs

```js
import CordovaImport from '@w6s/cordova-import';

CordovaImport.init('//workplus.io/'); // URI 无需带上访问协议，必须以斜杠结尾
```

当前仅支持传入 js 加载地址(非必须），默认使用`local`模式，以加速开发效率！

> 若不传入地址，将完全使用`local`模式，请根据实际情况进行选择


### 配置说明

```js
const config = {
  // 只有作为es模块初始化时，才需配置
  SDK_HOST: null,
  ...

  // 不同平台的 CordovaJs
  cordovajs: {
    iOS: 'ios.cordova.min.js',
    android: 'android.cordova.min.js',
    local: 'applocal://cordova.min.js',
  },
  ...
};
```



