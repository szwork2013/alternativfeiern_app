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
      isBlacklisted : Boolean,
      img : String,
      img_orig : String,
      img_small : String
    }
  ],
});

module.exports = mongoose.model('FB_Page', pageSchema);
