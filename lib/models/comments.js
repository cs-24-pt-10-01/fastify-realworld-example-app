const rapl = require('./rapl.js');
rapl.start("4:comments.js:del");
module.exports = function (knex) {
  function commentMap(comment) {
    comment.author = {
      username: comment.username,
      bio: comment.bio,
      image: comment.image,
      following: !!comment.following
    };
    delete comment.username;
    delete comment.bio;
    delete comment.image;
    delete comment.following;
    rapl.start("16:comments.js:toISOString");
    comment.updatedAt = new Date(comment.updatedAt).toISOString();
    rapl.stop("16:comments.js:toISOString");
    rapl.start("17:comments.js:toISOString");
    comment.createdAt = new Date(comment.createdAt).toISOString();
    rapl.stop("17:comments.js:toISOString");
    return comment;
  }
  rapl.start("21:comments.js:stop");
  const __result = {
    getComment: async function (userId, id) {
      rapl.start("24:comments.js:groupBy");
      const comments = await knex('comments').select('comments.id', 'comments.body', 'comments.created_at as createdAt', 'comments.updated_at as updatedAt').select('users.username', 'users.bio', 'users.image').count('followers.id as following').join('users', 'comments.author', 'users.id').join('articles', 'comments.article', 'articles.id').leftJoin('followers', function () {
        rapl.start("31:comments.js:andOn");
        this.on('followers.user', '=', 'users.id').andOn('followers.follower', '=', userId);
        rapl.stop("31:comments.js:andOn");
      }).where({
        'comments.id': id
      }).groupBy('comments.id');
      rapl.stop("24:comments.js:groupBy");
      if (comments.length === 0) {
        return null;
      }
      rapl.start("41:comments.js:map");
      const __result = comments.map(commentMap)[0];
      rapl.stop("41:comments.js:map");
      return __result;
    },
    getComments: async function (userId, slug) {
      rapl.start("45:comments.js:join");
      const query = knex('comments').select('comments.id', 'comments.body', 'comments.created_at as createdAt', 'comments.updated_at as updatedAt').select('users.username', 'users.bio', 'users.image').join('users', 'comments.author', 'users.id').join('articles', 'comments.article', 'articles.id');
      rapl.stop("45:comments.js:join");
      if (userId) {
        rapl.start("51:comments.js:leftJoin");
        query.count('followers.id as following').leftJoin('followers', function () {
          rapl.start("53:comments.js:andOn");
          this.on('followers.user', '=', 'users.id').andOn('followers.follower', '=', userId);
          rapl.stop("53:comments.js:andOn");
        });
        rapl.stop("51:comments.js:leftJoin");
      } else {
        rapl.start("58:comments.js:select");
        query.select(knex.raw('0 as following'));
        rapl.stop("58:comments.js:select");
      }
      rapl.start("61:comments.js:orderBy");
      query.where('articles.slug', slug).orderBy('comments.created_at', 'desc');
      rapl.stop("61:comments.js:orderBy");
      const comments = await query;
      if (comments.length > 0 && comments[0].id) {
        rapl.start("66:comments.js:map");
        const __result = comments.map(commentMap);
        rapl.stop("66:comments.js:map");
        return __result;
      } else {
        return [];
      }
    },
    createComment: async function (userId, slug, comment) {
      rapl.start("73:comments.js:first");
      const articleId = await knex('articles').select('id').where({
        slug
      }).first();
      rapl.stop("73:comments.js:first");
      if (!articleId) {
        return null;
      }
      comment.author = userId;
      comment.article = articleId.id;
      rapl.start("84:comments.js:insert");
      const newComment = await knex('comments').returning('id').insert(comment);
      rapl.stop("84:comments.js:insert");
      rapl.start("87:comments.js:getComment");
      const __result = await this.getComment(userId, newComment[0].id);
      rapl.stop("87:comments.js:getComment");
      return __result;
    },
    deleteComment: async function (userId, commentId) {
      rapl.start("91:comments.js:first");
      const comment = await knex('comments').where({
        id: commentId
      }).where({
        author: userId
      }).first();
      rapl.stop("91:comments.js:first");
      if (!comment) {
        return null;
      }
      rapl.start("98:comments.js:del");
      await knex('comments').where({
        id: commentId
      }).where({
        author: userId
      }).del();
      rapl.stop("98:comments.js:del");
      return comment;
    }
  };
  rapl.stop("21:comments.js:stop");
  return __result;
};
rapl.stop("4:comments.js:del");
