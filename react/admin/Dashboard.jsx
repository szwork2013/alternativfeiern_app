var React = require('react');
var PropTypes = React.PropTypes;

var PageManager = require('./Components/pages/pageManager.jsx');
var Blacklist = require('./Components/events/blacklist.jsx');
var Whitelist = require('./Components/events/whitelist.jsx');
var LocationManager = require('./Components/locations/locationManager.jsx');
var FestivalManager = require('./Components/festivals/festivalManager.jsx');

var Dashboard = React.createClass({

  render: function() {
    return (
      <div className="row">
        {/* tab navigation */}
        <div className="col s12">
          <ul className="tabs dashboard">
            <li className="tab col s3">
              <a href="#page__container">Seiten</a>
            </li>
            <li className="tab col s3">
              <a href="#event__container-bl">Events - Blacklist</a>
            </li>
            <li className="tab col s3">
              <a href="#event__container-wl">Events - Whitelist</a>
            </li>
            <li className="tab col s3">
              <a href="#location__container">Locations</a>
            </li>
            <li className="tab col s3">
              <a href="#festival__container">Festivals</a>
            </li>
          </ul>
        </div>
        {/* tab content */}
        <div className="container">
          <div className="col s12" id="page__container">
            <PageManager />
          </div>
        </div>
        <div className="container">
          <div className="col s12" id="event__container-bl">
            <Blacklist />
          </div>
        </div>
        <div className="container">
          <div className="col s12" id="event__container-wl">
            <Whitelist />
          </div>
        </div>
        <div className="container">
          <div className="col s12" id="location__container">
            <LocationManager />
          </div>
        </div>
        <div className="container">
          <div className="col s12" id="festival__container">
            <FestivalManager />
          </div>
        </div>
      </div>
    );
  }

});

module.exports = Dashboard;
