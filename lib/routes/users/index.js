const rapl = require('./rapl.js');
rapl.start("1:index.js:require");
const rapl = require('./rapl.js');
rapl.stop("1:index.js:require");
rapl.start("2:index.js:start");
rapl.start("1:index.js:require");
rapl.stop("2:index.js:start");
rapl.start("3:index.js:require");
const fp = require('fastify-plugin');
rapl.stop("3:index.js:require");
rapl.start("4:index.js:stop");
rapl.stop("1:index.js:require");
rapl.stop("4:index.js:stop");
rapl.start("5:index.js:start");
rapl.start("2:index.js:require");
rapl.stop("5:index.js:start");
rapl.start("6:index.js:require");
const schema = require('./schema');
rapl.stop("6:index.js:require");
rapl.start("7:index.js:stop");
rapl.stop("2:index.js:require");
rapl.stop("7:index.js:stop");
rapl.start("8:index.js:start");
rapl.start("3:index.js:require");
rapl.stop("8:index.js:start");
rapl.start("9:index.js:require");
const createError = require('http-errors');
rapl.stop("9:index.js:require");
rapl.start("10:index.js:stop");
rapl.stop("3:index.js:require");
rapl.stop("10:index.js:stop");
rapl.start("11:index.js:start");
rapl.start("4:index.js:require");
rapl.stop("11:index.js:start");
rapl.start("12:index.js:require");
const {isUndefined} = require('knex/lib/util/is');
rapl.stop("12:index.js:require");
rapl.start("13:index.js:stop");
rapl.stop("4:index.js:require");
rapl.stop("13:index.js:stop");
async function users(server, options, done) {
  rapl.start("15:index.js:start");
  rapl.start("9:index.js:undefined");
  rapl.stop("15:index.js:start");
  rapl.start("16:index.js:undefined");
  const userModel = require('../../models/users')(server.knex);
  rapl.stop("16:index.js:undefined");
  rapl.start("17:index.js:stop");
  rapl.stop("9:index.js:undefined");
  rapl.stop("17:index.js:stop");
  async function createToken(user, reply) {
    rapl.start("19:index.js:start");
    rapl.start("11:index.js:jwtSign");
    rapl.stop("19:index.js:start");
    rapl.start("20:index.js:jwtSign");
    const __result = await reply.jwtSign({
      id: user.id,
      username: user.username
    });
    rapl.stop("20:index.js:jwtSign");
    rapl.start("24:index.js:stop");
    rapl.stop("11:index.js:jwtSign");
    rapl.stop("24:index.js:stop");
    return __result;
  }
  rapl.start("27:index.js:start");
  rapl.start("19:index.js:route");
  rapl.stop("27:index.js:start");
  rapl.start("28:index.js:route");
  server.route({
    method: 'POST',
    path: options.prefix + 'users/login',
    schema: schema.login,
    handler: onLogin
  });
  rapl.stop("28:index.js:route");
  rapl.start("34:index.js:stop");
  rapl.stop("19:index.js:route");
  rapl.stop("34:index.js:stop");
  async function onLogin(req, reply) {
    rapl.start("36:index.js:start");
    rapl.start("26:index.js:getUserByEmail");
    rapl.stop("36:index.js:start");
    rapl.start("37:index.js:getUserByEmail");
    const user = await userModel.getUserByEmail(req.body.user.email);
    rapl.stop("37:index.js:getUserByEmail");
    rapl.start("38:index.js:stop");
    rapl.stop("26:index.js:getUserByEmail");
    rapl.stop("38:index.js:stop");
    if (!isUndefined(user)) {
      if (await server.hashCompare(req.body.user.password, user.password)) {
        rapl.start("41:index.js:start");
        rapl.start("31:index.js:createToken");
        rapl.stop("41:index.js:start");
        rapl.start("42:index.js:createToken");
        user.token = await createToken(user, reply);
        rapl.stop("42:index.js:createToken");
        rapl.start("43:index.js:stop");
        rapl.stop("31:index.js:createToken");
        rapl.stop("43:index.js:stop");
        return {
          user
        };
      }
    }
    rapl.start("49:index.js:start");
    rapl.start("35:index.js:Unauthorized");
    rapl.stop("49:index.js:start");
    rapl.start("50:index.js:Unauthorized");
    const __result = createError.Unauthorized('Wrong credentials');
    rapl.stop("50:index.js:Unauthorized");
    rapl.start("51:index.js:stop");
    rapl.stop("35:index.js:Unauthorized");
    rapl.stop("51:index.js:stop");
    return __result;
  }
  rapl.start("54:index.js:start");
  rapl.start("41:index.js:route");
  rapl.stop("54:index.js:start");
  rapl.start("55:index.js:route");
  server.route({
    method: 'POST',
    path: options.prefix + 'users',
    schema: schema.register,
    handler: onRegister
  });
  rapl.stop("55:index.js:route");
  rapl.start("61:index.js:stop");
  rapl.stop("41:index.js:route");
  rapl.stop("61:index.js:stop");
  async function onRegister(req, reply) {
    if (isUndefined(await userModel.getUserByEmail(req.body.user.email)) && isUndefined(await userModel.getUserByUsername(req.body.user.username))) {
      rapl.start("64:index.js:start");
      rapl.start("50:index.js:hash");
      rapl.stop("64:index.js:start");
      rapl.start("65:index.js:hash");
      req.body.user.password = await server.hash(req.body.user.password);
      rapl.stop("65:index.js:hash");
      rapl.start("66:index.js:stop");
      rapl.stop("50:index.js:hash");
      rapl.stop("66:index.js:stop");
      rapl.start("67:index.js:start");
      rapl.start("51:index.js:registerUser");
      rapl.stop("67:index.js:start");
      rapl.start("68:index.js:registerUser");
      const user = await userModel.registerUser(req.body.user);
      rapl.stop("68:index.js:registerUser");
      rapl.start("69:index.js:stop");
      rapl.stop("51:index.js:registerUser");
      rapl.stop("69:index.js:stop");
      rapl.start("70:index.js:start");
      rapl.start("52:index.js:createToken");
      rapl.stop("70:index.js:start");
      rapl.start("71:index.js:createToken");
      user.token = await createToken(user, reply);
      rapl.stop("71:index.js:createToken");
      rapl.start("72:index.js:stop");
      rapl.stop("52:index.js:createToken");
      rapl.stop("72:index.js:stop");
      return {
        user
      };
    }
    rapl.start("77:index.js:start");
    rapl.start("55:index.js:send");
    rapl.stop("77:index.js:start");
    rapl.start("78:index.js:send");
    reply.code(409).send({
      message: 'duplicate user'
    });
    rapl.stop("78:index.js:send");
    rapl.start("81:index.js:stop");
    rapl.stop("55:index.js:send");
    rapl.stop("81:index.js:stop");
  }
  rapl.start("83:index.js:start");
  rapl.start("60:index.js:route");
  rapl.stop("83:index.js:start");
  rapl.start("84:index.js:route");
  server.route({
    method: 'GET',
    path: options.prefix + 'user',
    onRequest: [server.authenticate],
    schema: schema.get,
    handler: onGet
  });
  rapl.stop("84:index.js:route");
  rapl.start("91:index.js:stop");
  rapl.stop("60:index.js:route");
  rapl.stop("91:index.js:stop");
  async function onGet(req, reply) {
    rapl.start("93:index.js:start");
    rapl.start("68:index.js:getUserById");
    rapl.stop("93:index.js:start");
    rapl.start("94:index.js:getUserById");
    let user = await userModel.getUserById(req.user.id);
    rapl.stop("94:index.js:getUserById");
    rapl.start("95:index.js:stop");
    rapl.stop("68:index.js:getUserById");
    rapl.stop("95:index.js:stop");
    if (!isUndefined(user)) {
      rapl.start("97:index.js:start");
      rapl.start("70:index.js:lookupToken");
      rapl.stop("97:index.js:start");
      rapl.start("98:index.js:lookupToken");
      const token = await server.jwt.lookupToken(req);
      rapl.stop("98:index.js:lookupToken");
      rapl.start("99:index.js:stop");
      rapl.stop("70:index.js:lookupToken");
      rapl.stop("99:index.js:stop");
      user = {
        ...user,
        token
      };
      return {
        user
      };
    } else {
      rapl.start("108:index.js:start");
      rapl.start("74:index.js:send");
      rapl.stop("108:index.js:start");
      rapl.start("109:index.js:send");
      reply.code(404).send({
        message: 'not found'
      });
      rapl.stop("109:index.js:send");
      rapl.start("112:index.js:stop");
      rapl.stop("74:index.js:send");
      rapl.stop("112:index.js:stop");
    }
  }
  rapl.start("115:index.js:start");
  rapl.start("80:index.js:route");
  rapl.stop("115:index.js:start");
  rapl.start("116:index.js:route");
  server.route({
    method: 'PUT',
    path: options.prefix + 'user',
    onRequest: [server.authenticate],
    schema: schema.update,
    handler: onUpdate
  });
  rapl.stop("116:index.js:route");
  rapl.start("123:index.js:stop");
  rapl.stop("80:index.js:route");
  rapl.stop("123:index.js:stop");
  async function onUpdate(req, reply) {
    let user = req.body.user;
    user.id = req.user.id;
    rapl.start("127:index.js:start");
    rapl.start("90:index.js:getUserById");
    rapl.stop("127:index.js:start");
    rapl.start("128:index.js:getUserById");
    const userold = await userModel.getUserById(user.id);
    rapl.stop("128:index.js:getUserById");
    rapl.start("129:index.js:stop");
    rapl.stop("90:index.js:getUserById");
    rapl.stop("129:index.js:stop");
    if (user.password) {
      rapl.start("131:index.js:start");
      rapl.start("92:index.js:hash");
      rapl.stop("131:index.js:start");
      rapl.start("132:index.js:hash");
      user.password = await server.hash(user.password);
      rapl.stop("132:index.js:hash");
      rapl.start("133:index.js:stop");
      rapl.stop("92:index.js:hash");
      rapl.stop("133:index.js:stop");
    }
    rapl.start("135:index.js:start");
    rapl.start("94:index.js:updateUser");
    rapl.stop("135:index.js:start");
    rapl.start("136:index.js:updateUser");
    await userModel.updateUser(user);
    rapl.stop("136:index.js:updateUser");
    rapl.start("137:index.js:stop");
    rapl.stop("94:index.js:updateUser");
    rapl.stop("137:index.js:stop");
    rapl.start("138:index.js:start");
    rapl.start("95:index.js:getUserById");
    rapl.stop("138:index.js:start");
    rapl.start("139:index.js:getUserById");
    user = await userModel.getUserById(user.id);
    rapl.stop("139:index.js:getUserById");
    rapl.start("140:index.js:stop");
    rapl.stop("95:index.js:getUserById");
    rapl.stop("140:index.js:stop");
    if (!isUndefined(userold)) {
      rapl.start("142:index.js:start");
      rapl.start("97:index.js:createToken");
      rapl.stop("142:index.js:start");
      rapl.start("143:index.js:createToken");
      user.token = await createToken(user, reply);
      rapl.stop("143:index.js:createToken");
      rapl.start("144:index.js:stop");
      rapl.stop("97:index.js:createToken");
      rapl.stop("144:index.js:stop");
      return {
        user
      };
    } else {
      rapl.start("149:index.js:start");
      rapl.start("100:index.js:send");
      rapl.stop("149:index.js:start");
      rapl.start("150:index.js:send");
      reply.code(404).send({
        message: 'not found'
      });
      rapl.stop("150:index.js:send");
      rapl.start("153:index.js:stop");
      rapl.stop("100:index.js:send");
      rapl.stop("153:index.js:stop");
    }
  }
  rapl.start("156:index.js:start");
  rapl.start("106:index.js:done");
  rapl.stop("156:index.js:start");
  rapl.start("157:index.js:done");
  done();
  rapl.stop("157:index.js:done");
  rapl.start("158:index.js:stop");
  rapl.stop("106:index.js:done");
  rapl.stop("158:index.js:stop");
}
rapl.start("160:index.js:start");
rapl.start("108:index.js:fp");
rapl.stop("160:index.js:start");
rapl.start("161:index.js:fp");
module.exports = fp(users);
rapl.stop("161:index.js:fp");
rapl.start("162:index.js:stop");
rapl.stop("108:index.js:fp");
rapl.stop("162:index.js:stop");
