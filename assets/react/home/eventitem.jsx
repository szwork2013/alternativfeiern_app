var React = require('react');
var moment = window.moment;
moment.locale('de');
var tz = require('moment-timezone');
var PropTypes = React.PropTypes;

var EventItem = React.createClass({
  getInitialState: function() {
    return {
      extSwitched : false,
    };
  },

  changeImageExt : function(event) {
    if(!this.state.extSwitched){
      var img = React.findDOMNode(this.refs.cardImage);
      img.src = img.src.replace(/\.jpg/, '.png');
      this.setState({
        extSwitched : true
      });
    }
  },

  render: function() {
    var eventName = this.props.event.name;
    if(this.props.event.name.length > 25){
      eventName = eventName.substring(0, 25) + '...';
    }
    var cardSize = 'card medium';
    var imgUrl = 'images/events/small_' + this.props.event.fbid + '.jpg';
    var eventUrl = '/events/' + this.props.event.fbid;
    return (
      <div className={cardSize}>
        <a href={eventUrl}>
          <div className="card-image">
            <img src={imgUrl} onError={this.changeImageExt} ref="cardImage"></img>
          </div>
        </a>
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
