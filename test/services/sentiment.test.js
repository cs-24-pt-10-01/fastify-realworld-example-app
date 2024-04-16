const rapl = require('./rapl.js');
rapl.start("1:sentiment.test.js:require");
const test = require('tap').test;
rapl.stop("1:sentiment.test.js:require");
rapl.start("2:sentiment.test.js:require");
const sentimentService = require('../../lib/services/sentiment');
rapl.stop("2:sentiment.test.js:require");
rapl.start("4:sentiment.test.js:test");
test('getSentiment returns the expected score', async t => {
  let myservice;
  const fastify = {
    decorate: (name, service) => {
      myservice = service;
    },
    apiLayer: {
      post: () => {
        return {
          sentiment: 'positive'
        };
      }
    }
  };
  rapl.start("17:sentiment.test.js:sentimentService");
  await sentimentService(fastify, {});
  rapl.stop("17:sentiment.test.js:sentimentService");
  rapl.start("19:sentiment.test.js:getSentiment");
  const response = await myservice.getSentiment('Some content');
  rapl.stop("19:sentiment.test.js:getSentiment");
  rapl.start("20:sentiment.test.js:equal");
  t.equal(response, 1, 'should return the expected score');
  rapl.stop("20:sentiment.test.js:equal");
});
rapl.stop("4:sentiment.test.js:test");
rapl.start("23:sentiment.test.js:test");
test('splitString returns correct chunks number with long text', async t => {
  let myservice;
  const fastify = {
    decorate: (name, service) => {
      myservice = service;
    }
  };
  rapl.start("31:sentiment.test.js:sentimentService");
  await sentimentService(fastify, {});
  rapl.stop("31:sentiment.test.js:sentimentService");
  rapl.start("33:sentiment.test.js:splitString");
  const response = await myservice.splitString(('Some content ').repeat(10), 100);
  rapl.stop("33:sentiment.test.js:splitString");
  rapl.start("34:sentiment.test.js:equal");
  t.equal(response.length, 2, 'should return the expected number of chunks');
  rapl.stop("34:sentiment.test.js:equal");
});
rapl.stop("23:sentiment.test.js:test");
rapl.start("37:sentiment.test.js:test");
test('getSentimentApi returns 0 on apiLayer error', async t => {
  let myservice;
  const fastify = {
    decorate: (name, service) => {
      myservice = service;
    },
    rapidApi: {
      post: () => {
        throw new Error('Error');
      }
    }
  };
  rapl.start("50:sentiment.test.js:sentimentService");
  await sentimentService(fastify, {});
  rapl.stop("50:sentiment.test.js:sentimentService");
  rapl.start("52:sentiment.test.js:getSentimentApi");
  const response = await myservice.getSentimentApi('Some content');
  rapl.stop("52:sentiment.test.js:getSentimentApi");
  rapl.start("53:sentiment.test.js:equal");
  t.equal(response, 0, 'should return 0 on error');
  rapl.stop("53:sentiment.test.js:equal");
});
rapl.stop("37:sentiment.test.js:test");
