const rapl = require('./rapl.js');
rapl.start("1:index.js:require");
const rapl = require('./rapl.js');
rapl.stop("1:index.js:require");
rapl.start("2:index.js:start");
rapl.start("1:index.js:require");
rapl.stop("2:index.js:start");
rapl.start("3:index.js:require");
const fp = require('fastify-plugin');
rapl.stop("3:index.js:require");
rapl.start("4:index.js:stop");
rapl.stop("1:index.js:require");
rapl.stop("4:index.js:stop");
rapl.start("5:index.js:start");
rapl.start("2:index.js:require");
rapl.stop("5:index.js:start");
rapl.start("6:index.js:require");
const schema = require('./schema');
rapl.stop("6:index.js:require");
rapl.start("7:index.js:stop");
rapl.stop("2:index.js:require");
rapl.stop("7:index.js:stop");
async function tags(server, options, done) {
  rapl.start("9:index.js:start");
  rapl.start("7:index.js:undefined");
  rapl.stop("9:index.js:start");
  rapl.start("10:index.js:undefined");
  const tagsModel = require('../../models/tags')(server.knex);
  rapl.stop("10:index.js:undefined");
  rapl.start("11:index.js:stop");
  rapl.stop("7:index.js:undefined");
  rapl.stop("11:index.js:stop");
  rapl.start("12:index.js:start");
  rapl.start("9:index.js:route");
  rapl.stop("12:index.js:start");
  rapl.start("13:index.js:route");
  server.route({
    method: 'GET',
    path: options.prefix + 'tags',
    schema: schema.getTags,
    handler: onGetTags
  });
  rapl.stop("13:index.js:route");
  rapl.start("19:index.js:stop");
  rapl.stop("9:index.js:route");
  rapl.stop("19:index.js:stop");
  async function onGetTags(req, reply) {
    rapl.start("21:index.js:start");
    rapl.start("16:index.js:getTags");
    rapl.stop("21:index.js:start");
    rapl.start("22:index.js:getTags");
    const tags = await tagsModel.getTags();
    rapl.stop("22:index.js:getTags");
    rapl.start("23:index.js:stop");
    rapl.stop("16:index.js:getTags");
    rapl.stop("23:index.js:stop");
    return {
      tags
    };
  }
  rapl.start("28:index.js:start");
  rapl.start("20:index.js:done");
  rapl.stop("28:index.js:start");
  rapl.start("29:index.js:done");
  done();
  rapl.stop("29:index.js:done");
  rapl.start("30:index.js:stop");
  rapl.stop("20:index.js:done");
  rapl.stop("30:index.js:stop");
}
rapl.start("32:index.js:start");
rapl.start("23:index.js:fp");
rapl.stop("32:index.js:start");
rapl.start("33:index.js:fp");
module.exports = fp(tags);
rapl.stop("33:index.js:fp");
rapl.start("34:index.js:stop");
rapl.stop("23:index.js:fp");
rapl.stop("34:index.js:stop");
