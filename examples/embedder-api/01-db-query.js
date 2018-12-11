const {
  AsyncResource,
  executionAsyncId,
  triggerAsyncId
} = require('async_hooks');

const asyncHooks = require('async_hooks');

const print = require('../../lib/print');

const init = (id, type, triggerAsyncId, resource) => {
  print({ id, type, triggerAsyncId });
};

const before = id => {
  print({ stage: 'before', id });
};

const after = id => {
  print({ stage: 'after', id });
};

const destroy = id => {
  print({ stage: 'destroy', id });
};

const hook = asyncHooks.createHook({ init, before, after, destroy });
hook.enable();

// Define a custom async resource
class MyDBQuery extends AsyncResource {
  constructor(db) {
    super('MyDBQuery');
    this.db = db;
  }

  getInfo(query, callback) {
    console.log('executing getInfo()');
    this.db.get(query, (err, data) => {
      this.runInAsyncScope(
        // function to call in the execution context of this async resource
        callback,
        // the receiver to be used for the function call
        null,
        // optional arguments to pass to the function
        err,
        data
      );
    });
  }

  close() {
    console.log('executing close()');
    this.db = null;
    this.emitDestroy();
  }
}

const fakeDBImpl = {
  get: (query, cb = () => {}) => {
    // execute query to get data, then execute callback
    setTimeout(() => {
      const data = { a: 1, b: 2 };
      cb(null, data);
    }, 3000);
  }
};

const dbConnector = new MyDBQuery(fakeDBImpl);

setTimeout(() => {
  console.log('fetching my query...');

  dbConnector.getInfo('my query', () => {
    console.log('my query callback', {
      triggerAsyncId: triggerAsyncId(),
      executionAsyncId: executionAsyncId()
    });

    setTimeout(() => {
      console.log('closing dbConnector, executionAsyncId: ', {
        triggerAsyncId: triggerAsyncId(),
        executionAsyncId: executionAsyncId()
      });

      dbConnector.close();
    }, 3000);
  });
}, 2000);
