var Reflux = require('reflux');
var $ = window.jQuery;
var EventActions = require('../Actions/EventActions.jsx');

var data = {
  name : 'Heute',
  hasEvents : false,
  col1 : [],
  col2 : [],
  col3 : [],
  list1 : [],
  list2 : []
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
    var half = Math.ceil(events.length/2);
    for(var i = 0; i < events.length; i++) {
      if(i%3 == 0){
        data.col1.push(events[i]);
      }
      if(i%3 == 1){
        data.col2.push(events[i]);
      }
      if(i%3 == 2){
        data.col3.push(events[i]);
      }
      if(i <= half) {
        data.list1.push(events[i]);
      } else {
        data.list2.push(events[i]);
      }
    }
    this.trigger(data);
  },

});

module.exports = EventStore;
