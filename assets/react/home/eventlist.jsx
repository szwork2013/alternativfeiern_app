var React = require('react');
var PropTypes = React.PropTypes;
var EventListItem = require('./eventlistitem.jsx');

var EventList = React.createClass({

  render: function() {
    return (
      <div className="col s12 m12 l6">
        <div className="collection" style={{border : 'none'}}>
          {this.props.events.map(function(event, index){
            return <EventListItem data={event} key={index}/>
          })}
        </div>
      </div>
    );
  }

});

module.exports = EventList;
