var React = require('react');
var moment = require('moment');
moment.locale('de')
var tz = require('moment-timezone');
var PropTypes = React.PropTypes;

var EventItem = React.createClass({
  handleCardClick : function(event){
    console.log('click');
    window.location('http://alternativ-feiern.de');
  },
  
  render: function() {
    var eventName = this.props.event.name;
    if(this.props.event.name.length > 25){
      eventName = eventName.substring(0, 25) + '...';
    }
    var sizeIndex = Math.floor((Math.random() * 3) + 1);
    var cardSize = sizeIndex == 3 ? "card medium" : "card small";
    var imgUrl = 'images/events/' + this.props.event.fbid + '.jpg';
    return (
      <div className={cardSize} onClick={this.handleCardClick}>
        <div className="card-image"><img src={imgUrl}></img>
        </div>
        <div className="card-content">
          <span className="card-title">{eventName}</span>
          <p>
          {moment(this.props.event.start).tz('Europe/Berlin').calendar()}
          </p>
        </div>
      </div>
    );
  }

});

module.exports = EventItem;
