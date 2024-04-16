const rapl = require('./rapl.js');
rapl.start("1:index.js:require");
const fp = require('fastify-plugin');
rapl.stop("1:index.js:require");
rapl.start("2:index.js:require");
const schema = require('./schema');
rapl.stop("2:index.js:require");
rapl.start("3:index.js:require");
const createError = require('http-errors');
rapl.stop("3:index.js:require");
rapl.start("4:index.js:require");
const {isUndefined} = require('knex/lib/util/is');
rapl.stop("4:index.js:require");
async function users(server, options, done) {
  rapl.start("9:index.js:undefined");
  const userModel = require('../../models/users')(server.knex);
  rapl.stop("9:index.js:undefined");
  async function createToken(user, reply) {
    rapl.start("11:index.js:jwtSign");
    const __result = await reply.jwtSign({
      id: user.id,
      username: user.username
    });
    rapl.stop("11:index.js:jwtSign");
    return __result;
  }
  rapl.start("19:index.js:route");
  server.route({
    method: 'POST',
    path: options.prefix + 'users/login',
    schema: schema.login,
    handler: onLogin
  });
  rapl.stop("19:index.js:route");
  async function onLogin(req, reply) {
    rapl.start("26:index.js:getUserByEmail");
    const user = await userModel.getUserByEmail(req.body.user.email);
    rapl.stop("26:index.js:getUserByEmail");
    if (!isUndefined(user)) {
      if (await server.hashCompare(req.body.user.password, user.password)) {
        rapl.start("31:index.js:createToken");
        user.token = await createToken(user, reply);
        rapl.stop("31:index.js:createToken");
        return {
          user
        };
      }
    }
    rapl.start("35:index.js:Unauthorized");
    const __result = createError.Unauthorized('Wrong credentials');
    rapl.stop("35:index.js:Unauthorized");
    return __result;
  }
  rapl.start("41:index.js:route");
  server.route({
    method: 'POST',
    path: options.prefix + 'users',
    schema: schema.register,
    handler: onRegister
  });
  rapl.stop("41:index.js:route");
  async function onRegister(req, reply) {
    if (isUndefined(await userModel.getUserByEmail(req.body.user.email)) && isUndefined(await userModel.getUserByUsername(req.body.user.username))) {
      rapl.start("50:index.js:hash");
      req.body.user.password = await server.hash(req.body.user.password);
      rapl.stop("50:index.js:hash");
      rapl.start("51:index.js:registerUser");
      const user = await userModel.registerUser(req.body.user);
      rapl.stop("51:index.js:registerUser");
      rapl.start("52:index.js:createToken");
      user.token = await createToken(user, reply);
      rapl.stop("52:index.js:createToken");
      return {
        user
      };
    }
    rapl.start("55:index.js:send");
    reply.code(409).send({
      message: 'duplicate user'
    });
    rapl.stop("55:index.js:send");
  }
  rapl.start("60:index.js:route");
  server.route({
    method: 'GET',
    path: options.prefix + 'user',
    onRequest: [server.authenticate],
    schema: schema.get,
    handler: onGet
  });
  rapl.stop("60:index.js:route");
  async function onGet(req, reply) {
    rapl.start("68:index.js:getUserById");
    let user = await userModel.getUserById(req.user.id);
    rapl.stop("68:index.js:getUserById");
    if (!isUndefined(user)) {
      rapl.start("70:index.js:lookupToken");
      const token = await server.jwt.lookupToken(req);
      rapl.stop("70:index.js:lookupToken");
      user = {
        ...user,
        token
      };
      return {
        user
      };
    } else {
      rapl.start("74:index.js:send");
      reply.code(404).send({
        message: 'not found'
      });
      rapl.stop("74:index.js:send");
    }
  }
  rapl.start("80:index.js:route");
  server.route({
    method: 'PUT',
    path: options.prefix + 'user',
    onRequest: [server.authenticate],
    schema: schema.update,
    handler: onUpdate
  });
  rapl.stop("80:index.js:route");
  async function onUpdate(req, reply) {
    let user = req.body.user;
    user.id = req.user.id;
    rapl.start("90:index.js:getUserById");
    const userold = await userModel.getUserById(user.id);
    rapl.stop("90:index.js:getUserById");
    if (user.password) {
      rapl.start("92:index.js:hash");
      user.password = await server.hash(user.password);
      rapl.stop("92:index.js:hash");
    }
    rapl.start("94:index.js:updateUser");
    await userModel.updateUser(user);
    rapl.stop("94:index.js:updateUser");
    rapl.start("95:index.js:getUserById");
    user = await userModel.getUserById(user.id);
    rapl.stop("95:index.js:getUserById");
    if (!isUndefined(userold)) {
      rapl.start("97:index.js:createToken");
      user.token = await createToken(user, reply);
      rapl.stop("97:index.js:createToken");
      return {
        user
      };
    } else {
      rapl.start("100:index.js:send");
      reply.code(404).send({
        message: 'not found'
      });
      rapl.stop("100:index.js:send");
    }
  }
  rapl.start("106:index.js:done");
  done();
  rapl.stop("106:index.js:done");
}
rapl.start("108:index.js:fp");
module.exports = fp(users);
rapl.stop("108:index.js:fp");
