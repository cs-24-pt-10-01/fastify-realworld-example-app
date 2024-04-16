const rapl = require('./rapl.js');
rapl.start("1:schema.js:require");
const S = require('fluent-json-schema');
rapl.stop("1:schema.js:require");
rapl.start("2:schema.js:require");
const profile = require('../profiles/schema');
rapl.stop("2:schema.js:require");
rapl.start("4:schema.js:prop");
const Comment = S.object().prop('id', S.number().required()).prop('createdAt', S.string().required()).prop('updatedAt', S.string().required()).prop('body', S.string().required()).prop('author', profile.Profile);
rapl.stop("4:schema.js:prop");
rapl.start("12:schema.js:prop");
const get = {
  response: {
    200: S.object().prop('comments', S.array().items(Comment).required()),
    404: S.object().prop('message', S.string())
  }
};
rapl.stop("12:schema.js:prop");
rapl.start("20:schema.js:prop");
const add = {
  body: S.object().prop('comment', S.object().prop('body', S.string().required())),
  response: {
    201: S.object().prop('comment', Comment.required()),
    404: S.object().prop('message', S.string())
  }
};
rapl.stop("20:schema.js:prop");
rapl.start("32:schema.js:prop");
const del = {
  response: {
    204: S.null(),
    404: S.object().prop('message', S.string())
  }
};
rapl.stop("32:schema.js:prop");
module.exports = {
  get,
  add,
  del
};
