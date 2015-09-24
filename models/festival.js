var mongoose = require('mongoose');

var festivalSchema = mongoose.Schema({
  name        :   String,
  alias       :   String,
  description :   String,
  city        :   String,
  website     :   String,
  price       :   String,
  img_orig    :   String,
  img_small   :   String,
});

module.exports = mongoose.model('Festival', festivalSchema);
