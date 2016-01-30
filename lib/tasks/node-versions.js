'use strict';

var db = require('../db');
var find = require('../util/find');

module.exports = {
  run(callback) {
    find.regex('https://nodejs.org/dist/', /href="(v\d+\.\d+\.\d+)\/"/g, function(versions) {
      versions = versions.map((version) => {
        return {name: version};
      });

      db.save('node_versions', versions, () => {
        callback();
      });
    });
  }
};
