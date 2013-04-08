
# level-stay

Persistence for scuttlebutts based on LevelDB.

## Usage

```js
var stay = require('level-stay');
var db = require('levelup')('/some/db');

// just some scuttlebutt things...
var Model = require('scuttlebutt/model');
var Doc = require('crdt').Doc;
var modelA = new Model();
var modelB = new Model();
var doc = new Doc();

// now persist!
stay(db, {
  'modelA' : modelA,
  'modelB' : modelB,
  'doc' : doc
});
```

`level-stay` also emits a `sync` event when all the instances are synced:

```js
stay(db, { 'model' : model }).on('sync', function () {
  // all synced now
});
```

...and has a short mode

```js
stay(db, 'model', model);
```

## license

(MIT)

Copyright (c) 2013 &lt;julian@juliangruber.com&gt;

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

