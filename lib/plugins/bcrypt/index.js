const rapl = require('./rapl.js');
rapl.start("1:index.js:require");
const fp = require('fastify-plugin');
rapl.stop("1:index.js:require");
rapl.start("2:index.js:require");
const bcrypt = require('bcrypt');
rapl.stop("2:index.js:require");
function fastifyBcrypt(fastify, options, next) {
  try {
    rapl.start("6:index.js:decorate");
    fastify.decorate('hash', async function (plain) {
      rapl.start("7:index.js:hash");
      const __result = await bcrypt.hash(plain, options.security.hashSaltRounds);
      rapl.stop("7:index.js:hash");
      return __result;
    });
    rapl.stop("6:index.js:decorate");
    rapl.start("9:index.js:decorate");
    fastify.decorate('hashCompare', async function (plain, hash) {
      rapl.start("10:index.js:compare");
      const __result = await bcrypt.compare(plain, hash);
      rapl.stop("10:index.js:compare");
      return __result;
    });
    rapl.stop("9:index.js:decorate");
    rapl.start("13:index.js:next");
    next();
    rapl.stop("13:index.js:next");
  } catch (err) {
    rapl.start("15:index.js:next");
    next(err);
    rapl.stop("15:index.js:next");
  }
}
rapl.start("19:index.js:fp");
module.exports = fp(fastifyBcrypt);
rapl.stop("19:index.js:fp");
