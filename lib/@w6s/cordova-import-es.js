/*!
 * @w6s/cordova-import.js v1.3.0
 * (c) 2019 WorkPlusFE
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('invariant'), require('lodash.merge'), require('lodash.isstring')) :
  typeof define === 'function' && define.amd ? define(['invariant', 'lodash.merge', 'lodash.isstring'], factory) :
  (global = global || self, global.w6sCordovaImport = factory(global.invariant, global.merge, global.isString));
}(this, (function (invariant, merge, isString) { 'use strict';

  invariant = invariant && invariant.hasOwnProperty('default') ? invariant['default'] : invariant;
  merge = merge && merge.hasOwnProperty('default') ? merge['default'] : merge;
  isString = isString && isString.hasOwnProperty('default') ? isString['default'] : isString;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  var config = {
    SDK_NAME: 'cordova-import.js',
    // 只有作为es模块初始化时，才需配置
    SDK_HOST: null,
    // 不同平台的 CordovaJs
    cordovajs: {
      iOS: 'ios.cordova.min.js',
      android: 'android.cordova.min.js',
      local: 'applocal://cordova.min.js'
    },
    // =.=!
    pcSDKUri: ''
  };

  var isHttpsProtocol = function isHttpsProtocol() {
    return window.location.protocol === 'https:';
  }; // 是否在 iframe 中打开

  var inIframe = function inIframe() {
    return self.frameElement && self.frameElement.tagName == "IFRAME";
  };
  var isiOSPlatform = function isiOSPlatform(userAgent) {
    return userAgent.indexOf('iphone') > -1;
  };
  var isAndroidPlatform = function isAndroidPlatform(userAgent) {
    return userAgent.indexOf('android') > -1;
  };
  var getCordovaJsUriByPlatform = function getCordovaJsUriByPlatform(config, platform) {
    return "".concat(config.SDK_HOST).concat(config.cordovajs[platform]);
  };
  var inWorkPlus = function inWorkPlus() {
    return navigator.userAgent.indexOf('workplus') > -1;
  };
  var scriptGenerator = function scriptGenerator(uri) {
    var cordovaScriptElement = document.createElement('script');
    cordovaScriptElement.setAttribute('type', 'text/javascript');
    cordovaScriptElement.setAttribute('src', uri);
    var head = document.getElementsByTagName('head')[0];
    head.appendChild(cordovaScriptElement);
  };
  var isValidHost = function isValidHost(uri) {
    if (!isString(uri)) return false;
    if (uri.indexOf('http') === 0) return false;
    if (uri.indexOf('//') !== 0) return false;
    if (uri.indexOf('.') === -1) return false;
    if (uri[uri.length - 1] !== '/') return false;
    return true;
  };

  var CordovaImportLib =
  /*#__PURE__*/
  function () {
    function CordovaImportLib(host) {
      _classCallCheck(this, CordovaImportLib);

      if (host) {
        this.config = merge(config, {
          SDK_HOST: host
        });
      } else {
        this.config = config;
      }
    }

    _createClass(CordovaImportLib, [{
      key: "getImportUri",

      /**
       * 返回注入的地址
       * 
       * 默认使用 local模式，当检测到是 https协议 (安卓) 或在 iframe 中打开时，强制使用 http 模式
       */
      value: function getImportUri() {
        // 以 es模块 初始化的情况下，不传人 SDK_HOST，默认只需要支持 local
        if (this.mustUseHttpModel() && this.config.SDK_HOST) {
          var platform = this.getCurrentPlatformByUserAgent();
          invariant(platform, 'Please open in the correct webview');
          return getCordovaJsUriByPlatform(this.config, platform);
        }

        return this.config.cordovajs.local;
      }
    }, {
      key: "mustUseHttpModel",
      value: function mustUseHttpModel() {
        if (inIframe()) return true;
        if (isHttpsProtocol() && isAndroidPlatform(this.userAgent)) return true;
        return false;
      }
    }, {
      key: "getCurrentPlatformByUserAgent",
      value: function getCurrentPlatformByUserAgent() {
        if (isiOSPlatform(this.userAgent)) {
          return 'iOS';
        }

        if (isAndroidPlatform(this.userAgent)) {
          return 'android';
        }

        return false;
      }
    }, {
      key: "userAgent",
      get: function get() {
        return window.navigator.userAgent.toLowerCase();
      }
    }]);

    return CordovaImportLib;
  }();

  function cordovaImportInit(host) {
    try {
      if (!inWorkPlus()) return;

      if (host) {
        invariant(isValidHost(host), 'Please enter a valid host, such as //workplus.io/');
      }

      var lib = new CordovaImportLib(host);
      var importUri = lib.getImportUri();
      scriptGenerator(importUri);
    } catch (error) {
      invariant(false, error);
    }
  }
  var npmEntry = {
    init: cordovaImportInit
  };

  return npmEntry;

})));
