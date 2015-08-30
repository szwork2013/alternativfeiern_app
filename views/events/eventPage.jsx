const React = require('react');
const PropTypes = React.PropTypes;
const FE_Layout = require('../layouts/frontend.jsx');
const BackButton = require('../layouts/partials/backbutton.jsx');
const fs = require('fs');
const path = require('path');
var moment = require('moment');
moment.locale('de')
const tz = require('moment-timezone');

var imgStyle = {
  display : 'block'
}

var EventPage = React.createClass({

  render: function() {
    var imgUrl = '/images/events/' + this.props.event.fbid + '.jpg';
    var fbUrl = 'https://facebook.com/' + this.props.event.fbid;
    /*
      live: '/var/www/AF_Backend/assets'
      switches img extension to png if jpg is not found.
      hides picture if no png ist found.
    */
    if(!fs.existsSync(path.resolve(__dirname, '../../assets' + imgUrl))){
      imgUrl = '/images/events/' + this.props.event.fbid + '.png';
      if(!fs.existsSync(path.resolve(__dirname, '../../assets' + imgUrl))){
        imgStyle.display = 'none';
      }
    }
    return (
      <FE_Layout title={this.props.title} scripts={[]} stylesheets={['sideNavBtn.css']}>
        <BackButton></BackButton>
        <main>
                <div className="card singlePage__card">
                  <div className="card-image singlePage__img">
                    <img src={imgUrl} style={imgStyle}></img>
                  </div>
                  <div className="card-content singlePage__content">
                    <h5>{this.props.event.name}</h5>
                    <ul className="collection">
                      <li className="collection-item">Start: <b>{moment(this.props.event.start).format('lll')}</b></li>
                      <li className="collection-item">Location: <b>{this.props.event.location}</b></li>
                    </ul>
                    <p>
                      {this.props.event.description}
                    </p>
                  </div>
                  <div className="card-action">
                    <a href={fbUrl} target="_blank">Facebook Event</a>
                  </div>
                </div>
        </main>
      </FE_Layout>
    );
  }

});

module.exports = EventPage;
