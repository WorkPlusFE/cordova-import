'use strict';

import invariant from 'invariant';
import CordovaImportLib from './lib';
import { scriptGenerator } from './utils';

function cordovaImportInit() {
  try {
    const lib = new CordovaImportLib();

    // 非 WorkPlus webview 不进行任何处理
    if (!lib.openInWorkPlus()) return;

    const importUri = lib.getImportUri();
    scriptGenerator(importUri);
  } catch (error) {
    invariant(false, error);
  }
};

cordovaImportInit();
