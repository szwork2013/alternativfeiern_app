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

const EventItem  = React.createClass({

  blacklist : function(){
    this.props.event.blackList(this.props.event.fbid);
  },

  render: function() {
    var fbUrl = 'https://www.facebook.com/' + this.props.event.fbid;
    var unlistBtn = <a className="btn waves-effect green">+</a>;
    var listBtn = <a className="btn waves-effect red" onClick={this.blacklist}>x</a>;
    var date = Date.parse(this.props.event.start);
    //date = date.toLocaleDateString();
    return (
      <li className="collection-item">
        <div className="row">
          <a href={fbUrl} target="_blank">
            <div className="col s6 eventLink">
                {this.props.event.name}
            </div>
          </a>
          <div className="col s4">{date}</div>
          <div className="col s2">
            {this.props.event.isBlacklisted ? unlistBtn : listBtn}
          </div>
        </div>
      </li>
    );
  }
});

module.exports = EventItem;
