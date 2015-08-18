var React = require('react');
var PropTypes = React.PropTypes;
var FE_Layout = require('../layouts/frontend.jsx');
var moment = require('moment');
moment.locale('de')
var tz = require('moment-timezone');

var EventPage = React.createClass({

  render: function() {
    var imgUrl = '/images/events/' + this.props.event.fbid + '.jpg';
    var fbUrl = 'https://facebook.com/' + this.props.event.fbid;
    return (
      <FE_Layout title={this.props.title} scripts={[]} stylesheets={['/css/events.css']}>
        <main>
          <div className="container">
            <div className="row">
              <div className="col s12 m12 l12">
                <div className="card">
                  <div className="card-image singleEvent">
                    <img src={imgUrl}></img>
                  </div>
                  <div className="card-content">
                    <h5>{this.props.event.name}</h5>
                    <ul className="collection">
                      <li className="collection-item">Start: <b>{moment(this.props.event.start).tz('Europe/Berlin').calendar()}</b></li>
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
              </div>
            </div>
          </div>
        </main>
      </FE_Layout>
    );
  }

});

module.exports = EventPage;
