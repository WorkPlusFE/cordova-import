'use strict';

import { parse } from '@w6s/query-string';
import config from './config';

function getSDKScriptTag() {
    const scripts = document.getElementsByTagName("script");

    let matchScript = null;
    for (let i = 0; i < scripts.length; i += 1) {
        const script = scripts[i];
        if (script.src && script.src.indexOf(config.sdkUri) > -1) {
            matchScript = script;
            break;
        }
    }
    return matchScript;
};

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
};

function getCurrentPlatformByUserAgent(userAgent) {
    if (userAgent.indexOf('iphone') > -1) {
        return 'iOS';
    }
    if (userAgent.indexOf('android') > -1) {
        return 'android';
    }
    return false;
};

function scriptGenerator(uri) {
    const cordovaScriptElement = document.createElement('script');
    cordovaScriptElement.setAttribute('type', 'text/javascript');
    cordovaScriptElement.setAttribute('src', uri);
    const head = document.getElementsByTagName('head')[0];
    head.appendChild(cordovaScriptElement);
};

function cordovaImportInit () {
    try {
        const userAgent = navigator.userAgent.toLowerCase();

        // 非 WorkPlus webview 不进行任何处理
        if (userAgent.indexOf('workplus') === -1) return;

        const platform = getCurrentPlatformByUserAgent(userAgent);
        if (!platform) return;
        
        const SDKScript = getSDKScriptTag();
        if (!SDKScript) return;

        const search = SDKScript.src.split('?')[1];
        let opts = {};
        if (search) {
            opts = parse(search);
        }

        const importUri = getImportUriByPlatformAndType(platform, opts.type);
        scriptGenerator(importUri);
    } catch (error) {
        console.error(error);
    }
};

cordovaImportInit();
