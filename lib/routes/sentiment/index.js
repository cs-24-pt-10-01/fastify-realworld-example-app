const rapl = require('./rapl.js');
rapl.start("1:index.js:require");
const fp = require('fastify-plugin');
rapl.stop("1:index.js:require");
rapl.start("2:index.js:require");
const schema = require('./schema');
rapl.stop("2:index.js:require");
async function comments(server, options, done) {
  const sentimentService = server.sentimentService;
  rapl.start("7:index.js:route");
  server.route({
    method: 'POST',
    path: options.prefix + 'sentiment/score',
    onRequest: [server.authenticate_optional],
    schema: schema.sentiment,
    handler: onSentimentScore
  });
  rapl.stop("7:index.js:route");
  async function onSentimentScore(req, reply) {
    rapl.start("15:index.js:getSentiment");
    const score = await sentimentService.getSentiment(req.body.content);
    rapl.stop("15:index.js:getSentiment");
    return {
      score
    };
  }
  rapl.start("19:index.js:done");
  done();
  rapl.stop("19:index.js:done");
}
rapl.start("22:index.js:fp");
module.exports = fp(comments);
rapl.stop("22:index.js:fp");
