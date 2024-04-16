const rapl = require('./rapl.js');
'use strict';
rapl.start("2:users.test.js:require");
const t = require('tap');
rapl.stop("2:users.test.js:require");
rapl.start("3:users.test.js:require");
const startServer = require('../setup-server');
rapl.stop("3:users.test.js:require");
rapl.start("5:users.test.js:test");
t.test('get current user without login', async t => {
  rapl.start("6:users.test.js:startServer");
  const server = await startServer();
  rapl.stop("6:users.test.js:startServer");
  rapl.start("7:users.test.js:teardown");
  t.teardown(() => server.close());
  rapl.stop("7:users.test.js:teardown");
  rapl.start("9:users.test.js:inject");
  const response = await server.inject({
    method: 'GET',
    url: '/api/user'
  });
  rapl.stop("9:users.test.js:inject");
  rapl.start("13:users.test.js:equal");
  t.equal(response.statusCode, 401, 'returns a status code of 401 Unauthorized');
  rapl.stop("13:users.test.js:equal");
  rapl.start("14:users.test.js:end");
  t.end();
  rapl.stop("14:users.test.js:end");
});
rapl.stop("5:users.test.js:test");
