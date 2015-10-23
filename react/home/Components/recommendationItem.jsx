var React = require('react');
var moment = window.moment;
moment.locale('de');
var tz = require('moment-timezone');
var PropTypes = React.PropTypes;
var Image = require('legit-image');

var RecommendationItem = React.createClass({

  hideImg : function(event){
    event.target.style.display = 'none';
  },

  render: function() {
    var eventName = this.props.event.name;
    var imgUrl = 'images/events/' + this.props.event.img_small;
    var eventUrl = '/events/' + this.props.event.fbid;
    return (
      <div className="recommendationItem">
        <a href={eventUrl}>
          <Image src={imgUrl} onError={this.hideImg} />
        </a>
        <span className="title">{eventName}</span>
        <ul className="collection">
          <li className="collection-item">
            {moment(this.props.event.start).tz('Europe/Berlin').calendar()}
          </li>
          <li className="collection-item">
            {this.props.event.location}
          </li>
        </ul>
      </div>
    );
  }

});

module.exports = RecommendationItem;
