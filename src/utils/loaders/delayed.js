'use strict';

var bluebird = require('bluebird');

export default function(fn, delay) {
  // simulate delay of calling API and retrieving real data :)
  return bluebird.delay(delay).then(fn);
}
