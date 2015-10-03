var Reflux = require('reflux');

var EventActions = Reflux.createActions([
  'fetchToday',
  'fetchFuture'
]);

module.exports = EventActions;
