const rapl = require('./rapl.js');
rapl.start("1:schema.js:require");
const S = require('fluent-json-schema');
rapl.stop("1:schema.js:require");
rapl.start("3:schema.js:prop");
const User = S.object().prop('email', S.string().required()).prop('token', S.string().required()).prop('username', S.string().required()).prop('bio', S.string().required()).prop('image', S.string().required());
rapl.stop("3:schema.js:prop");
rapl.start("11:schema.js:prop");
const login = {
  body: S.object().id('http://api/users/login').title('User Login').description('Login user and respond with token').prop('user', S.object().prop('email', S.string().required()).prop('password', S.string().required())).required(),
  response: {
    200: S.object().prop('user', User),
    401: S.object().prop('message', S.string())
  }
};
rapl.stop("11:schema.js:prop");
rapl.start("31:schema.js:prop");
const register = {
  body: S.object().id('http://api/users').title('User Register').description('Register a new user').prop('user', S.object().prop('username', S.string().required()).prop('email', S.string().required()).prop('password', S.string().required())).required(),
  response: {
    200: S.object().prop('user', User)
  }
};
rapl.stop("31:schema.js:prop");
rapl.start("49:schema.js:prop");
const get = {
  response: {
    200: S.object().prop('user', User),
    404: S.object().prop('message', S.string())
  }
};
rapl.stop("49:schema.js:prop");
rapl.start("56:schema.js:prop");
const update = {
  body: S.object().id('http://api/user').title('User Update').description('Update user info').prop('user', S.object().prop('email', S.string()).prop('username', S.string()).prop('password', S.string()).prop('bio', S.string()).prop('image', S.string())).required(),
  response: {
    200: S.object().prop('user', User),
    404: S.object().prop('message', S.string())
  }
};
rapl.stop("56:schema.js:prop");
module.exports = {
  login,
  register,
  get,
  update
};
