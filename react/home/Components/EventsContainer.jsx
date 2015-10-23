var React = require('react');
var PropTypes = React.PropTypes;
var moment = window.moment;
moment.locale('de');
var EventListItem = require('./eventlistitem.jsx');
var Recommendation = require('./Recommendation.jsx');

var EventsContainer = React.createClass({

  render: function() {
    return (
      <div className="section monthContainer">
        <div className="row">
          <h4 className="container__title">{this.props.data.name}</h4>
          <div className="col s12">
            <div className="col s12 l6">
              {this.props.data.events.map(function(event, index, events){
                return <EventListItem data={event} key={index} />
              })}
            </div>
            <div className="col s12 l6">
            {this.props.first ?  <Recommendation data={this.props.data.events} first/> : <Recommendation data={this.props.data.events} /> }
            </div>
          </div>
        </div>
      </div>
    );
  }

});

module.exports = EventsContainer;
