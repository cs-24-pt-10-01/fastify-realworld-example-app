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
async function profiles(server, options, done) {
  rapl.start("8:index.js:undefined");
  const profilesModel = require('../../models/profiles')(server.knex);
  rapl.stop("8:index.js:undefined");
  rapl.start("10:index.js:route");
  server.route({
    method: 'GET',
    path: options.prefix + 'profiles/:username',
    onRequest: [server.authenticate_optional],
    schema: schema.profileResp,
    handler: onGet
  });
  rapl.stop("10:index.js:route");
  async function onGet(req, reply) {
    const {username} = req.params;
    const currid = req.user ? req.user.id : '';
    rapl.start("20:index.js:getProfileByUsername");
    const profile = await profilesModel.getProfileByUsername(currid, username);
    rapl.stop("20:index.js:getProfileByUsername");
    if (profile.username) {
      return {
        profile
      };
    } else {
      rapl.start("24:index.js:NotFound");
      const __result = createError.NotFound('not found');
      rapl.stop("24:index.js:NotFound");
      return __result;
    }
  }
  rapl.start("28:index.js:route");
  server.route({
    method: 'POST',
    path: options.prefix + 'profiles/:username/follow',
    onRequest: [server.authenticate],
    schema: schema.profileResp,
    handler: onFollow
  });
  rapl.stop("28:index.js:route");
  async function onFollow(req, reply) {
    const {username} = req.params;
    rapl.start("37:index.js:getProfileByUsername");
    const profile = await profilesModel.getProfileByUsername(req.user.id, username);
    rapl.stop("37:index.js:getProfileByUsername");
    if (profile.username) {
      if (!profile.following) {
        rapl.start("40:index.js:followProfile");
        await profilesModel.followProfile(req.user.id, profile.id);
        rapl.stop("40:index.js:followProfile");
        profile.following = true;
      }
      return {
        profile
      };
    } else {
      rapl.start("45:index.js:NotFound");
      const __result = createError.NotFound('not found');
      rapl.stop("45:index.js:NotFound");
      return __result;
    }
  }
  rapl.start("49:index.js:route");
  server.route({
    method: 'DELETE',
    path: options.prefix + 'profiles/:username/follow',
    onRequest: [server.authenticate],
    schema: schema.profileResp,
    handler: onUnfollow
  });
  rapl.stop("49:index.js:route");
  async function onUnfollow(req, reply) {
    const {username} = req.params;
    rapl.start("58:index.js:getProfileByUsername");
    const profile = await profilesModel.getProfileByUsername(req.user.id, username);
    rapl.stop("58:index.js:getProfileByUsername");
    if (profile.username) {
      if (profile.following) {
        rapl.start("61:index.js:unfollowProfile");
        await profilesModel.unfollowProfile(req.user.id, profile.id, false);
        rapl.stop("61:index.js:unfollowProfile");
        profile.following = false;
      }
      return {
        profile
      };
    } else {
      rapl.start("66:index.js:NotFound");
      const __result = createError.NotFound('not found');
      rapl.stop("66:index.js:NotFound");
      return __result;
    }
  }
  rapl.start("70:index.js:done");
  done();
  rapl.stop("70:index.js:done");
}
rapl.start("73:index.js:fp");
module.exports = fp(profiles);
rapl.stop("73:index.js:fp");
