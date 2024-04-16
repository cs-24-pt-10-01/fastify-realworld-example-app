const rapl = require('./rapl.js');
rapl.start("1:server.js:require");
const path = require('path');
rapl.stop("1:server.js:require");
rapl.start("2:server.js:require");
const fp = require('fastify-plugin');
rapl.stop("2:server.js:require");
rapl.start("3:server.js:require");
const autoLoad = require('@fastify/autoload');
rapl.stop("3:server.js:require");
rapl.start("4:server.js:require");
const cors = require('@fastify/cors');
rapl.stop("4:server.js:require");
async function plugin(server, config) {
  rapl.start("17:server.js:register");
  server.register(cors, {}).register(autoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: config
  }).register(autoLoad, {
    dir: path.join(__dirname, 'services'),
    options: config
  }).register(autoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: config,
    dirNameRoutePrefix: false
  });
  rapl.stop("17:server.js:register");
  rapl.start("33:server.js:setErrorHandler");
  server.setErrorHandler((err, req, res) => {
    rapl.start("34:server.js:error");
    req.log.error({
      req,
      res,
      err
    }, err && err.message);
    rapl.stop("34:server.js:error");
    err.message = 'An error has occurred';
    rapl.start("36:server.js:send");
    res.send(err);
    rapl.stop("36:server.js:send");
  });
  rapl.stop("33:server.js:setErrorHandler");
  rapl.start("41:server.js:addHook");
  server.addHook('onRequest', async (req, res) => {
    if (req.headers['content-type'] === 'application/json' && req.headers['content-length'] === '0') {
      req.headers['content-type'] = 'empty';
    }
  });
  rapl.stop("41:server.js:addHook");
  rapl.start("46:server.js:addContentTypeParser");
  server.addContentTypeParser('empty', (request, body, done) => {
    rapl.start("47:server.js:done");
    done(null, {});
    rapl.stop("47:server.js:done");
  });
  rapl.stop("46:server.js:addContentTypeParser");
}
rapl.start("51:server.js:fp");
module.exports = fp(plugin);
rapl.stop("51:server.js:fp");
