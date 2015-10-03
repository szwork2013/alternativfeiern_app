var React = require('react');
var EventItem = require('./eventItem.jsx');
var apiUrl = require('../config/apiUrl.js');

var EventContainer  = React.createClass({
  getInitialState: function() {
    return {
      events : []
    };
  },

  blacklist : function(eventId) {
    this.props.blacklist(this.props.page.fbid, eventId);
  },

  render: function() {
    var self = this;
    return (
      <ul className="collection with-header">
        <div className="collection-header teal lighten-1"><h5>{this.props.page.name}</h5></div>
          {this.props.events.map(function(event, index){
            return <EventItem event={event} key={index} blacklist={self.blacklist}></EventItem>
          })}
      </ul>
    );
  }

});

module.exports = EventContainer;
