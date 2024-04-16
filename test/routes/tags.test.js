const rapl = require('./rapl.js');
'use strict';
rapl.start("2:tags.test.js:require");
const t = require('tap');
rapl.stop("2:tags.test.js:require");
rapl.start("3:tags.test.js:require");
const startServer = require('../setup-server');
rapl.stop("3:tags.test.js:require");
rapl.start("5:tags.test.js:test");
t.test('requests the "/tags" route', async t => {
  rapl.start("6:tags.test.js:startServer");
  const server = await startServer();
  rapl.stop("6:tags.test.js:startServer");
  rapl.start("7:tags.test.js:teardown");
  t.teardown(() => server.close());
  rapl.stop("7:tags.test.js:teardown");
  rapl.start("9:tags.test.js:inject");
  const response = await server.inject({
    method: 'GET',
    url: '/api/tags'
  });
  rapl.stop("9:tags.test.js:inject");
  rapl.start("14:tags.test.js:equal");
  t.equal(response.statusCode, 200, 'returns a status code of 200');
  rapl.stop("14:tags.test.js:equal");
  rapl.start("15:tags.test.js:equal");
  t.equal(JSON.parse(response.body).tags.length, 0, 'returns an empty array');
  rapl.stop("15:tags.test.js:equal");
  rapl.start("16:tags.test.js:end");
  t.end();
  rapl.stop("16:tags.test.js:end");
});
rapl.stop("5:tags.test.js:test");
