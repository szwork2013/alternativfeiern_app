const DashboardLayout = require('./layouts/loggedIn');
const React = require('react');

var Dashboard = React.createClass({
  render: function() {
    return (
      <DashboardLayout title={this.props.title}>
        <div className="row">
          <div className="col s12">
            <ul className="tabs dashboard">
              <li className="tab col s4">
                <a href="#page__container">Seiten</a>
              </li>
              <li className="tab col s4">
                <a href="#event__container-bl">Events - Blacklist</a>
              </li>
              <li className="tab col s4">
                <a href="#event__container-wl">Events - Whitelist</a>
              </li>
            </ul>
          </div>
          <div className="container">
            <div className="col s12" id="page__container"></div>
          </div>
          <div className="container">
            <div className="col s12" id="event__container-bl"></div>
          </div>
          <div className="container">
            <div className="col s12" id="event__container-wl"></div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

});

module.exports = Dashboard;
