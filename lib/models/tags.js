const rapl = require('./rapl.js');
rapl.start("4:tags.js:pluck");
module.exports = function (knex) {
  rapl.start("5:tags.js:stop");
  const __result = {
    getTags: async function () {
      rapl.start("7:tags.js:pluck");
      const __result = knex('tags').pluck('name');
      rapl.stop("7:tags.js:pluck");
      return __result;
    }
  };
  rapl.stop("5:tags.js:stop");
  return __result;
};
rapl.stop("4:tags.js:pluck");
