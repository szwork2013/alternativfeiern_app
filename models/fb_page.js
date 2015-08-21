var mongoose = require('mongoose');

var pageSchema = mongoose.Schema({
  fbid      :   String,
  name      :   String,
  picture   :   String,
  events    :   [
    {
      fbid   :   String,
      name   :   String,
      start  :   String,
      end    :   String,
      location  :   String,
      description   :   String,
      cover   :   String,
      isBlacklisted : Boolean,
    }
  ],
});

module.exports = mongoose.model('FB_Page', pageSchema);
