const rapl = require('./rapl.js');
rapl.start("1:server.test.js:require");
const rapl = require('./rapl.js');
rapl.stop("1:server.test.js:require");
'use strict';
rapl.start("3:server.test.js:start");
rapl.start("2:server.test.js:require");
rapl.stop("3:server.test.js:start");
rapl.start("4:server.test.js:require");
const t = require('tap');
rapl.stop("4:server.test.js:require");
rapl.start("5:server.test.js:stop");
rapl.stop("2:server.test.js:require");
rapl.stop("5:server.test.js:stop");
rapl.start("6:server.test.js:start");
rapl.start("3:server.test.js:require");
rapl.stop("6:server.test.js:start");
rapl.start("7:server.test.js:require");
const startServer = require('./setup-server');
rapl.stop("7:server.test.js:require");
rapl.start("8:server.test.js:stop");
rapl.stop("3:server.test.js:require");
rapl.stop("8:server.test.js:stop");
rapl.start("9:server.test.js:start");
rapl.start("5:server.test.js:test");
rapl.stop("9:server.test.js:start");
rapl.start("10:server.test.js:test");
t.test('requests the "/" route', async t => {
  rapl.start("11:server.test.js:start");
  rapl.start("6:server.test.js:startServer");
  rapl.stop("11:server.test.js:start");
  rapl.start("12:server.test.js:startServer");
  const server = await startServer();
  rapl.stop("12:server.test.js:startServer");
  rapl.start("13:server.test.js:stop");
  rapl.stop("6:server.test.js:startServer");
  rapl.stop("13:server.test.js:stop");
  rapl.start("14:server.test.js:start");
  rapl.start("7:server.test.js:teardown");
  rapl.stop("14:server.test.js:start");
  rapl.start("15:server.test.js:teardown");
  t.teardown(() => server.close());
  rapl.stop("15:server.test.js:teardown");
  rapl.start("16:server.test.js:stop");
  rapl.stop("7:server.test.js:teardown");
  rapl.stop("16:server.test.js:stop");
  rapl.start("17:server.test.js:start");
  rapl.start("9:server.test.js:inject");
  rapl.stop("17:server.test.js:start");
  rapl.start("18:server.test.js:inject");
  const response = await server.inject({
    method: 'GET',
    url: '/api/articles'
  });
  rapl.stop("18:server.test.js:inject");
  rapl.start("22:server.test.js:stop");
  rapl.stop("9:server.test.js:inject");
  rapl.stop("22:server.test.js:stop");
  rapl.start("23:server.test.js:start");
  rapl.start("14:server.test.js:equal");
  rapl.stop("23:server.test.js:start");
  rapl.start("24:server.test.js:equal");
  t.equal(response.statusCode, 200, 'returns a status code of 200');
  rapl.stop("24:server.test.js:equal");
  rapl.start("25:server.test.js:stop");
  rapl.stop("14:server.test.js:equal");
  rapl.stop("25:server.test.js:stop");
  rapl.start("26:server.test.js:start");
  rapl.start("15:server.test.js:end");
  rapl.stop("26:server.test.js:start");
  rapl.start("27:server.test.js:end");
  t.end();
  rapl.stop("27:server.test.js:end");
  rapl.start("28:server.test.js:stop");
  rapl.stop("15:server.test.js:end");
  rapl.stop("28:server.test.js:stop");
});
rapl.stop("10:server.test.js:test");
rapl.start("30:server.test.js:stop");
rapl.stop("5:server.test.js:test");
rapl.stop("30:server.test.js:stop");
rapl.start("31:server.test.js:start");
rapl.start("18:server.test.js:test");
rapl.stop("31:server.test.js:start");
rapl.start("32:server.test.js:test");
t.test('requests not existing route', async t => {
  rapl.start("33:server.test.js:start");
  rapl.start("19:server.test.js:startServer");
  rapl.stop("33:server.test.js:start");
  rapl.start("34:server.test.js:startServer");
  const server = await startServer();
  rapl.stop("34:server.test.js:startServer");
  rapl.start("35:server.test.js:stop");
  rapl.stop("19:server.test.js:startServer");
  rapl.stop("35:server.test.js:stop");
  rapl.start("36:server.test.js:start");
  rapl.start("20:server.test.js:teardown");
  rapl.stop("36:server.test.js:start");
  rapl.start("37:server.test.js:teardown");
  t.teardown(() => server.close());
  rapl.stop("37:server.test.js:teardown");
  rapl.start("38:server.test.js:stop");
  rapl.stop("20:server.test.js:teardown");
  rapl.stop("38:server.test.js:stop");
  rapl.start("39:server.test.js:start");
  rapl.start("22:server.test.js:inject");
  rapl.stop("39:server.test.js:start");
  rapl.start("40:server.test.js:inject");
  const response = await server.inject({
    method: 'GET',
    url: '/dummy'
  });
  rapl.stop("40:server.test.js:inject");
  rapl.start("44:server.test.js:stop");
  rapl.stop("22:server.test.js:inject");
  rapl.stop("44:server.test.js:stop");
  rapl.start("45:server.test.js:start");
  rapl.start("27:server.test.js:equal");
  rapl.stop("45:server.test.js:start");
  rapl.start("46:server.test.js:equal");
  t.equal(response.statusCode, 404, 'returns a status code of 404');
  rapl.stop("46:server.test.js:equal");
  rapl.start("47:server.test.js:stop");
  rapl.stop("27:server.test.js:equal");
  rapl.stop("47:server.test.js:stop");
  rapl.start("48:server.test.js:start");
  rapl.start("28:server.test.js:end");
  rapl.stop("48:server.test.js:start");
  rapl.start("49:server.test.js:end");
  t.end();
  rapl.stop("49:server.test.js:end");
  rapl.start("50:server.test.js:stop");
  rapl.stop("28:server.test.js:end");
  rapl.stop("50:server.test.js:stop");
});
rapl.stop("32:server.test.js:test");
rapl.start("52:server.test.js:stop");
rapl.stop("18:server.test.js:test");
rapl.stop("52:server.test.js:stop");
