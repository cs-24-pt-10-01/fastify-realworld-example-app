const rapl = require('./rapl.js');
rapl.start("1:schema.js:require");
const rapl = require('./rapl.js');
rapl.stop("1:schema.js:require");
rapl.start("2:schema.js:start");
rapl.start("1:schema.js:require");
rapl.stop("2:schema.js:start");
rapl.start("3:schema.js:require");
const S = require('fluent-json-schema');
rapl.stop("3:schema.js:require");
rapl.start("4:schema.js:stop");
rapl.stop("1:schema.js:require");
rapl.stop("4:schema.js:stop");
rapl.start("5:schema.js:start");
rapl.start("3:schema.js:prop");
rapl.stop("5:schema.js:start");
rapl.start("6:schema.js:prop");
const get = {
  response: {
    200: S.object().prop('tags', S.array().items(S.string()).required()),
    404: S.object().prop('message', S.string())
  }
};
rapl.stop("6:schema.js:prop");
rapl.start("12:schema.js:stop");
rapl.stop("3:schema.js:prop");
rapl.stop("12:schema.js:stop");
module.exports = {
  get
};
