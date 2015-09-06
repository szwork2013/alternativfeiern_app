var React = require('react');
var PropTypes = React.PropTypes;

var colors = [
  'red',
  'indigo',
  'cyan',
  'teal',
  'light-blue',
  'yellow',
  'orange',
  'deep-orange'
];

var OrganizerItem = React.createClass({
  render: function() {
    var rndIndex = Math.floor(Math.random() * colors.length);
    var className = 'card hoverable organizer__card ' + colors[rndIndex] + ' accent-4 organizer-appear';
    return (
      <div className={className} style={{opacity : '0.01'}}>
        <a href={this.props.website} target="_blank">
          <div className="card-content white-text">
            <span className="card-title">{this.props.title}</span>
          </div>
        </a>
      </div>
    );
  }

});

module.exports = OrganizerItem;
