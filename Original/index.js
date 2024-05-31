const process = require('node:process')
const rapl = require('./rapl.js')
rapl.start("full");

const getConfig = require('./lib/config/config')
const startServer = require('./lib/server')

const main = async () => {
  process.on('unhandledRejection', (err) => {
    console.error(err)
    process.exit(1)
  })
  const config = await getConfig()

  const server = require('fastify')(config.fastifyInit)
  server.register(startServer, config)

  const address = await server.listen(config.fastify)
  server.log.info(`Server running at: ${address}`)
}

main()

process.on("exit", () => {
  rapl.stop("full");
})