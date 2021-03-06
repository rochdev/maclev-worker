'use strict';

var db = require('../db');
var find = require('../util/find');

module.exports = {
  run(callback) {
    find.json(`https://api.github.com/repos/rbenv/ruby-build/contents/share/ruby-build`, 'name', function(versions) {
      versions = versions.map((version) => {
        return {name: version};
      });

      db.save('ruby_versions', versions, () => {
        callback();
      });
    });
  }
};
