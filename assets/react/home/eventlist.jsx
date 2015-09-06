var React = require('react/addons');
var PropTypes = React.PropTypes;
var EventListItem = require('./eventlistitem.jsx');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var EventList = React.createClass({

  render: function() {
    return (
      <div className="col s12 m12 l6">
        <div className="collection" style={{border : 'none'}}>
          <ReactCSSTransitionGroup transitionName="frontpage" transitionAppear={true}>
            {this.props.events.map(function(event, index){
              return <EventListItem data={event} key={index}/>
            })}
          </ReactCSSTransitionGroup>
        </div>
      </div>
    );
  }

});

module.exports = EventList;
