const rapl = require('./rapl.js');
rapl.start("1:users.js:require");
const bcrypt = require('bcrypt');
rapl.stop("1:users.js:require");
rapl.start("2:users.js:require");
const {faker} = require('@faker-js/faker');
rapl.stop("2:users.js:require");
rapl.start("8:users.js:insert");
exports.seed = async function (knex) {
  rapl.start("10:users.js:del");
  await knex('users').del();
  rapl.stop("10:users.js:del");
  rapl.start("11:users.js:insert");
  await knex('users').insert(Array.from({
    length: 5
  }, (v, i) => {
    rapl.start("13:users.js:toISOString");
    const __result = {
      id: i,
      email: `user${i}@demo.test`,
      username: faker.name.firstName(),
      password: bcrypt.hashSync(`user${i}pass`, 10),
      bio: faker.lorem.sentences(),
      image: faker.image.avatar(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    rapl.stop("13:users.js:toISOString");
    return __result;
  }));
  rapl.stop("11:users.js:insert");
};
rapl.stop("8:users.js:insert");
