var React = require('react');
var moment = window.moment;
moment.locale('de');
var tz = require('moment-timezone');

var EventListItem = React.createClass({

  render: function() {
    var eventUrl = '/events/' + this.props.data.fbid;
    var time = moment(this.props.data.start);
    var weekday = time.format('dd');
    var dayOfMonth = time.format('D');
    var hour = time.format('H');
    var min = time.format('mm');

    var style = {
      backgroundColor : '#55C954'
    }
    if(!this.props.data.break) {
      style.backgroundColor = '#00695c'
    }
    return (
      <div className="card listCard hoverable">
        <a href={'/events/' + this.props.data.fbid}>
          <div className="card-content">
            <div className="date" style={style}>
              <div className="weekday">{weekday}</div>
              <div className="dayOfMonth">{dayOfMonth}.</div>
              <div className="time">
                <span className="hours">{hour}<sup>{min}</sup></span>
              </div>
            </div>
            <div className="info">
              <div className="title">{this.props.data.name}</div>
              <div className="location">{this.props.data.location}</div>
            </div>
          </div>
        </a>
      </div>
    );
  }

});

module.exports = EventListItem;
