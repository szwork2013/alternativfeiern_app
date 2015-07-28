var mongoose = require('mongoose');

var eventSchema = mongoose.Schema({
  fbid   :   String,
  name   :   String,
  start  :   String,
  end    :   String,
  location  :   String,
  description   :   String,
  cover   :   String,
});

module.exports = mongoose.model('Event', eventSchema);
