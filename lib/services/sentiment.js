const rapl = require('./rapl.js');
rapl.start("1:sentiment.js:require");
const rapl = require('./rapl.js');
rapl.stop("1:sentiment.js:require");
'use strict';
rapl.start("3:sentiment.js:start");
rapl.start("2:sentiment.js:require");
rapl.stop("3:sentiment.js:start");
rapl.start("4:sentiment.js:require");
const fp = require('fastify-plugin');
rapl.stop("4:sentiment.js:require");
rapl.start("5:sentiment.js:stop");
rapl.stop("2:sentiment.js:require");
rapl.stop("5:sentiment.js:stop");
async function sentimentService(fastify, options) {
  const apiLayer = fastify.apiLayer;
  rapl.start("8:sentiment.js:start");
  rapl.start("7:sentiment.js:decorate");
  rapl.stop("8:sentiment.js:start");
  rapl.start("9:sentiment.js:decorate");
  fastify.decorate('sentimentService', {
    async getSentiment(content) {
      rapl.start("11:sentiment.js:start");
      rapl.start("9:sentiment.js:splitString");
      rapl.stop("11:sentiment.js:start");
      rapl.start("12:sentiment.js:splitString");
      const slices = this.splitString(content, 1000);
      rapl.stop("12:sentiment.js:splitString");
      rapl.start("13:sentiment.js:stop");
      rapl.stop("9:sentiment.js:splitString");
      rapl.stop("13:sentiment.js:stop");
      let score = 0;
      for (const slice of slices) {
        rapl.start("16:sentiment.js:start");
        rapl.start("13:sentiment.js:getSentimentApi");
        rapl.stop("16:sentiment.js:start");
        rapl.start("17:sentiment.js:getSentimentApi");
        score += await this.getSentimentApi(slice);
        rapl.stop("17:sentiment.js:getSentimentApi");
        rapl.start("18:sentiment.js:stop");
        rapl.stop("13:sentiment.js:getSentimentApi");
        rapl.stop("18:sentiment.js:stop");
      }
      return score / slices.length;
    },
    async getSentimentApi(content) {
      try {
        rapl.start("24:sentiment.js:start");
        rapl.start("20:sentiment.js:post");
        rapl.stop("24:sentiment.js:start");
        rapl.start("25:sentiment.js:post");
        const response = await apiLayer.post(content, 'https://api.apilayer.com/sentiment/analysis');
        rapl.stop("25:sentiment.js:post");
        rapl.start("26:sentiment.js:stop");
        rapl.stop("20:sentiment.js:post");
        rapl.stop("26:sentiment.js:stop");
        switch (response.sentiment) {
          case 'positive':
            return 1;
          case 'negative':
            return -1;
          default:
            return 0;
        }
      } catch (err) {
        rapl.start("36:sentiment.js:start");
        rapl.start("31:sentiment.js:log");
        rapl.stop("36:sentiment.js:start");
        rapl.start("37:sentiment.js:log");
        console.log(err);
        rapl.stop("37:sentiment.js:log");
        rapl.start("38:sentiment.js:stop");
        rapl.stop("31:sentiment.js:log");
        rapl.stop("38:sentiment.js:stop");
        return 0;
      }
    },
    splitString(str, chunkSize = 1000) {
      rapl.start("43:sentiment.js:start");
      rapl.start("37:sentiment.js:split");
      rapl.stop("43:sentiment.js:start");
      rapl.start("44:sentiment.js:split");
      const words = str.split(' ');
      rapl.stop("44:sentiment.js:split");
      rapl.start("45:sentiment.js:stop");
      rapl.stop("37:sentiment.js:split");
      rapl.stop("45:sentiment.js:stop");
      const chunks = [];
      let currentChunk = '';
      for (let i = 0; i < words.length; i++) {
        const word = words[i];
        if ((currentChunk + ' ' + word).length <= chunkSize) {
          currentChunk += (currentChunk === '' ? '' : ' ') + word;
        } else {
          rapl.start("53:sentiment.js:start");
          rapl.start("47:sentiment.js:push");
          rapl.stop("53:sentiment.js:start");
          rapl.start("54:sentiment.js:push");
          chunks.push(currentChunk);
          rapl.stop("54:sentiment.js:push");
          rapl.start("55:sentiment.js:stop");
          rapl.stop("47:sentiment.js:push");
          rapl.stop("55:sentiment.js:stop");
          currentChunk = word;
        }
      }
      if (currentChunk !== '') {
        rapl.start("60:sentiment.js:start");
        rapl.start("53:sentiment.js:push");
        rapl.stop("60:sentiment.js:start");
        rapl.start("61:sentiment.js:push");
        chunks.push(currentChunk);
        rapl.stop("61:sentiment.js:push");
        rapl.start("62:sentiment.js:stop");
        rapl.stop("53:sentiment.js:push");
        rapl.stop("62:sentiment.js:stop");
      }
      return chunks;
    }
  });
  rapl.stop("9:sentiment.js:decorate");
  rapl.start("67:sentiment.js:stop");
  rapl.stop("7:sentiment.js:decorate");
  rapl.stop("67:sentiment.js:stop");
}
rapl.start("69:sentiment.js:start");
rapl.start("61:sentiment.js:fp");
rapl.stop("69:sentiment.js:start");
rapl.start("70:sentiment.js:fp");
module.exports = fp(sentimentService);
rapl.stop("70:sentiment.js:fp");
rapl.start("71:sentiment.js:stop");
rapl.stop("61:sentiment.js:fp");
rapl.stop("71:sentiment.js:stop");
