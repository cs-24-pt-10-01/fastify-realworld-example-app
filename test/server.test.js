const rapl = require('./rapl.js');
'use strict';
rapl.start("2:server.test.js:require");
const t = require('tap');
rapl.stop("2:server.test.js:require");
rapl.start("3:server.test.js:require");
const startServer = require('./setup-server');
rapl.stop("3:server.test.js:require");
rapl.start("5:server.test.js:test");
t.test('requests the "/" route', async t => {
  rapl.start("6:server.test.js:startServer");
  const server = await startServer();
  rapl.stop("6:server.test.js:startServer");
  rapl.start("7:server.test.js:teardown");
  t.teardown(() => server.close());
  rapl.stop("7:server.test.js:teardown");
  rapl.start("9:server.test.js:inject");
  const response = await server.inject({
    method: 'GET',
    url: '/api/articles'
  });
  rapl.stop("9:server.test.js:inject");
  rapl.start("14:server.test.js:equal");
  t.equal(response.statusCode, 200, 'returns a status code of 200');
  rapl.stop("14:server.test.js:equal");
  rapl.start("15:server.test.js:end");
  t.end();
  rapl.stop("15:server.test.js:end");
});
rapl.stop("5:server.test.js:test");
rapl.start("18:server.test.js:test");
t.test('requests not existing route', async t => {
  rapl.start("19:server.test.js:startServer");
  const server = await startServer();
  rapl.stop("19:server.test.js:startServer");
  rapl.start("20:server.test.js:teardown");
  t.teardown(() => server.close());
  rapl.stop("20:server.test.js:teardown");
  rapl.start("22:server.test.js:inject");
  const response = await server.inject({
    method: 'GET',
    url: '/dummy'
  });
  rapl.stop("22:server.test.js:inject");
  rapl.start("27:server.test.js:equal");
  t.equal(response.statusCode, 404, 'returns a status code of 404');
  rapl.stop("27:server.test.js:equal");
  rapl.start("28:server.test.js:end");
  t.end();
  rapl.stop("28:server.test.js:end");
});
rapl.stop("18:server.test.js:test");
