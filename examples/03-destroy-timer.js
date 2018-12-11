'use strict';

const { createHook } = require('async_hooks');

const print = require('../lib/print');

const init = (id, type, triggerAsyncId, resource) => {
  print({ id, type, triggerAsyncId });
};

const before = id => {
  print({ stage: 'before', id });
};

const after = id => {
  print({ stage: 'after', id });
};

const destroy = id => {
  print({ stage: 'destroy', id });
};

const hook = createHook({ init, before, after, destroy });
hook.enable();

setTimeout(() => {
  print('my callback');
}, 100);
