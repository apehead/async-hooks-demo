'use strict';

const { createHook } = require('async_hooks');

const print = require('../lib/print');

const init = (id, type, triggerAsyncId, resource) => {
  print({ id, type, triggerAsyncId });
};

const hook = createHook({ init });
hook.enable();

setTimeout(() => {}, 100);
