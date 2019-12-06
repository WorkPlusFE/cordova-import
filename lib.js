'use strict';

import invariant from 'invariant';
import merge from 'lodash.merge';
import config from './config';
import { 
  isHttpsProtocol, 
  inIframe, 
  isiOSPlatform,
  isAndroidPlatform,
  getCordovaJsUriByPlatform,
  inWorkPlus,
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

  openInWorkPlus() {
    return inWorkPlus(this.userAgent);
  }

  /**
   * 返回注入的地址
   * 
   * 默认使用 local模式，当检测到是 https协议 (安卓) 或在 iframe 中打开时，强制使用 http 模式
   */
  getImportUri() {
    const platform = this.getCurrentPlatformByUserAgent();
    invariant(platform, 'Please open in the correct webview');

    if (this.mustUseHttpModel()) {
      return getCordovaJsUriByPlatform(this.config, platform);
    }

    return this.config.cordovajs.local;
  }

  mustUseHttpModel() {
    if (inIframe()) return true;
    if (isHttpsProtocol() && isAndroidPlatform(this.userAgent)) return true;
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
