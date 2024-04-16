const rapl = require('./rapl.js');
rapl.start("4:profiles.js:del");
module.exports = function (knex) {
  rapl.start("5:profiles.js:stop");
  const __result = {
    getProfileByUsername: async function (userId, profileName) {
      rapl.start("8:profiles.js:where");
      const __result = await knex('users').first().select('users.id', 'username', 'bio', 'image').count('followers.id as following').leftJoin('followers', function () {
        rapl.start("13:profiles.js:andOn");
        this.on('followers.user', '=', 'users.id').andOn('followers.follower', '=', userId);
        rapl.stop("13:profiles.js:andOn");
      }).where({
        'users.username': profileName
      });
      rapl.stop("8:profiles.js:where");
      return __result;
    },
    followProfile: async function (userId, profileId) {
      const follow = {
        user: userId,
        follower: profileId
      };
      rapl.start("26:profiles.js:insert");
      await knex('followers').insert(follow);
      rapl.stop("26:profiles.js:insert");
    },
    unfollowProfile: async function (userId, profileId) {
      rapl.start("30:profiles.js:del");
      await knex('followers').where({
        user: userId,
        follower: profileId
      }).del();
      rapl.stop("30:profiles.js:del");
    }
  };
  rapl.stop("5:profiles.js:stop");
  return __result;
};
rapl.stop("4:profiles.js:del");
