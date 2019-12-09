'use strict';

import invariant from 'invariant';
import CordovaImportLib from './lib';
import { 
  scriptGenerator, 
  getAssetDomainUrl, 
  inWorkPlus,
} from './utils';

function cordovaImportInit() {
  try {
    if (!inWorkPlus()) return;

    const sdkUri = getAssetDomainUrl(); // 自动获取资源路径
    const lib = new CordovaImportLib(sdkUri);
    const importUri = lib.getImportUri();
    scriptGenerator(importUri);
  } catch (error) {
    invariant(false, error);
  }
};

cordovaImportInit();
