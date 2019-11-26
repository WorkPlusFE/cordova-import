/*!
 * @w6s/cordova-import.js v1.0.0
 * (c) 2019 WorkPlusFE
 */

(function (factory) {
    typeof define === 'function' && define.amd ? define(factory) :
    factory();
}((function () { 'use strict';

    /*!
     * @w6s/query-string.js v1.2.0
     * (c) 2019 Hejx
     * Released under the MIT License.
     * https://github.com/WorkPlusFE/workplus-query-string#readme
     */
    var parse = function parse(str) {
      str = str || window.location.search; // Create an object with no prototype

      var set = Object.create(null);

      if (typeof str !== 'string') {
        return set;
      }

      str = str.trim().replace(/^\?/, '');

      if (!str) {
        return set;
      }

      str.split('&').forEach(function (param) {
        param = param.split('=');
        var key = param.shift();
        var val = param.length > 0 ? param.join('=') : undefined;
        key = decodeURIComponent(key);
        val = val === undefined ? null : decodeURIComponent(val);

        if (key) {
          set[key] = val;
        }
      });
      return set;
    };

    var config = {
      sdkUri: '//workplus.io/cordova-import.js',
      importTypes: ['http', 'local'],
      defaultImportType: 'http',
      // 不同平台的 CordovaJs 地址
      cordovaImportUri: {
        iOS: '//workplus.io/ios.cordova.min.js',
        android: '//workplus.io/android.cordova.min.js',
        local: 'applocal://cordova.min.js'
      },
      pcSDKUri: ''
    };

    function getSDKScriptTag() {
      var scripts = document.getElementsByTagName("script");
      var matchScript = null;

      for (var i = 0; i < scripts.length; i += 1) {
        var script = scripts[i];

        if (script.src && script.src.indexOf(config.sdkUri) > -1) {
          matchScript = script;
          break;
        }
      }

      return matchScript;
    }
    /**
     * 返回注入的地址
     *
     * @param {string} platform [iOS, android, pc]
     * @param {string} type [http, local] default 'http'
     */

    function getImportUriByPlatformAndType(platform, type) {
      if (type && config.importTypes.indexOf(type) > -1) {
        if (type === 'local') {
          return config.cordovaImportUri[type];
        }
      }

      return config.cordovaImportUri[platform];
    }

    function getCurrentPlatformByUserAgent(userAgent) {
      if (userAgent.indexof('iphone')) {
        return 'iOS';
      }

      if (userAgent.indexOf('android')) {
        return 'android';
      }

      return false;
    }

    function scriptGenerator(uri) {
      var cordovaScriptElement = document.createElement('script');
      cordovaScriptElement.setAttribute('type', 'text/javascript');
      cordovaScriptElement.setAttribute('src', uri);
      var head = document.getElementsByTagName('head')[0];
      head.appendChild(cordovaScriptElement);
    }

    function cordovaImportInit() {
      var userAgent = navigator.userAgent.toLowerCase(); // 非 WorkPlus webview 不进行任何处理

      if (userAgent.indexOf('workplus') === -1) return;
      var platform = getCurrentPlatformByUserAgent(userAgent);
      if (!platform) return;
      var SDKScript = getSDKScriptTag();
      var search = SDKScript.src.split('?')[1];
      var opts = {};

      if (search) {
        try {
          opts = parse(search);
        } catch (err) {
          console.err(err);
        }
      }

      var importUri = getImportUriByPlatformAndType(platform, opts.type);
      scriptGenerator(importUri);
    }
    cordovaImportInit();

})));
