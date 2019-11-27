# @w6s/cordova-import

> Simple CordovaJs import util.

### 如何使用

当前该脚本的发布地址为`//workplus.io/cordova-import.js`，可在[Release页面](https://github.com/WorkPlusFE/cordova-import/releases/tag/v1.0)进行下载。

> 单页面应用（SPA）引入一次即可，多页面应用需每个页面都引入

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

### 可选参数

当前仅支持传入`type`类型，可选的值为`http`及`local`，其中`http`为默认的方式，设置方式如下：

```html
<script src="//workplus.io/cordova-import.js?type=local" type="text/javascript"></script>
```

注意，如果你的页面将可能在iframe里加载，请勿使用`local`类型。`local`类型适合用于对网络性能要求较高的场合。

### 配置说明

```js
const config = {
    // 【重要】SDK 的地址，必须正确，否则影响脚本注入
    sdkUri: '//workplus.io/cordova-import.js',
    ...

    // 不同平台的 CordovaJs 地址
    cordovaImportUri: {
        iOS: '//workplus.io/ios.cordova.min.js',
        android: '//workplus.io/android.cordova.min.js',
        local: 'applocal://cordova.min.js',
    },
    ...
};
```



