var test    = require('tap').test;
var stay    = require('..');
var Model   = require('scuttlebutt/model');
var levelup = require('levelup');

var path = '/tmp/store' + Math.random().toString(16).slice(2);
var db = levelup(path);

test('storage clean', function (t) {
  var A = new Model();
  var B = new Model();

  A.set('foo', 'bar');

  stay(db, { model : A }).on('sync', function () {
    stay(db, { model : B }).on('sync', function () {
      t.equals(B.get('foo'), 'bar');
      t.end();
    });
  });
});

test('storage dirty', function (t) {
  var A = new Model();

  stay(db, { model : A }).on('sync', function () {
    t.equal(A.get('foo'), 'bar');
    t.end();
  });
});

test('short', function (t) {
  var A = new Model();

  stay(db, 'model', A).on('sync', function () {
    t.equal(A.get('foo'), 'bar');
    t.end();
  });
});
