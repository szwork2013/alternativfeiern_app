var React = require('react');
var PropTypes = React.PropTypes;
var MonthContainer = require('./monthcontainer.jsx');
var EventItem = require('./eventitem.jsx');
var $ = window.jQuery;

var FutureEvents = React.createClass({
  getInitialState: function() {
    return {
      events : [[]],
    };
  },

  componentWillMount: function() {
    var self = this;
    $.ajax({
      type : 'GET',
      url  : '/api/events/whitelisted/sorted',
      success : function(data){
        self.sortMonths(data);
      },
      error : function(err) {
        console.log(err);
      }
    });

  },

  sortMonths : function(events){
    var now = new Date(Date.now());
    var monthNow = now.getMonth();
    var sortedEvents = [];
    for(var i = monthNow; i < monthNow + events.length; i++){
      if(events[i] == undefined){
        sortedEvents.push([]);
      } else {
        sortedEvents.push(events[i]);
      }
    }
    this.setState({
      events : sortedEvents
    });
  },

  render: function() {
    if(this.state.events.length > 0){
      return (
        <div>
          {this.state.events.map(function(monthlyEvents, index){
            console.log(monthlyEvents.length);
            return (monthlyEvents.length > 0) ? <MonthContainer key={index} events={monthlyEvents}></MonthContainer> : null
          })}
        </div>
      );
    } else {
      return (
        <div></div>
      )
    }
  }

});

module.exports = FutureEvents;
