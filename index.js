#!/usr/bin/env node

var stream = require('./lib/stream');

if (__dirname === process.argv[1] || __filename === process.argv[1]) {
  stream();
}

module.exports = stream;
