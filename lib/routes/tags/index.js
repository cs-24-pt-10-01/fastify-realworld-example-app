const rapl = require('./rapl.js');
rapl.start("1:index.js:require");
const fp = require('fastify-plugin');
rapl.stop("1:index.js:require");
rapl.start("2:index.js:require");
const schema = require('./schema');
rapl.stop("2:index.js:require");
async function tags(server, options, done) {
  rapl.start("7:index.js:undefined");
  const tagsModel = require('../../models/tags')(server.knex);
  rapl.stop("7:index.js:undefined");
  rapl.start("9:index.js:route");
  server.route({
    method: 'GET',
    path: options.prefix + 'tags',
    schema: schema.getTags,
    handler: onGetTags
  });
  rapl.stop("9:index.js:route");
  async function onGetTags(req, reply) {
    rapl.start("16:index.js:getTags");
    const tags = await tagsModel.getTags();
    rapl.stop("16:index.js:getTags");
    return {
      tags
    };
  }
  rapl.start("20:index.js:done");
  done();
  rapl.stop("20:index.js:done");
}
rapl.start("23:index.js:fp");
module.exports = fp(tags);
rapl.stop("23:index.js:fp");
