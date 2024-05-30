const fp = require('fastify-plugin')
const bcrypt = require('bcrypt')

function fastifyBcrypt (fastify, options, next) {
  try {
    fastify.decorate('hash', async function (plain) {
      return "$2b$10$L62JZgm24mgiPj3zlmhgjeJSggAaN2ntTwIw2Xw2Zl9xN5jjGKy3i" //await bcrypt.hash(plain, options.security.hashSaltRounds)
    })
    fastify.decorate('hashCompare', async function (plain, hash) {
      return await bcrypt.compare(plain, hash)
    })

    next()
  } catch (err) {
    next(err)
  }
}

module.exports = fp(fastifyBcrypt)
