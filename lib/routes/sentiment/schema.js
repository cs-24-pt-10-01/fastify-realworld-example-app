const rapl = require('./rapl.js');
rapl.start("1:schema.js:require");
const S = require('fluent-json-schema');
rapl.stop("1:schema.js:require");
rapl.start("3:schema.js:prop");
const sentiment = {
  body: S.object().prop('content', S.string().required()),
  response: {
    200: S.object().prop('score', S.string().required())
  }
};
rapl.stop("3:schema.js:prop");
module.exports = {
  sentiment
};
