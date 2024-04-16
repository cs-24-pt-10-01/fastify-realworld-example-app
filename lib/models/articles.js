const rapl = require('./rapl.js');
rapl.start("1:articles.js:require");
const slug = require('slug');
rapl.stop("1:articles.js:require");
rapl.start("6:articles.js:getArticle");
module.exports = function (knex) {
  function articleMap(article) {
    article.author = {
      username: article.username,
      bio: article.bio,
      image: article.image,
      following: !!article.following
    };
    delete article.username;
    delete article.bio;
    delete article.image;
    delete article.following;
    article.favorited = article.favorited > 0;
    rapl.start("19:articles.js:split");
    article.tagList = article.tagList ? article.tagList.split(',') : [];
    rapl.stop("19:articles.js:split");
    rapl.start("20:articles.js:sort");
    article.tagList.sort();
    rapl.stop("20:articles.js:sort");
    rapl.start("21:articles.js:toISOString");
    article.updatedAt = new Date(article.updatedAt).toISOString();
    rapl.stop("21:articles.js:toISOString");
    rapl.start("22:articles.js:toISOString");
    article.createdAt = new Date(article.createdAt).toISOString();
    rapl.stop("22:articles.js:toISOString");
    return article;
  }
  rapl.start("26:articles.js:stop");
  const __result = {
    getArticles: async function (userId, filters) {
      let {offset, limit, tag, author, favorited} = filters;
      userId = userId || -1;
      offset = offset || 0;
      limit = limit || 20;
      rapl.start("35:articles.js:orderBy");
      const query = knex('articles').join('users', 'articles.author', 'users.id').leftJoin('favorites', 'articles.id', 'favorites.article').leftJoin('favorites as favorites2', function () {
        rapl.start("39:articles.js:andOn");
        this.on('favorites2.article', '=', 'articles.id').andOn('favorites2.user', '=', userId);
        rapl.stop("39:articles.js:andOn");
      }).leftJoin('followers', function () {
        rapl.start("44:articles.js:andOn");
        this.on('followers.user', '=', 'users.id').andOn('followers.follower', '=', userId);
        rapl.stop("44:articles.js:andOn");
      }).leftJoin('articles_tags', 'articles.id', 'articles_tags.article').leftJoin('tags', 'articles_tags.tag', 'tags.id').orderBy('articles.created_at', 'desc');
      rapl.stop("35:articles.js:orderBy");
      if (tag) {
        rapl.start("54:articles.js:where");
        query.join('articles_tags as articles_tags_tag', 'articles.id', 'articles_tags_tag.article').join('tags as tags_tag', 'articles_tags_tag.tag', 'tags_tag.id').where('tags_tag.name', tag);
        rapl.stop("54:articles.js:where");
      }
      if (author) {
        rapl.start("61:articles.js:where");
        query.where('users.username', author);
        rapl.stop("61:articles.js:where");
      }
      if (favorited) {
        rapl.start("66:articles.js:where");
        query.join('favorites as favorites_fav', 'articles.id', 'favorites_fav.article').join('users as users_fav', 'favorites_fav.user', 'users_fav.id').where('users_fav.username', favorited);
        rapl.stop("66:articles.js:where");
      }
      rapl.start("72:articles.js:first");
      const totalCount = await query.clone().count('*', {
        as: 'count'
      }).first();
      rapl.stop("72:articles.js:first");
      if (typeof totalCount === 'undefined') {
        return {
          articles: [],
          articlesCount: 0
        };
      }
      rapl.start("76:articles.js:limit");
      query.select('articles.id', 'articles.slug', 'articles.title', 'articles.description', 'articles.body', 'articles.created_at as createdAt', 'articles.updated_at as updatedAt').select('users.username', 'users.bio', 'users.image').select(knex.raw('group_concat(distinct tags.name) as tagList')).countDistinct('favorites.id as favoritesCount').count('favorites2.id as favorited').count('followers.id as following').groupBy('articles.id').offset(offset).limit(limit);
      rapl.stop("76:articles.js:limit");
      const articles = await query;
      rapl.start("88:articles.js:map");
      articles.map(articleMap);
      rapl.stop("88:articles.js:map");
      return {
        articles,
        articlesCount: totalCount.count || 0
      };
    },
    getArticlesFeed: async function (userId, filters) {
      const offset = filters.offset || 0;
      const limit = filters.limit || 20;
      rapl.start("96:articles.js:orderBy");
      const query = knex('articles').join('users', 'articles.author', 'users.id').leftJoin('favorites', 'articles.id', 'favorites.article').leftJoin('favorites as favorites2', function () {
        rapl.start("100:articles.js:andOn");
        this.on('favorites2.article', '=', 'articles.id').andOn('favorites2.user', '=', userId);
        rapl.stop("100:articles.js:andOn");
      }).join('followers', function () {
        rapl.start("105:articles.js:andOn");
        this.on('followers.user', '=', 'users.id').andOn('followers.follower', '=', userId);
        rapl.stop("105:articles.js:andOn");
      }).leftJoin('articles_tags', 'articles.id', 'articles_tags.article').leftJoin('tags', 'articles_tags.tag', 'tags.id').orderBy('articles.created_at', 'desc');
      rapl.stop("96:articles.js:orderBy");
      rapl.start("113:articles.js:first");
      const totalCount = await query.clone().count('*', {
        as: 'count'
      }).first();
      rapl.stop("113:articles.js:first");
      if (typeof totalCount === 'undefined') {
        return {
          articles: [],
          articlesCount: 0
        };
      }
      rapl.start("117:articles.js:limit");
      query.select('articles.id', 'articles.slug', 'articles.title', 'articles.description', 'articles.body', 'articles.created_at as createdAt', 'articles.updated_at as updatedAt').select('users.username', 'users.bio', 'users.image').select(knex.raw('group_concat(distinct tags.name) as tagList')).countDistinct('favorites.id as favoritesCount').count('favorites2.id as favorited').count('followers.id as following').groupBy('articles.id').offset(offset).limit(limit);
      rapl.stop("117:articles.js:limit");
      const articles = await query;
      rapl.start("129:articles.js:map");
      articles.map(articleMap);
      rapl.stop("129:articles.js:map");
      return {
        articles,
        articlesCount: totalCount.count
      };
    },
    getArticle: async function (userId, slug) {
      rapl.start("134:articles.js:orderBy");
      const query = knex('articles').leftJoin('users', 'articles.author', 'users.id').leftJoin('favorites', 'articles.id', 'favorites.article').leftJoin('favorites as favorites2', function () {
        rapl.start("138:articles.js:andOn");
        this.on('favorites2.article', '=', 'articles.id').andOn('favorites2.user', '=', userId);
        rapl.stop("138:articles.js:andOn");
      }).leftJoin('followers', function () {
        rapl.start("143:articles.js:andOn");
        this.on('followers.user', '=', 'users.id').andOn('followers.follower', '=', userId);
        rapl.stop("143:articles.js:andOn");
      }).leftJoin('articles_tags', 'articles.id', 'articles_tags.article').leftJoin('tags', 'articles_tags.tag', 'tags.id').where('articles.slug', slug).orderBy('articles.created_at', 'desc');
      rapl.stop("134:articles.js:orderBy");
      rapl.start("152:articles.js:groupBy");
      query.select('articles.id', 'articles.slug', 'articles.title', 'articles.description', 'articles.body', 'articles.created_at as createdAt', 'articles.updated_at as updatedAt').select('users.username', 'users.bio', 'users.image').select(knex.raw('group_concat(distinct tags.name) as tagList')).countDistinct('favorites.id as favoritesCount').count('favorites2.id as favorited').count('followers.id as following').groupBy('articles.id');
      rapl.stop("152:articles.js:groupBy");
      const articles = await query;
      rapl.start("162:articles.js:map");
      articles.map(articleMap);
      rapl.stop("162:articles.js:map");
      return articles[0] || null;
    },
    createArticle: async function (userId, article) {
      const tagList = article.tagList;
      delete article.tagList;
      article.author = userId;
      rapl.start("171:articles.js:toString");
      article.slug = slug(article.title) + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36);
      rapl.stop("171:articles.js:toString");
      rapl.start("172:articles.js:returning");
      const newArticle = await knex('articles').insert(article).returning('id');
      rapl.stop("172:articles.js:returning");
      if (tagList && tagList.length > 0) {
        rapl.start("176:articles.js:select");
        const tags = await knex('tags').whereIn('name', tagList).select('id', 'name');
        rapl.stop("176:articles.js:select");
        rapl.start("179:articles.js:map");
        const tagsToInsert = tagList.filter(tag => !tags.find(t => t.name === tag)).map(tag => ({
          name: tag
        }));
        rapl.stop("179:articles.js:map");
        if (tagsToInsert.length > 0) {
          rapl.start("183:articles.js:insert");
          await knex('tags').insert(tagsToInsert);
          rapl.stop("183:articles.js:insert");
        }
        rapl.start("185:articles.js:whereIn");
        const tagsToInsertIds = await knex('tags').select('id').whereIn('name', tagList);
        rapl.stop("185:articles.js:whereIn");
        rapl.start("188:articles.js:map");
        const articlesTags = tagsToInsertIds.map(tagId => ({
          article: newArticle[0].id,
          tag: tagId.id
        }));
        rapl.stop("188:articles.js:map");
        rapl.start("192:articles.js:insert");
        await knex('articles_tags').insert(articlesTags);
        rapl.stop("192:articles.js:insert");
      }
      rapl.start("197:articles.js:getArticle");
      const __result = this.getArticle(userId, article.slug);
      rapl.stop("197:articles.js:getArticle");
      return __result;
    },
    updateArticle: async function (userid, slug, article) {
      if (article.title) {
        rapl.start("202:articles.js:toString");
        article.slug = slug(article.title) + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36);
        rapl.stop("202:articles.js:toString");
      }
      rapl.start("204:articles.js:where");
      await knex('articles').update(article).where('slug', slug).where('author', userid);
      rapl.stop("204:articles.js:where");
      rapl.start("208:articles.js:getArticle");
      const __result = this.getArticle(userid, slug);
      rapl.stop("208:articles.js:getArticle");
      return __result;
    },
    deleteArticle: async function (userid, slug) {
      rapl.start("212:articles.js:first");
      const article = await knex('articles').select('id').where('slug', slug).where('author', userid).first();
      rapl.stop("212:articles.js:first");
      if (!article) {
        return null;
      }
      rapl.start("221:articles.js:all");
      await Promise.all([knex('articles').where('id', article.id).del(), knex('articles_tags').where('article', article.id).del(), knex('favorites').where('article', article.id).del(), knex('comments').where('article', article.id).del()]);
      rapl.stop("221:articles.js:all");
      return article;
    },
    favoriteArticle: async function (userId, slug) {
      rapl.start("239:articles.js:first");
      const article = await knex('articles').select('id').where('slug', slug).first();
      rapl.stop("239:articles.js:first");
      if (!article) {
        return null;
      }
      rapl.start("247:articles.js:first");
      const favorite = await knex('favorites').select('id').where('article', article.id).where('user', userId).first();
      rapl.stop("247:articles.js:first");
      if (!favorite) {
        rapl.start("253:articles.js:insert");
        await knex('favorites').insert({
          article: article.id,
          user: userId
        });
        rapl.stop("253:articles.js:insert");
      }
      rapl.start("256:articles.js:getArticle");
      const __result = this.getArticle(userId, slug);
      rapl.stop("256:articles.js:getArticle");
      return __result;
    },
    unfavoriteArticle: async function (userId, slug) {
      rapl.start("260:articles.js:first");
      const article = await knex('articles').select('id').where('slug', slug).first();
      rapl.stop("260:articles.js:first");
      if (!article) {
        return null;
      }
      rapl.start("268:articles.js:del");
      await knex('favorites').where('article', article.id).where('user', userId).del();
      rapl.stop("268:articles.js:del");
      rapl.start("273:articles.js:getArticle");
      const __result = this.getArticle(userId, slug);
      rapl.stop("273:articles.js:getArticle");
      return __result;
    }
  };
  rapl.stop("26:articles.js:stop");
  return __result;
};
rapl.stop("6:articles.js:getArticle");
