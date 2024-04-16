const rapl = require('./rapl.js');
'use strict';
rapl.start("3:index.js:require");
const fp = require('fastify-plugin');
rapl.stop("3:index.js:require");
rapl.start("4:index.js:require");
const knex = require('knex');
rapl.stop("4:index.js:require");
async function fastifyKnexJS(fastify, options, next) {
  try {
    rapl.start("8:index.js:knex");
    const handler = knex(options.knex);
    rapl.stop("8:index.js:knex");
    rapl.start("11:index.js:latest");
    await handler.migrate.latest();
    rapl.stop("11:index.js:latest");
    rapl.start("12:index.js:run");
    await handler.seed.run();
    rapl.stop("12:index.js:run");
    rapl.start("14:index.js:addHook");
    fastify.decorate('knex', handler).addHook('onClose', (instance, done) => {
      if (instance.knex === handler) {
        rapl.start("19:index.js:destroy");
        instance.knex.destroy();
        rapl.stop("19:index.js:destroy");
        delete instance.knex;
      }
      rapl.start("23:index.js:done");
      done();
      rapl.stop("23:index.js:done");
    });
    rapl.stop("14:index.js:addHook");
    rapl.start("26:index.js:next");
    next();
    rapl.stop("26:index.js:next");
  } catch (err) {
    rapl.start("28:index.js:next");
    next(err);
    rapl.stop("28:index.js:next");
  }
}
rapl.start("32:index.js:fp");
module.exports = fp(fastifyKnexJS, '>=0.30.0');
rapl.stop("32:index.js:fp");
