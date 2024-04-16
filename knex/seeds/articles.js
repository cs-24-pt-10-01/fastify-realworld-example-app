const rapl = require('./rapl.js');
rapl.start("1:articles.js:require");
const {faker} = require('@faker-js/faker');
rapl.stop("1:articles.js:require");
rapl.start("7:articles.js:insert");
exports.seed = async function (knex) {
  rapl.start("9:articles.js:del");
  await knex('articles').del();
  rapl.stop("9:articles.js:del");
  rapl.start("10:articles.js:insert");
  await knex('articles').insert(Array.from({
    length: 5
  }, (v, i) => {
    rapl.start("12:articles.js:toISOString");
    const __result = {
      id: i,
      slug: faker.lorem.slug(),
      title: faker.lorem.sentence(),
      description: faker.lorem.sentences(),
      body: faker.lorem.paragraphs(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      author: i
    };
    rapl.stop("12:articles.js:toISOString");
    return __result;
  }));
  rapl.stop("10:articles.js:insert");
};
rapl.stop("7:articles.js:insert");
