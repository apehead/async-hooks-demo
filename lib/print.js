'use strict';

const { inspect } = require('util');

function print(obj) {
  process._rawDebug(inspect(obj, true, 100, true));
}

module.exports = print;
