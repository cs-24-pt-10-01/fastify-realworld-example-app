const rapl = require('./rapl.js');
rapl.start("1:index.js:require");
const fp = require('fastify-plugin');
rapl.stop("1:index.js:require");
rapl.start("2:index.js:require");
const {Unauthorized} = require('http-errors');
rapl.stop("2:index.js:require");
rapl.start("4:index.js:fp");
module.exports = fp(async function (fastify, opts) {
  rapl.start("5:index.js:register");
  fastify.register(require('@fastify/jwt'), {
    secret: opts.security.jwtSecret,
    expiresIn: opts.security.jwtExpiresIn,
    issuer: opts.security.jwtIssuer,
    verify: {
      extractToken: req => {
        rapl.start("11:index.js:replace");
        const __result = req.headers.authorization.replace(/^Token /, '');
        rapl.stop("11:index.js:replace");
        return __result;
      }
    }
  });
  rapl.stop("5:index.js:register");
  rapl.start("16:index.js:decorate");
  fastify.decorate('authenticate', async function (req, reply) {
    try {
      rapl.start("19:index.js:jwtVerify");
      await req.jwtVerify();
      rapl.stop("19:index.js:jwtVerify");
    } catch (err) {
      throw new Unauthorized();
    }
  });
  rapl.stop("16:index.js:decorate");
  rapl.start("25:index.js:decorate");
  fastify.decorate('authenticate_optional', async function (req, reply) {
    try {
      rapl.start("28:index.js:jwtVerify");
      await req.jwtVerify();
      rapl.stop("28:index.js:jwtVerify");
    } catch (err) {}
  });
  rapl.stop("25:index.js:decorate");
});
rapl.stop("4:index.js:fp");
