const rapl = require('./rapl.js');
rapl.start("1:apilayer.test.js:require");
const rapl = require('./rapl.js');
rapl.stop("1:apilayer.test.js:require");
rapl.start("2:apilayer.test.js:start");
rapl.start("1:apilayer.test.js:require");
rapl.stop("2:apilayer.test.js:start");
rapl.start("3:apilayer.test.js:require");
const test = require('tap').test;
rapl.stop("3:apilayer.test.js:require");
rapl.start("4:apilayer.test.js:stop");
rapl.stop("1:apilayer.test.js:require");
rapl.stop("4:apilayer.test.js:stop");
rapl.start("5:apilayer.test.js:start");
rapl.start("2:apilayer.test.js:require");
rapl.stop("5:apilayer.test.js:start");
rapl.start("6:apilayer.test.js:require");
const apiLayer = require('../../../lib/plugins/apilayer');
rapl.stop("6:apilayer.test.js:require");
rapl.start("7:apilayer.test.js:stop");
rapl.stop("2:apilayer.test.js:require");
rapl.stop("7:apilayer.test.js:stop");
rapl.start("8:apilayer.test.js:start");
rapl.start("3:apilayer.test.js:require");
rapl.stop("8:apilayer.test.js:start");
rapl.start("9:apilayer.test.js:require");
const fetchMock = require('fetch-mock');
rapl.stop("9:apilayer.test.js:require");
rapl.start("10:apilayer.test.js:stop");
rapl.stop("3:apilayer.test.js:require");
rapl.stop("10:apilayer.test.js:stop");
rapl.start("11:apilayer.test.js:start");
rapl.start("5:apilayer.test.js:test");
rapl.stop("11:apilayer.test.js:start");
rapl.start("12:apilayer.test.js:test");
test('post returns the expected response', async t => {
  let myservice;
  const fastify = {
    decorate: (name, service) => {
      myservice = service;
    }
  };
  rapl.start("19:apilayer.test.js:start");
  rapl.start("13:apilayer.test.js:apiLayer");
  rapl.stop("19:apilayer.test.js:start");
  rapl.start("20:apilayer.test.js:apiLayer");
  await apiLayer(fastify, {
    apilayer: {
      key: '123'
    }
  });
  rapl.stop("20:apilayer.test.js:apiLayer");
  rapl.start("25:apilayer.test.js:stop");
  rapl.stop("13:apilayer.test.js:apiLayer");
  rapl.stop("25:apilayer.test.js:stop");
  rapl.start("26:apilayer.test.js:start");
  rapl.start("15:apilayer.test.js:mock");
  rapl.stop("26:apilayer.test.js:start");
  rapl.start("27:apilayer.test.js:mock");
  fetchMock.mock('*', {
    tags: ['tag1', 'tag2']
  });
  rapl.stop("27:apilayer.test.js:mock");
  rapl.start("30:apilayer.test.js:stop");
  rapl.stop("15:apilayer.test.js:mock");
  rapl.stop("30:apilayer.test.js:stop");
  rapl.start("31:apilayer.test.js:start");
  rapl.start("16:apilayer.test.js:post");
  rapl.stop("31:apilayer.test.js:start");
  rapl.start("32:apilayer.test.js:post");
  const response = await myservice.post('Some content', 'host', 'url');
  rapl.stop("32:apilayer.test.js:post");
  rapl.start("33:apilayer.test.js:stop");
  rapl.stop("16:apilayer.test.js:post");
  rapl.stop("33:apilayer.test.js:stop");
  rapl.start("34:apilayer.test.js:start");
  rapl.start("18:apilayer.test.js:ok");
  rapl.stop("34:apilayer.test.js:start");
  rapl.start("35:apilayer.test.js:ok");
  t.ok(fetchMock.called(), 'fetch was called');
  rapl.stop("35:apilayer.test.js:ok");
  rapl.start("36:apilayer.test.js:stop");
  rapl.stop("18:apilayer.test.js:ok");
  rapl.stop("36:apilayer.test.js:stop");
  rapl.start("37:apilayer.test.js:start");
  rapl.start("19:apilayer.test.js:equal");
  rapl.stop("37:apilayer.test.js:start");
  rapl.start("38:apilayer.test.js:equal");
  t.equal(response.tags[0], 'tag1', 'should return the expected response');
  rapl.stop("38:apilayer.test.js:equal");
  rapl.start("39:apilayer.test.js:stop");
  rapl.stop("19:apilayer.test.js:equal");
  rapl.stop("39:apilayer.test.js:stop");
});
rapl.stop("12:apilayer.test.js:test");
rapl.start("41:apilayer.test.js:stop");
rapl.stop("5:apilayer.test.js:test");
rapl.stop("41:apilayer.test.js:stop");
