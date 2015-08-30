var React = require('react');
var PropTypes = React.PropTypes;
var EventItem = require('./eventitem.jsx');

var EventColumn = React.createClass({

  render: function() {
    return (
      <div className="col s12 m6 l4">
        {this.props.events.map(function(event, index){
            return <EventItem key={index} image event={event}></EventItem>
        })}
      </div>
    );
  }

});

module.exports = EventColumn;
