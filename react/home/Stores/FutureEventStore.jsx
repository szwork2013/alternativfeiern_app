var Reflux = require('reflux');
var $ = window.jQuery;
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
        col1 : [],
        col2 : [],
        col3 : [],
        list1 : [],
        list2 : []
      };
      var half = Math.ceil(eventArrays[index].length/2);
      for(j = 0; j < eventArrays[index].length; j++) {
        if(j%3 == 0){
          container.col1.push(eventArrays[index][j]);
        }
        if(j%3 == 1){
          container.col2.push(eventArrays[index][j]);
        }
        if(j%3 == 2){
          container.col3.push(eventArrays[index][j]);
        }
        if(j <= half) {
          container.list1.push(eventArrays[index][j]);
        } else {
          container.list2.push(eventArrays[index][j]);
        }
      } /* end column sort */
      data.push(container);
    } /* end month container sort */
    this.trigger(data);
  }



});

module.exports = EventStore;
