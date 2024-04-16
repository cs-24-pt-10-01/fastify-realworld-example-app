const rapl = require('./rapl.js');
rapl.start("1:sentiment.test.js:require");
const rapl = require('./rapl.js');
rapl.stop("1:sentiment.test.js:require");
rapl.start("2:sentiment.test.js:start");
rapl.start("1:sentiment.test.js:require");
rapl.stop("2:sentiment.test.js:start");
rapl.start("3:sentiment.test.js:require");
const test = require('tap').test;
rapl.stop("3:sentiment.test.js:require");
rapl.start("4:sentiment.test.js:stop");
rapl.stop("1:sentiment.test.js:require");
rapl.stop("4:sentiment.test.js:stop");
rapl.start("5:sentiment.test.js:start");
rapl.start("2:sentiment.test.js:require");
rapl.stop("5:sentiment.test.js:start");
rapl.start("6:sentiment.test.js:require");
const sentimentService = require('../../lib/services/sentiment');
rapl.stop("6:sentiment.test.js:require");
rapl.start("7:sentiment.test.js:stop");
rapl.stop("2:sentiment.test.js:require");
rapl.stop("7:sentiment.test.js:stop");
rapl.start("8:sentiment.test.js:start");
rapl.start("4:sentiment.test.js:test");
rapl.stop("8:sentiment.test.js:start");
rapl.start("9:sentiment.test.js:test");
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
  rapl.start("23:sentiment.test.js:start");
  rapl.start("17:sentiment.test.js:sentimentService");
  rapl.stop("23:sentiment.test.js:start");
  rapl.start("24:sentiment.test.js:sentimentService");
  await sentimentService(fastify, {});
  rapl.stop("24:sentiment.test.js:sentimentService");
  rapl.start("25:sentiment.test.js:stop");
  rapl.stop("17:sentiment.test.js:sentimentService");
  rapl.stop("25:sentiment.test.js:stop");
  rapl.start("26:sentiment.test.js:start");
  rapl.start("19:sentiment.test.js:getSentiment");
  rapl.stop("26:sentiment.test.js:start");
  rapl.start("27:sentiment.test.js:getSentiment");
  const response = await myservice.getSentiment('Some content');
  rapl.stop("27:sentiment.test.js:getSentiment");
  rapl.start("28:sentiment.test.js:stop");
  rapl.stop("19:sentiment.test.js:getSentiment");
  rapl.stop("28:sentiment.test.js:stop");
  rapl.start("29:sentiment.test.js:start");
  rapl.start("20:sentiment.test.js:equal");
  rapl.stop("29:sentiment.test.js:start");
  rapl.start("30:sentiment.test.js:equal");
  t.equal(response, 1, 'should return the expected score');
  rapl.stop("30:sentiment.test.js:equal");
  rapl.start("31:sentiment.test.js:stop");
  rapl.stop("20:sentiment.test.js:equal");
  rapl.stop("31:sentiment.test.js:stop");
});
rapl.stop("9:sentiment.test.js:test");
rapl.start("33:sentiment.test.js:stop");
rapl.stop("4:sentiment.test.js:test");
rapl.stop("33:sentiment.test.js:stop");
rapl.start("34:sentiment.test.js:start");
rapl.start("23:sentiment.test.js:test");
rapl.stop("34:sentiment.test.js:start");
rapl.start("35:sentiment.test.js:test");
test('splitString returns correct chunks number with long text', async t => {
  let myservice;
  const fastify = {
    decorate: (name, service) => {
      myservice = service;
    }
  };
  rapl.start("42:sentiment.test.js:start");
  rapl.start("31:sentiment.test.js:sentimentService");
  rapl.stop("42:sentiment.test.js:start");
  rapl.start("43:sentiment.test.js:sentimentService");
  await sentimentService(fastify, {});
  rapl.stop("43:sentiment.test.js:sentimentService");
  rapl.start("44:sentiment.test.js:stop");
  rapl.stop("31:sentiment.test.js:sentimentService");
  rapl.stop("44:sentiment.test.js:stop");
  rapl.start("45:sentiment.test.js:start");
  rapl.start("33:sentiment.test.js:splitString");
  rapl.stop("45:sentiment.test.js:start");
  rapl.start("46:sentiment.test.js:splitString");
  const response = await myservice.splitString(('Some content ').repeat(10), 100);
  rapl.stop("46:sentiment.test.js:splitString");
  rapl.start("47:sentiment.test.js:stop");
  rapl.stop("33:sentiment.test.js:splitString");
  rapl.stop("47:sentiment.test.js:stop");
  rapl.start("48:sentiment.test.js:start");
  rapl.start("34:sentiment.test.js:equal");
  rapl.stop("48:sentiment.test.js:start");
  rapl.start("49:sentiment.test.js:equal");
  t.equal(response.length, 2, 'should return the expected number of chunks');
  rapl.stop("49:sentiment.test.js:equal");
  rapl.start("50:sentiment.test.js:stop");
  rapl.stop("34:sentiment.test.js:equal");
  rapl.stop("50:sentiment.test.js:stop");
});
rapl.stop("35:sentiment.test.js:test");
rapl.start("52:sentiment.test.js:stop");
rapl.stop("23:sentiment.test.js:test");
rapl.stop("52:sentiment.test.js:stop");
rapl.start("53:sentiment.test.js:start");
rapl.start("37:sentiment.test.js:test");
rapl.stop("53:sentiment.test.js:start");
rapl.start("54:sentiment.test.js:test");
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
  rapl.start("66:sentiment.test.js:start");
  rapl.start("50:sentiment.test.js:sentimentService");
  rapl.stop("66:sentiment.test.js:start");
  rapl.start("67:sentiment.test.js:sentimentService");
  await sentimentService(fastify, {});
  rapl.stop("67:sentiment.test.js:sentimentService");
  rapl.start("68:sentiment.test.js:stop");
  rapl.stop("50:sentiment.test.js:sentimentService");
  rapl.stop("68:sentiment.test.js:stop");
  rapl.start("69:sentiment.test.js:start");
  rapl.start("52:sentiment.test.js:getSentimentApi");
  rapl.stop("69:sentiment.test.js:start");
  rapl.start("70:sentiment.test.js:getSentimentApi");
  const response = await myservice.getSentimentApi('Some content');
  rapl.stop("70:sentiment.test.js:getSentimentApi");
  rapl.start("71:sentiment.test.js:stop");
  rapl.stop("52:sentiment.test.js:getSentimentApi");
  rapl.stop("71:sentiment.test.js:stop");
  rapl.start("72:sentiment.test.js:start");
  rapl.start("53:sentiment.test.js:equal");
  rapl.stop("72:sentiment.test.js:start");
  rapl.start("73:sentiment.test.js:equal");
  t.equal(response, 0, 'should return 0 on error');
  rapl.stop("73:sentiment.test.js:equal");
  rapl.start("74:sentiment.test.js:stop");
  rapl.stop("53:sentiment.test.js:equal");
  rapl.stop("74:sentiment.test.js:stop");
});
rapl.stop("54:sentiment.test.js:test");
rapl.start("76:sentiment.test.js:stop");
rapl.stop("37:sentiment.test.js:test");
rapl.stop("76:sentiment.test.js:stop");
