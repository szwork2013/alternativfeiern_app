var mongoose = require('mongoose');

var pageSchema = mongoose.Schema({
  fbid        :   String,
  name      :   String,
  picture   :   String,
  events    :   [
    {
      fbid   :   String,
      name   :   String,
      start  :   String,
      end    :   String,
      location  :   String,
      //following values have to be queried for the single event
      description   :   String,
      cover   :   String,
    }
  ],
});

module.exports = mongoose.model('FB_Page', pageSchema);
