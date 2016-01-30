'use strict';

var db = require('../db');
var find = require('../util/find');

module.exports = {
  run(callback) {
    find.json(`https://api.github.com/repos/caskroom/homebrew-cask/git/trees/master`, function(repo) {
      find.json(repo.tree.find((entry) => entry.path === 'Casks').url, function(cask) {
        var casks = cask.tree
          .filter((file) => /\.rb$/.test(file.path))
          .map((file) => {return {name: file.path.replace(/\.rb$/, '')};});

        db.save('brew_casks', casks, () => {
          callback();
        });
      });
    });
  }
};
