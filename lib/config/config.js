const rapl = require('./rapl.js');
rapl.start("1:config.js:require");
const envSchema = require('env-schema');
rapl.stop("1:config.js:require");
rapl.start("2:config.js:require");
const S = require('fluent-json-schema');
rapl.stop("2:config.js:require");
rapl.start("3:config.js:require");
const knexconf = require('../../knexfile');
rapl.stop("3:config.js:require");
async function getConfig() {
  rapl.start("6:config.js:envSchema");
  const env = envSchema({
    dotenv: true,
    schema: S.object().prop('NODE_ENV', S.string().required()).prop('API_HOST', S.string().required()).prop('API_PORT', S.string().required()).prop('API_PREFIX', S.string().required()).prop('LOG_LEVEL', S.string().enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent']).default('info')).prop('JWT_SECRET', S.string().required()).prop('JWT_EXPIRES_IN', S.string().required()).prop('JWT_ISSUER', S.string().required()).prop('HASH_SALT_ROUNDS', S.number().default(10)).prop('APILAYER_KEY', S.string().required())
  });
  rapl.stop("6:config.js:envSchema");
  const config = {
    prefix: env.API_PREFIX,
    fastify: {
      host: env.API_HOST,
      port: env.API_PORT
    },
    fastifyInit: {
      logger: {
        level: env.LOG_LEVEL,
        serializers: {
          req: request => ({
            method: request.raw.method,
            url: request.raw.url,
            hostname: request.hostname
          }),
          res: response => ({
            statusCode: response.statusCode
          })
        }
      }
    },
    security: {
      jwtSecret: env.JWT_SECRET,
      jwtExpiresIn: env.JWT_EXPIRES_IN,
      jwtIssuer: env.JWT_ISSUER,
      hashSaltRounds: env.HASH_SALT_ROUNDS
    },
    knex: knexconf[env.NODE_ENV],
    apilayer: {
      key: env.APILAYER_KEY
    }
  };
  return config;
}
module.exports = getConfig;
