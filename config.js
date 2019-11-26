'use strict';

const config = {
    sdkUri: '//workplus.io/cordova-import.js',
    importTypes: ['http', 'local'],
    defaultImportType: 'http',

    // 不同平台的 CordovaJs 地址
    cordovaImportUri: {
        iOS: '//workplus.io/ios.cordova.min.js',
        android: '//workplus.io/android.cordova.min.js',
        local: 'applocal://cordova.min.js',
    },

    pcSDKUri: '',
};

export default config;
