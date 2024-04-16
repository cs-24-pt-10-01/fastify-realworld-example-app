const rapl = require('./rapl.js');
rapl.start("1:index.js:require");
const fp = require('fastify-plugin');
rapl.stop("1:index.js:require");
rapl.start("2:index.js:require");
const schema = require('./schema');
rapl.stop("2:index.js:require");
rapl.start("3:index.js:require");
const createError = require('http-errors');
rapl.stop("3:index.js:require");
async function comments(server, options, done) {
  rapl.start("8:index.js:undefined");
  const commentsModel = require('../../models/comments')(server.knex);
  rapl.stop("8:index.js:undefined");
  rapl.start("10:index.js:route");
  server.route({
    method: 'GET',
    path: options.prefix + 'articles/:slug/comments',
    onRequest: [server.authenticate_optional],
    schema: schema.get,
    handler: onGetComments
  });
  rapl.stop("10:index.js:route");
  async function onGetComments(req, reply) {
    const currid = req.user ? req.user.id : '';
    rapl.start("19:index.js:getComments");
    const comments = await commentsModel.getComments(currid, req.params.slug);
    rapl.stop("19:index.js:getComments");
    return {
      comments
    };
  }
  rapl.start("23:index.js:route");
  server.route({
    method: 'POST',
    path: options.prefix + 'articles/:slug/comments',
    onRequest: [server.authenticate],
    schema: schema.insert,
    handler: onCreateComment
  });
  rapl.stop("23:index.js:route");
  async function onCreateComment(req, reply) {
    rapl.start("31:index.js:createComment");
    const comment = await commentsModel.createComment(req.user.id, req.params.slug, req.body.comment);
    rapl.stop("31:index.js:createComment");
    if (!comment) return createError(404, 'Article not found');
    rapl.start("33:index.js:code");
    reply.code(201);
    rapl.stop("33:index.js:code");
    return {
      comment
    };
  }
  rapl.start("37:index.js:route");
  server.route({
    method: 'DELETE',
    path: options.prefix + 'articles/:slug/comments/:id',
    onRequest: [server.authenticate],
    schema: schema.del,
    handler: onDeleteComment
  });
  rapl.stop("37:index.js:route");
  async function onDeleteComment(req, reply) {
    rapl.start("45:index.js:getComment");
    const comment = await commentsModel.getComment(req.user.id, req.params.id);
    rapl.stop("45:index.js:getComment");
    if (!comment) throw createError(404, 'Comment not found');
    if (comment.author.username !== req.user.username) throw createError(403, 'Forbidden');
    rapl.start("48:index.js:deleteComment");
    await commentsModel.deleteComment(req.user.id, req.params.id);
    rapl.stop("48:index.js:deleteComment");
    rapl.start("49:index.js:code");
    reply.code(204);
    rapl.stop("49:index.js:code");
    return '';
  }
  rapl.start("53:index.js:done");
  done();
  rapl.stop("53:index.js:done");
}
rapl.start("56:index.js:fp");
module.exports = fp(comments);
rapl.stop("56:index.js:fp");
