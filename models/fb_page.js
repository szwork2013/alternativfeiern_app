var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var pageSchema = mongoose.Schema({
  pageId    :   String,
  pageName  :   String,
});

module.exports = mongoose.model('FB_Page', pageSchema);
