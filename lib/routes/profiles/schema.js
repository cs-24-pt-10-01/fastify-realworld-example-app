const rapl = require('./rapl.js');
rapl.start("1:schema.js:require");
const S = require('fluent-json-schema');
rapl.stop("1:schema.js:require");
rapl.start("3:schema.js:prop");
const Profile = S.object().prop('username', S.string().required()).prop('bio', S.string().required()).prop('image', S.string().required()).prop('following', S.boolean().required());
rapl.stop("3:schema.js:prop");
rapl.start("10:schema.js:prop");
const profileResp = {
  response: {
    200: S.object().prop('profile', Profile),
    404: S.object().prop('message', S.string())
  }
};
rapl.stop("10:schema.js:prop");
module.exports = {
  profileResp
};
