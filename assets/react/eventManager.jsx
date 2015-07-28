const React = require('react');
const $ = window.jQuery;
const PropTypes = React.PropTypes;
const EventItem = require('./partials/eventItem.jsx')

const EventManager = React.createClass({
  getInitialState: function() {
    return {
      events: []
    };
  },

  componentWillMount: function() {
    this.getEvents();
  },

  getEvents : function() {
    var self = this;
    $.ajax({
      url: 'http://localhost:8000/api/events/all/short',
      success : function(events) {
        self.setState({
          events  : events
        });
      }
    });
  },

  blackListEvent : function(eventId) {
    var self = this;
    $.ajax({
      method  : 'POST',
      url     : 'http://localhost:8000/api/events/blacklist',
      data    : {
        eventId : eventId
      },
      success : function()  {
        console.log('blacklisted');
        self.getEvents();
      },
      error : function(err) {
        console.log(err);
      }
    });
  },

  render: function() {
    var blackList = this.blackListEvent;
    return (
      <div>
        <h3>Events</h3>
        <ul className="collection">
          {this.state.events.map(function(event, index){
            event.blackList = blackList;
            return <EventItem event={event} key={index}></EventItem>
          })}
        </ul>
      </div>
    );
  }
});

module.exports = EventManager;
