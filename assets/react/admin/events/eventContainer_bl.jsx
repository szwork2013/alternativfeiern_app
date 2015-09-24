var React = require('react');
var EventItem = require('./eventItem.jsx');
var apiUrl = require('../config/apiUrl.js');

var EventContainer  = React.createClass({
  getInitialState: function() {
    return {
      events : []
    };
  },

  componentWillMount: function() {
    this.getEvents();
  },

  getEvents : function() {
    var self = this;
    $.ajax({
      method : 'GET',
      url : apiUrl.host + '/api/events/page',
      data : {
        pageId : this.props.page.fbid
      },
      success : function(events) {
        self.setState({
          events : events
        });
      }
    });
  },

  blackListEvent : function(eventId) {
    var self = this;
    $.ajax({
      method  : 'POST',
      url     : apiUrl.host + '/api/events/blacklist',
      data    : {
        pageId : this.props.page.fbid,
        eventId : eventId,
      },
      success : function()  {
        self.getEvents();
      },
      error : function(err) {
      }
    });
  },

  render: function() {
    var blackList = this.blackListEvent;
    return (
      <ul className="collection with-header">
        <div className="collection-header teal lighten-1"><h5>{this.props.page.name}</h5></div>
          {this.state.events.map(function(event, index){
            event.blackList = blackList;
            if(event.isBlacklisted)
              return <EventItem event={event} key={index}></EventItem>
          })}
      </ul>
    );
  }

});

module.exports = EventContainer;
