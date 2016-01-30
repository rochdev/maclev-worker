'use strict';

var assert = require('assert');
var MongoClient = require('mongodb').MongoClient;
var _db = null;

var services = JSON.parse(process.env.VCAP_SERVICES)["mongolab"][0];
var url = services.credentials.uri;

module.exports = {
  init(callback) {
    MongoClient.connect(url, function(err, db) {
      assert.equal(err, null);
      _db = db;
      callback(db);
    });
  },

  close() {
    return _db.close();
  },

  save(collection, data, callback) {
    _db.collection(collection).insertMany(data, {ordered: false}, callback);
  }
};
