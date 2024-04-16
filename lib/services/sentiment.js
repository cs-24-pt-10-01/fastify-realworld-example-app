const rapl = require('./rapl.js');
'use strict';
rapl.start("2:sentiment.js:require");
const fp = require('fastify-plugin');
rapl.stop("2:sentiment.js:require");
async function sentimentService(fastify, options) {
  const apiLayer = fastify.apiLayer;
  rapl.start("7:sentiment.js:decorate");
  fastify.decorate('sentimentService', {
    async getSentiment(content) {
      rapl.start("9:sentiment.js:splitString");
      const slices = this.splitString(content, 1000);
      rapl.stop("9:sentiment.js:splitString");
      let score = 0;
      for (const slice of slices) {
        rapl.start("13:sentiment.js:getSentimentApi");
        score += await this.getSentimentApi(slice);
        rapl.stop("13:sentiment.js:getSentimentApi");
      }
      return score / slices.length;
    },
    async getSentimentApi(content) {
      try {
        rapl.start("20:sentiment.js:post");
        const response = await apiLayer.post(content, 'https://api.apilayer.com/sentiment/analysis');
        rapl.stop("20:sentiment.js:post");
        switch (response.sentiment) {
          case 'positive':
            return 1;
          case 'negative':
            return -1;
          default:
            return 0;
        }
      } catch (err) {
        rapl.start("31:sentiment.js:log");
        console.log(err);
        rapl.stop("31:sentiment.js:log");
        return 0;
      }
    },
    splitString(str, chunkSize = 1000) {
      rapl.start("37:sentiment.js:split");
      const words = str.split(' ');
      rapl.stop("37:sentiment.js:split");
      const chunks = [];
      let currentChunk = '';
      for (let i = 0; i < words.length; i++) {
        const word = words[i];
        if ((currentChunk + ' ' + word).length <= chunkSize) {
          currentChunk += (currentChunk === '' ? '' : ' ') + word;
        } else {
          rapl.start("47:sentiment.js:push");
          chunks.push(currentChunk);
          rapl.stop("47:sentiment.js:push");
          currentChunk = word;
        }
      }
      if (currentChunk !== '') {
        rapl.start("53:sentiment.js:push");
        chunks.push(currentChunk);
        rapl.stop("53:sentiment.js:push");
      }
      return chunks;
    }
  });
  rapl.stop("7:sentiment.js:decorate");
}
rapl.start("61:sentiment.js:fp");
module.exports = fp(sentimentService);
rapl.stop("61:sentiment.js:fp");
