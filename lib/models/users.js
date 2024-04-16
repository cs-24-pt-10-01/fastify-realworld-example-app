const rapl = require('./rapl.js');
rapl.start("4:users.js:update");
module.exports = function (knex) {
  rapl.start("5:users.js:stop");
  const __result = {
    getUserById: async function (id) {
      rapl.start("8:users.js:where");
      const __result = knex('users').first().where({
        id
      });
      rapl.stop("8:users.js:where");
      return __result;
    },
    getUserByEmail: async function (email) {
      rapl.start("14:users.js:where");
      const __result = knex('users').first().where({
        email
      });
      rapl.stop("14:users.js:where");
      return __result;
    },
    getUserByUsername: async function (username) {
      rapl.start("19:users.js:where");
      const __result = knex('users').first().where({
        username
      });
      rapl.stop("19:users.js:where");
      return __result;
    },
    registerUser: async function (user) {
      rapl.start("25:users.js:insert");
      const id = await knex('users').returning('id').insert({
        email: user.email,
        username: user.username,
        image: user.image,
        bio: user.bio,
        password: user.password
      });
      rapl.stop("25:users.js:insert");
      rapl.start("34:users.js:log");
      console.log(id);
      rapl.stop("34:users.js:log");
      rapl.start("35:users.js:where");
      const __result = await knex('users').first().where({
        email: user.email
      });
      rapl.stop("35:users.js:where");
      return __result;
    },
    updateUser: async function (user) {
      rapl.start("41:users.js:update");
      await knex('users').where({
        id: user.id
      }).update(user);
      rapl.stop("41:users.js:update");
    }
  };
  rapl.stop("5:users.js:stop");
  return __result;
};
rapl.stop("4:users.js:update");
