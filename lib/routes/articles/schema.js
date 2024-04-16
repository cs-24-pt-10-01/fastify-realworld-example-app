const rapl = require('./rapl.js');
rapl.start("1:schema.js:require");
const S = require('fluent-json-schema');
rapl.stop("1:schema.js:require");
rapl.start("2:schema.js:require");
const profile = require('../profiles/schema');
rapl.stop("2:schema.js:require");
rapl.start("4:schema.js:prop");
const Article = S.object().prop('slug', S.string().required()).prop('title', S.string().required()).prop('description', S.string().required()).prop('body', S.string().required()).prop('tagList', S.array().items(S.string()).required()).prop('createdAt', S.string().required()).prop('updatedAt', S.string().required()).prop('favorited', S.boolean().required()).prop('favoritesCount', S.number().required()).prop('author', profile.Profile);
rapl.stop("4:schema.js:prop");
rapl.start("17:schema.js:prop");
const getArticle = {
  response: {
    200: S.object().prop('article', Article.required()),
    404: S.object().prop('message', S.string())
  }
};
rapl.stop("17:schema.js:prop");
rapl.start("24:schema.js:prop");
const getArticles = {
  querystring: S.object().prop('tag', S.string()).prop('author', S.string()).prop('favorited', S.string()).prop('limit', S.number()).prop('offset', S.number()),
  response: {
    200: S.object().prop('articles', S.array().items(Article).required()).prop('articlesCount', S.number().required())
  }
};
rapl.stop("24:schema.js:prop");
rapl.start("37:schema.js:prop");
const getFeed = {
  querystring: S.object().prop('limit', S.number()).prop('offset', S.number()),
  response: {
    200: S.object().prop('articles', S.array().items(Article).required()).prop('articlesCount', S.number().required())
  }
};
rapl.stop("37:schema.js:prop");
rapl.start("48:schema.js:prop");
const insert = {
  body: S.object().prop('article', S.object().prop('title', S.string().required()).prop('description', S.string().required()).prop('body', S.string().required()).prop('tagList', S.array().items(S.string()).required())),
  response: {
    201: S.object().prop('article', Article.required())
  }
};
rapl.stop("48:schema.js:prop");
rapl.start("62:schema.js:prop");
const update = {
  body: S.object().prop('article', S.object().prop('title', S.string()).prop('description', S.string()).prop('body', S.string())),
  response: {
    200: S.object().prop('article', Article.required())
  }
};
rapl.stop("62:schema.js:prop");
rapl.start("75:schema.js:prop");
const remove = {
  response: {
    404: S.object().prop('message', S.string())
  }
};
rapl.stop("75:schema.js:prop");
module.exports = {
  getArticles,
  getArticle,
  getFeed,
  insert,
  update,
  remove
};
