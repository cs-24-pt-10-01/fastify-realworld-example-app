const rapl = require('./rapl.js');
rapl.start("1:index.js:require");
const fp = require('fastify-plugin');
rapl.stop("1:index.js:require");
rapl.start("2:index.js:require");
const schema = require('./schema');
rapl.stop("2:index.js:require");
async function profiles(server, options, done) {
  rapl.start("7:index.js:undefined");
  const articlesModel = require('../../models/articles')(server.knex);
  rapl.stop("7:index.js:undefined");
  rapl.start("9:index.js:route");
  server.route({
    method: 'GET',
    path: options.prefix + 'articles',
    onRequest: [server.authenticate_optional],
    schema: schema.getArticles,
    handler: onGetArticles
  });
  rapl.stop("9:index.js:route");
  async function onGetArticles(req, reply) {
    const currid = req.user ? req.user.id : '';
    rapl.start("18:index.js:getArticles");
    const __result = await articlesModel.getArticles(currid, req.query);
    rapl.stop("18:index.js:getArticles");
    return __result;
  }
  rapl.start("21:index.js:route");
  server.route({
    method: 'GET',
    path: options.prefix + 'articles/feed',
    onRequest: [server.authenticate],
    schema: schema.getFeed,
    handler: onGetFeed
  });
  rapl.stop("21:index.js:route");
  async function onGetFeed(req, reply) {
    rapl.start("29:index.js:getArticlesFeed");
    const __result = await articlesModel.getArticlesFeed(req.user.id, req.query);
    rapl.stop("29:index.js:getArticlesFeed");
    return __result;
  }
  rapl.start("32:index.js:route");
  server.route({
    method: 'GET',
    path: options.prefix + 'articles/:slug',
    onRequest: [server.authenticate_optional],
    schema: schema.getArticle,
    handler: onGetArticle
  });
  rapl.stop("32:index.js:route");
  async function onGetArticle(req, reply) {
    const currid = req.user ? req.user.id : '';
    rapl.start("41:index.js:getArticle");
    const article = await articlesModel.getArticle(currid, req.params.slug);
    rapl.stop("41:index.js:getArticle");
    if (!article) {
      rapl.start("43:index.js:send");
      reply.code(404).send({
        message: 'not found'
      });
      rapl.stop("43:index.js:send");
    } else {
      return {
        article
      };
    }
  }
  rapl.start("50:index.js:route");
  server.route({
    method: 'POST',
    path: options.prefix + 'articles',
    onRequest: [server.authenticate],
    schema: schema.insert,
    handler: onCreateArticle
  });
  rapl.stop("50:index.js:route");
  async function onCreateArticle(req, reply) {
    rapl.start("58:index.js:createArticle");
    const article = await articlesModel.createArticle(req.user.id, req.body.article);
    rapl.stop("58:index.js:createArticle");
    rapl.start("59:index.js:code");
    reply.code(201);
    rapl.stop("59:index.js:code");
    return {
      article
    };
  }
  rapl.start("63:index.js:route");
  server.route({
    method: 'PUT',
    path: options.prefix + 'articles/:slug',
    onRequest: [server.authenticate],
    schema: schema.update,
    handler: onUpdateArticle
  });
  rapl.stop("63:index.js:route");
  async function onUpdateArticle(req, reply) {
    rapl.start("71:index.js:updateArticle");
    const article = await articlesModel.updateArticle(req.user.id, req.params.slug, req.body.article);
    rapl.stop("71:index.js:updateArticle");
    if (!article) {
      rapl.start("73:index.js:send");
      reply.code(404).send({
        message: 'not found'
      });
      rapl.stop("73:index.js:send");
    } else {
      return {
        article
      };
    }
  }
  rapl.start("80:index.js:route");
  server.route({
    method: 'DELETE',
    path: options.prefix + 'articles/:slug',
    onRequest: [server.authenticate],
    schema: schema.remove,
    handler: onDeleteArticle
  });
  rapl.stop("80:index.js:route");
  async function onDeleteArticle(req, reply) {
    rapl.start("88:index.js:deleteArticle");
    const article = await articlesModel.deleteArticle(req.user.id, req.params.slug);
    rapl.stop("88:index.js:deleteArticle");
    if (!article) {
      rapl.start("90:index.js:send");
      reply.code(404).send({
        message: 'not found'
      });
      rapl.stop("90:index.js:send");
    } else {
      rapl.start("93:index.js:code");
      reply.code(204);
      rapl.stop("93:index.js:code");
    }
    return '';
  }
  rapl.start("98:index.js:route");
  server.route({
    method: 'POST',
    path: options.prefix + 'articles/:slug/favorite',
    onRequest: [server.authenticate],
    schema: schema.getArticle,
    handler: onFavoriteArticle
  });
  rapl.stop("98:index.js:route");
  async function onFavoriteArticle(req, reply) {
    rapl.start("106:index.js:favoriteArticle");
    const article = await articlesModel.favoriteArticle(req.user.id, req.params.slug);
    rapl.stop("106:index.js:favoriteArticle");
    if (!article) {
      rapl.start("108:index.js:send");
      reply.code(404).send({
        message: 'not found'
      });
      rapl.stop("108:index.js:send");
    } else {
      return {
        article
      };
    }
  }
  rapl.start("114:index.js:route");
  server.route({
    method: 'DELETE',
    path: options.prefix + 'articles/:slug/favorite',
    onRequest: [server.authenticate],
    schema: schema.getArticle,
    handler: onUnfavoriteArticle
  });
  rapl.stop("114:index.js:route");
  async function onUnfavoriteArticle(req, reply) {
    rapl.start("122:index.js:unfavoriteArticle");
    const article = await articlesModel.unfavoriteArticle(req.user.id, req.params.slug);
    rapl.stop("122:index.js:unfavoriteArticle");
    if (!article) {
      rapl.start("124:index.js:send");
      reply.code(404).send({
        message: 'not found'
      });
      rapl.stop("124:index.js:send");
    } else {
      return {
        article
      };
    }
  }
  rapl.start("131:index.js:done");
  done();
  rapl.stop("131:index.js:done");
}
rapl.start("134:index.js:fp");
module.exports = fp(profiles);
rapl.stop("134:index.js:fp");
