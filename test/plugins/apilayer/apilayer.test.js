const rapl = require('./rapl.js');
rapl.start("1:apilayer.test.js:require");
const test = require('tap').test;
rapl.stop("1:apilayer.test.js:require");
rapl.start("2:apilayer.test.js:require");
const apiLayer = require('../../../lib/plugins/apilayer');
rapl.stop("2:apilayer.test.js:require");
rapl.start("3:apilayer.test.js:require");
const fetchMock = require('fetch-mock');
rapl.stop("3:apilayer.test.js:require");
rapl.start("5:apilayer.test.js:test");
test('post returns the expected response', async t => {
  let myservice;
  const fastify = {
    decorate: (name, service) => {
      myservice = service;
    }
  };
  rapl.start("13:apilayer.test.js:apiLayer");
  await apiLayer(fastify, {
    apilayer: {
      key: '123'
    }
  });
  rapl.stop("13:apilayer.test.js:apiLayer");
  rapl.start("15:apilayer.test.js:mock");
  fetchMock.mock('*', {
    tags: ['tag1', 'tag2']
  });
  rapl.stop("15:apilayer.test.js:mock");
  rapl.start("16:apilayer.test.js:post");
  const response = await myservice.post('Some content', 'host', 'url');
  rapl.stop("16:apilayer.test.js:post");
  rapl.start("18:apilayer.test.js:ok");
  t.ok(fetchMock.called(), 'fetch was called');
  rapl.stop("18:apilayer.test.js:ok");
  rapl.start("19:apilayer.test.js:equal");
  t.equal(response.tags[0], 'tag1', 'should return the expected response');
  rapl.stop("19:apilayer.test.js:equal");
});
rapl.stop("5:apilayer.test.js:test");
