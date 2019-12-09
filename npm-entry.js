'use strict';

import invariant from 'invariant';
import CordovaImportLib from './lib';
import { 
  scriptGenerator, 
  isValidHost,
  inWorkPlus,
} from './utils';

function cordovaImportInit(host) {
  try {
    if (!inWorkPlus()) return;

    if (host) {
      invariant(isValidHost(host), 'Please enter a valid host, such as //workplus.io/');
    }

    const lib = new CordovaImportLib(host);
    const importUri = lib.getImportUri();
    scriptGenerator(importUri);
  } catch (error) {
    invariant(false, error);
  }
};

export default {
  init: cordovaImportInit,
};
