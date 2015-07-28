const React = require('react');
const PropTypes = React.PropTypes;

const weekdays = [
  'Mo',
  'Di',
  'Mi',
  'Do',
  'Fr',
  'Sa',
  'So'
];

var EventItem = React.createClass({
  blackListEvent : function(){
    this.props.event.blackList(this.props.event.id);
  },

  render: function() {
    var fbUrl = "https://www.facebook.com/" + this.props.event.id;
    var t = new Date(this.props.event.start_time);
    var startTime = t.toLocaleDateString();
    var day = weekdays[t.getDay()];
    return (
      <li className="collection-item avatar">
        <span className="title"><b>{this.props.event.name}</b></span>
        <p>
          {this.props.event.location}
        </p>
        <p>
          {/*day + ' ' + startTime*/}
          {this.props.event.start_time}
        </p>
        <p>
          <a href={fbUrl} target="_blank">Facebook-Event</a>
        </p>
        <button className="waves-effect waves-light secondary-content btn-floating red" onClick={this.blackListEvent}>x</button>
      </li>
    );
  }

});

module.exports = EventItem;
