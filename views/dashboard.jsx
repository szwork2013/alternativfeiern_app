const DashboardLayout = require('./layouts/loggedIn');
const FB_connect = require('../facebook/fb_connect');
const Page_Manager = require('../facebook/page_manager');
const React = require('react');

var Dashboard = React.createClass({
  render: function() {
    return (
      <DashboardLayout title={this.props.title}>
        //TODO List different things: pages, events, etc.
      </DashboardLayout>
    );
  }

});

module.exports = Dashboard;
