'use strict';

const { createServer } = require('http');
const { createHook } = require('async_hooks');

const print = require('../lib/print');

const init = (id, type, triggerAsyncId, resource) => {
  print({ id, type, triggerAsyncId });
};

const hook = createHook({ init });
hook.enable();

const PORT = 3000;

const server = createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('hello from server!');
});

server.listen(PORT, err => {
  if (err) {
    return console.log('something bad happened', err);
  }

  console.log(`server is listening on ${PORT}`);
});
