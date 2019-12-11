'use strict';

import isString from 'lodash.isstring';
import config from './config';

// 是否为 https 模式
export const isHttpsProtocol = () => window.location.protocol === 'https:';

// 是否在 iframe 中打开
export const inIframe = () => self.frameElement && self.frameElement.tagName == "IFRAME";

export const isiOSPlatform = userAgent => userAgent.indexOf('iphone') > -1;
export const isAndroidPlatform = userAgent => userAgent.indexOf('android') > -1;
export const isX5Webview = userAgent => /x5webkit|mqqbrowser|tbs/.test(userAgent);

export const getCordovaJsUriByPlatform = (config, platform) => `${config.SDK_HOST}${config.cordovajs[platform]}`;

export const inWorkPlus = () => navigator.userAgent.indexOf('workplus') > -1;

export const scriptGenerator = (uri) => {
  const cordovaScriptElement = document.createElement('script');
  cordovaScriptElement.setAttribute('type', 'text/javascript');
  cordovaScriptElement.setAttribute('src', uri);
  const head = document.getElementsByTagName('head')[0];
  head.appendChild(cordovaScriptElement);
};

export const isValidHost = (uri) => {
  if (!isString(uri)) return false;
  if (uri.indexOf('http') === 0) return false;
  if (uri.indexOf('//') !== 0) return false;
  if (uri.indexOf('.') === -1) return false;
  if (uri[uri.length - 1] !== '/') return false;
  return true;
};

const getSDKScriptTagSrc = () => {
  const scripts = document.getElementsByTagName("script");

  let matchScriptSrc = '';
  for (let i = 0; i < scripts.length; i += 1) {
    const script = scripts[i];
    if (script.src && script.src.indexOf(`/${config.SDK_NAME}`) > -1) {
      matchScriptSrc = script.src;
      break;
    }
  }
  return matchScriptSrc;
};

export const getAssetDomainUrl = () => {
  const currentScriptSrc = getSDKScriptTagSrc();
  if (currentScriptSrc) {
    return currentScriptSrc.split(config.SDK_NAME)[0];
  }
};
