var mongoose = require('mongoose');

var locationSchema = mongoose.Schema({
  name        :   String,
  description :   String,
  address     :   String,
  city        :   String,
  website     :   String,
});

module.exports = mongoose.model('Location', locationSchema);
