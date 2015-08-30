var React = require('react');
var moment = window.moment;
moment.locale('de');
var tz = require('moment-timezone');
var PropTypes = React.PropTypes;

var EventListItem = React.createClass({

  render: function() {
    var eventName = this.props.data.name;
    var eventUrl = '/events/' + this.props.data.fbid;

    return (
      <a href={eventUrl} className="collection-item" style={{color : '#000'}}>
        <span className="eventlistitem__start">{moment(this.props.data.start).tz('Europe/Berlin').calendar()}  |</span>
        <span style={{fontWeight : 'bold'}}>  {eventName}</span>
      </a>
    );
  }

});

module.exports = EventListItem;
