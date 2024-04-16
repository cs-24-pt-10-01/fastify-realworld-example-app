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
const sentiment = {
  body: S.object().prop('content', S.string().required()),
  response: {
    200: S.object().prop('score', S.string().required())
  }
};
rapl.stop("6:schema.js:prop");
rapl.start("12:schema.js:stop");
rapl.stop("3:schema.js:prop");
rapl.stop("12:schema.js:stop");
module.exports = {
  sentiment
};
