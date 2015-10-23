var Reflux = require('reflux');
var $ = window.jQuery;
var EventActions = require('../Actions/EventActions.jsx');

var data = {
  name : 'Heute',
  hasEvents : false,
  col1 : [],
  col2 : [],
  col3 : [],
  col4 : []
};

var EventStore = Reflux.createStore({

  listenables : [EventActions],

  init: function() {
    console.log('TodayEventStore initialized');
    this.onFetchToday();
  },

  onFetchToday : function(){
    var self = this;
    $.ajax({
      url  : '/api/events/whitelisted/today',
      success : function(events){
        console.log(events);
        self.sortColumns(events);
      }
    });
  },

  sortColumns : function(events) {
    data.hasEvents = events.length > 0 ? true : false;
    for(var i = 0; i < events.length; i++) {
      if(i%4 == 0){
        data.col1.push(events[i]);
      }
      if(i%4 == 1){
        data.col2.push(events[i]);
      }
      if(i%4 == 2){
        data.col3.push(events[i]);
      }
      if(i%4 == 3) {
        data.col4.push(events[i]);
      }
    }
    this.trigger(data);
  },

});

module.exports = EventStore;
