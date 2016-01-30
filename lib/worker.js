'use strict';

var async = require('async');
var requireDir = require('require-dir');
var db = require('./db');

db.init(function() {
  var tasks = requireDir('./tasks');

  async.parallel(Object.keys(tasks).map((name) => tasks[name].run), () => {
    db.close();
  });
});
