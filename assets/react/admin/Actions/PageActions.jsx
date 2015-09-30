var Reflux = require('reflux');

var PageActions = Reflux.createActions([
  'fetchPages',
  'fetchPageEvents',
  'addPage',
  'removePage',
  'blacklistEvent'
]);

module.exports = PageActions;
