var React = require('react/addons');
var EventItem = require('./eventitem.jsx');
var Transition = React.addons.CSSTransitionGroup;

var EventColumn = React.createClass({

  render: function() {
    return (
      <div className="col s12 m6 l4">
        {this.props.events.map(function(event, index){
            return (
              <Transition transitionName="easeIn" transitionAppear={true}>
                <EventItem key={index} image event={event}></EventItem>
              </Transition>
            );
        })}
      </div>
    );
  }

});

module.exports = EventColumn;
