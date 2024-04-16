const rapl = require('./rapl.js');
rapl.start("1:setup-server.js:require");
const getConfig = require('../lib/config/config');
rapl.stop("1:setup-server.js:require");
rapl.start("2:setup-server.js:require");
const startServer = require('../lib/server');
rapl.stop("2:setup-server.js:require");
rapl.start("4:setup-server.js:register");
const start = async () => {
  rapl.start("5:setup-server.js:on");
  process.on('unhandledRejection', err => {
    rapl.start("6:setup-server.js:error");
    console.error(err);
    rapl.stop("6:setup-server.js:error");
    rapl.start("7:setup-server.js:exit");
    process.exit(1);
    rapl.stop("7:setup-server.js:exit");
  });
  rapl.stop("5:setup-server.js:on");
  rapl.start("9:setup-server.js:getConfig");
  const config = await getConfig();
  rapl.stop("9:setup-server.js:getConfig");
  config.fastifyInit.logger.level = 'silent';
  rapl.start("11:setup-server.js:undefined");
  const server = require('fastify')(config.fastifyInit);
  rapl.stop("11:setup-server.js:undefined");
  rapl.start("12:setup-server.js:register");
  server.register(startServer, config);
  rapl.stop("12:setup-server.js:register");
  return server;
};
rapl.stop("4:setup-server.js:register");
module.exports = start;
