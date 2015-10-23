var Reflux = require('reflux');
var $ = window.jQuery;
var moment = window.moment;
var EventActions = require('../Actions/EventActions.jsx');
var TodayEventStore = require('./TodayEventStore.jsx');

var monthNames = [
  'Januar',
  'Februar',
  'März',
  'April',
  'Mai',
  'Juni',
  'Juli',
  'August',
  'September',
  'Oktober',
  'November',
  'Dezember'
];

var data = [];

var EventStore = Reflux.createStore({

  listenables : [EventActions],

  init: function() {
    console.log('FutureEventStore initialized');
    //if TodayEventStore triggers, start fetching future events
    this.listenTo(TodayEventStore, this.onFetchFuture);
  },

  onFetchFuture : function(){
    var self = this;
    data = [];
    $.ajax({
      url  : '/api/events/whitelisted/sorted',
      success : function(eventArrays){
        self.sortColumns(eventArrays);
      }
    });
  },

  sortColumns : function(eventArrays) {
    var currentMonth = new Date(Date.now()).getMonth();
    for(i = currentMonth; i < currentMonth + eventArrays.length; i++) {
      var index = i%12;
      var container = {
        name : monthNames[index],
        hasEvents : eventArrays[index].length > 0 ? true : false,
        events : []
      };
      var date = container.hasEvents ? moment(eventArrays[index][0].start).format('D') : null;
      var tmp = true;
      for(j = 0; j < eventArrays[index].length; j++) {
        var current = moment(eventArrays[index][j].start).format('D');
        while(current == date && j < eventArrays[index].length) {
          eventArrays[index][j].break = tmp;
          container.events.push(eventArrays[index][j]);
          j++;
          if(j < eventArrays[index].length) {
            current = moment(eventArrays[index][j].start).format('D');
          }
        }
        if(j < eventArrays[index].length){
          tmp = !tmp;
          eventArrays[index][j].break = tmp;
          container.events.push(eventArrays[index][j]);
          date = current;
        }
      }
      data.push(container);
    } /* end month container sort */
    this.trigger(data);
  }



});

module.exports = EventStore;
