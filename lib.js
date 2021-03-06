'use strict';

import invariant from 'invariant';
import merge from 'lodash.merge';
import config from './config';
import { 
  isHttpsProtocol, 
  inIframe, 
  isiOSPlatform,
  isAndroidPlatform,
  isX5Webview,
  getCordovaJsUriByPlatform,
} from './utils';

export default class CordovaImportLib {
  constructor(host) {
    if (host) {
      this.config = merge(config, { SDK_HOST: host });
    } else {
      this.config = config;
    }
  }

  get userAgent() {
    return window.navigator.userAgent.toLowerCase();
  }

  /**
   * 返回注入的地址
   * 
   * 默认使用 local模式，当检测到是 https协议 (安卓) 或在 iframe 中打开时，强制使用 http 模式
   */
  getImportUri() {
    // 以 es模块 初始化的情况下，不传人 SDK_HOST，默认只需要支持 local
    if (this.mustUseHttpModel() && this.config.SDK_HOST) {
      const platform = this.getCurrentPlatformByUserAgent();
      invariant(platform, 'Please open in the correct webview');

      return getCordovaJsUriByPlatform(this.config, platform);
    }

    return this.config.cordovajs.local;
  }

  mustUseHttpModel() {
    if (inIframe()) return true;
    if (isHttpsProtocol() && isAndroidPlatform(this.userAgent) && !isX5Webview()) return true;
    return false;
  }

  getCurrentPlatformByUserAgent() {
    if (isiOSPlatform(this.userAgent)) {
      return 'iOS';
    }
    if (isAndroidPlatform(this.userAgent)) {
      return 'android';
    }
    return false;
  }
}
