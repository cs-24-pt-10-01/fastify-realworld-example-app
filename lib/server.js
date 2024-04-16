const rapl = require('./rapl.js');
rapl.start("1:server.js:require");
const rapl = require('./rapl.js');
rapl.stop("1:server.js:require");
rapl.start("2:server.js:start");
rapl.start("1:server.js:require");
rapl.stop("2:server.js:start");
rapl.start("3:server.js:require");
const path = require('path');
rapl.stop("3:server.js:require");
rapl.start("4:server.js:stop");
rapl.stop("1:server.js:require");
rapl.stop("4:server.js:stop");
rapl.start("5:server.js:start");
rapl.start("2:server.js:require");
rapl.stop("5:server.js:start");
rapl.start("6:server.js:require");
const fp = require('fastify-plugin');
rapl.stop("6:server.js:require");
rapl.start("7:server.js:stop");
rapl.stop("2:server.js:require");
rapl.stop("7:server.js:stop");
rapl.start("8:server.js:start");
rapl.start("3:server.js:require");
rapl.stop("8:server.js:start");
rapl.start("9:server.js:require");
const autoLoad = require('@fastify/autoload');
rapl.stop("9:server.js:require");
rapl.start("10:server.js:stop");
rapl.stop("3:server.js:require");
rapl.stop("10:server.js:stop");
rapl.start("11:server.js:start");
rapl.start("4:server.js:require");
rapl.stop("11:server.js:start");
rapl.start("12:server.js:require");
const cors = require('@fastify/cors');
rapl.stop("12:server.js:require");
rapl.start("13:server.js:stop");
rapl.stop("4:server.js:require");
rapl.stop("13:server.js:stop");
async function plugin(server, config) {
  rapl.start("15:server.js:start");
  rapl.start("17:server.js:register");
  rapl.stop("15:server.js:start");
  rapl.start("16:server.js:register");
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
  rapl.stop("16:server.js:register");
  rapl.start("27:server.js:stop");
  rapl.stop("17:server.js:register");
  rapl.stop("27:server.js:stop");
  rapl.start("28:server.js:start");
  rapl.start("33:server.js:setErrorHandler");
  rapl.stop("28:server.js:start");
  rapl.start("29:server.js:setErrorHandler");
  server.setErrorHandler((err, req, res) => {
    rapl.start("30:server.js:start");
    rapl.start("34:server.js:error");
    rapl.stop("30:server.js:start");
    rapl.start("31:server.js:error");
    req.log.error({
      req,
      res,
      err
    }, err && err.message);
    rapl.stop("31:server.js:error");
    rapl.start("36:server.js:stop");
    rapl.stop("34:server.js:error");
    rapl.stop("36:server.js:stop");
    err.message = 'An error has occurred';
    rapl.start("38:server.js:start");
    rapl.start("36:server.js:send");
    rapl.stop("38:server.js:start");
    rapl.start("39:server.js:send");
    res.send(err);
    rapl.stop("39:server.js:send");
    rapl.start("40:server.js:stop");
    rapl.stop("36:server.js:send");
    rapl.stop("40:server.js:stop");
  });
  rapl.stop("29:server.js:setErrorHandler");
  rapl.start("42:server.js:stop");
  rapl.stop("33:server.js:setErrorHandler");
  rapl.stop("42:server.js:stop");
  rapl.start("43:server.js:start");
  rapl.start("41:server.js:addHook");
  rapl.stop("43:server.js:start");
  rapl.start("44:server.js:addHook");
  server.addHook('onRequest', async (req, res) => {
    if (req.headers['content-type'] === 'application/json' && req.headers['content-length'] === '0') {
      req.headers['content-type'] = 'empty';
    }
  });
  rapl.stop("44:server.js:addHook");
  rapl.start("49:server.js:stop");
  rapl.stop("41:server.js:addHook");
  rapl.stop("49:server.js:stop");
  rapl.start("50:server.js:start");
  rapl.start("46:server.js:addContentTypeParser");
  rapl.stop("50:server.js:start");
  rapl.start("51:server.js:addContentTypeParser");
  server.addContentTypeParser('empty', (request, body, done) => {
    rapl.start("52:server.js:start");
    rapl.start("47:server.js:done");
    rapl.stop("52:server.js:start");
    rapl.start("53:server.js:done");
    done(null, {});
    rapl.stop("53:server.js:done");
    rapl.start("54:server.js:stop");
    rapl.stop("47:server.js:done");
    rapl.stop("54:server.js:stop");
  });
  rapl.stop("51:server.js:addContentTypeParser");
  rapl.start("56:server.js:stop");
  rapl.stop("46:server.js:addContentTypeParser");
  rapl.stop("56:server.js:stop");
}
rapl.start("58:server.js:start");
rapl.start("51:server.js:fp");
rapl.stop("58:server.js:start");
rapl.start("59:server.js:fp");
module.exports = fp(plugin);
rapl.stop("59:server.js:fp");
rapl.start("60:server.js:stop");
rapl.stop("51:server.js:fp");
rapl.stop("60:server.js:stop");
