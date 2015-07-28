var mongoose = require('mongoose');

var blackListEventSchema = mongoose.Schema({
  fbid    :   String
});

module.exports = mongoose.model('BlackListEvent', blackListEventSchema);
