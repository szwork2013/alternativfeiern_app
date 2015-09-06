var React = require('react/addons');
var PropTypes = React.PropTypes;
var EventItem = require('./eventitem.jsx');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var EventColumn = React.createClass({

  render: function() {
    return (
      <div className="col s12 m6 l4">
        <ReactCSSTransitionGroup transitionName="frontpage" transitionAppear={true}>
          {this.props.events.map(function(event, index){
              return <EventItem key={index} image event={event}></EventItem>
          })}
        </ReactCSSTransitionGroup>
      </div>
    );
  }

});

module.exports = EventColumn;
