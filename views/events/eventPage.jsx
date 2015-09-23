const React = require('react');
const PropTypes = React.PropTypes;
const FE_Layout = require('../layouts/frontend.jsx');
const BackButton = require('../layouts/partials/backbutton.jsx');
const fs = require('fs');
const path = require('path');
var moment = require('moment');
moment.locale('de')
const tz = require('moment-timezone');

var EventPage = React.createClass({

  render: function() {
    var imgUrl = '/images/events/' + this.props.event.img;
    var fbUrl = 'https://facebook.com/' + this.props.event.fbid;
    if(this.props.event.description && this.props.event.location && this.props.event.start) {
      var startTime = moment(this.props.event.start).format('lll');
      var location = this.props.event.location;
      var metaDescription = startTime + ' | ' +
                            location  + ' | ' +
                            this.props.event.description.slice(0, 100);
    }
    return (
      <FE_Layout title={this.props.title} scripts={[]} stylesheets={['sideNavBtn.css']} description={metaDescription}>
        <BackButton></BackButton>
        <meta name="description" content={metaDescription}></meta>
        <meta property="og:image" content={imgUrl}></meta>
        <main>
                <div className="card singlePage__card">
                  <div className="card-image singlePage__img">
                    <img src={imgUrl}></img>
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
