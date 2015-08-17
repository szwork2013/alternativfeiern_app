var React = require('react');
var moment = require('moment');
moment.locale('de')
var tz = require('moment-timezone');
var PropTypes = React.PropTypes;

var EventItem = React.createClass({
  getInitialState: function() {
    return {
      extSwitched : false,
    };
  },
  changeImageExt : function(event){
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
    var sizeIndex = Math.floor((Math.random() * 3) + 1);
    //var cardSize = sizeIndex == 3 ? "card medium" : "card small";
    var cardSize = 'card medium';
    var imgUrl = 'images/events/' + this.props.event.fbid + '.jpg';
    return (
      <div className={cardSize}>
        <div className="card-image"><img src={imgUrl} onError={this.changeImageExt} ref="cardImage"></img>
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
