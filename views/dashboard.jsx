const DashboardLayout = require('./layouts/loggedIn');
const FB_connect = require('../facebook/fb_connect');
const Page_Manager = require('../facebook/page_manager');
const React = require('react');

var Dashboard = React.createClass({
  render: function() {
    return (
      <DashboardLayout title={this.props.title}>
        <div className="row">
          <div className="col s12 m4 l6" id="page__container"></div>
          <div className="col s12 m4 l6" id="event__container"></div>
        </div>
      </DashboardLayout>
    );
  }

});

module.exports = Dashboard;
