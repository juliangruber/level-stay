var Store        = require('level-store');
var EventEmitter = require('events').EventEmitter;
var inherits     = require('util').inherits;
var debug        = require('debug')('level-stay');

module.exports = stay;

function stay (db, butts) {
  var ee = new EventEmitter();
  var store = Store(db);

  if (typeof butts == 'string') {
    var name = arguments[1];
    var model = arguments[2];
    butts = {};
    butts[name] = model;
  }

  var names = Object.keys(butts);
  var toSync = names.length;

  names.forEach(function (name) {
    var butt = butts[name];
    
    store.exists(name, function (err, exists) {
      debug('exists', exists);

      if (err || !exists) {
        onSync();
      } else {
        var ws = butt.createWriteStream();
        ws.on('sync', onSync);
        store.createReadStream(name).pipe(ws);
      }

      function onSync() {
        butt.createReadStream()
          .pipe(store.createWriteStream(name, { append : true }));

        if (!--toSync) process.nextTick(function () {
          debug('sync');
          ee.emit('sync');
        });
      }
    });
  });

  return ee;
}
