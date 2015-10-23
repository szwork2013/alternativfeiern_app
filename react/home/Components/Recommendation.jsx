var React = require('react');
var PropTypes = React.PropTypes;
var RecommendationItem = require('./recommendationItem.jsx');

var Recommendation = React.createClass({

  render: function() {
    return (
      <div className="recommendation">
        {this.props.first ? <h4>Empfehlung</h4> : null}
        {this.props.data.map(function(event, index){
          return event.isRecommended ? <RecommendationItem key={index} image event={event} /> : null
        })}
      </div>
    );
  }

});

module.exports = Recommendation;
