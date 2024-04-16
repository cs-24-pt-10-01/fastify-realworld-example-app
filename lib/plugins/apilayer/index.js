const rapl = require('./rapl.js');
'use strict';
rapl.start("2:index.js:require");
const fp = require('fastify-plugin');
rapl.stop("2:index.js:require");
async function apiLayer(fastify, options) {
  const apiKey = options.apilayer.key;
  rapl.start("7:index.js:decorate");
  fastify.decorate('apiLayer', {
    async post22(content, url) {
      const raw = 'You have done excellent work, and well done.';
      const requestOptions = {
        method: 'POST',
        redirect: 'follow',
        headers: {
          'content-type': 'text/plain',
          apikey: '6EwQsWNDR4AoSvFCHAsFUhmxkuALN13F'
        },
        body: raw
      };
      rapl.start("23:index.js:fetch");
      const response = await fetch(url, requestOptions);
      rapl.stop("23:index.js:fetch");
      if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
      }
      rapl.start("28:index.js:json");
      const __result = await response.json();
      rapl.stop("28:index.js:json");
      return __result;
    },
    async post(content, url) {
      const options = {
        method: 'POST',
        redirect: 'follow',
        headers: {
          'content-type': 'text/plain',
          apikey: apiKey
        },
        body: content
      };
      rapl.start("41:index.js:fetch");
      const response = await fetch(url, options);
      rapl.stop("41:index.js:fetch");
      if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
      }
      rapl.start("46:index.js:json");
      const __result = await response.json();
      rapl.stop("46:index.js:json");
      return __result;
    }
  });
  rapl.stop("7:index.js:decorate");
}
rapl.start("52:index.js:fp");
module.exports = fp(apiLayer);
rapl.stop("52:index.js:fp");
