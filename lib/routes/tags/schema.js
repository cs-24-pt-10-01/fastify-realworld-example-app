const rapl = require('./rapl.js');
rapl.start("1:schema.js:require");
const S = require('fluent-json-schema');
rapl.stop("1:schema.js:require");
rapl.start("3:schema.js:prop");
const get = {
  response: {
    200: S.object().prop('tags', S.array().items(S.string()).required()),
    404: S.object().prop('message', S.string())
  }
};
rapl.stop("3:schema.js:prop");
module.exports = {
  get
};
