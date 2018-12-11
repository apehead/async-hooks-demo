'use strict';

const { createHook } = require('async_hooks');

const init = (id, type, triggerAsyncId, resource) => {
  console.log({ id, type, triggerAsyncId });
};

const hook = createHook({ init });
hook.enable();

setTimeout(() => {}, 100);
