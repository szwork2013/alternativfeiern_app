const DashboardLayout = require('../layouts/dashboard');
const React = require('react');

var Dashboard = React.createClass({
  render: function() {
    return (
      <DashboardLayout title={this.props.title}>
        <div id="dashboard">
          
        </div>
      </DashboardLayout>
    );
  }

});

module.exports = Dashboard;
