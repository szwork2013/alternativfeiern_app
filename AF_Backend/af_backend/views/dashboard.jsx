const DefautLayout = require('./layouts/default');
var React = require('react');

var Dashboard = React.createClass({

  render: function() {
    return (
      <DefautLayout>
        <span>Logged in as: {this.props.user.email}</span>
        <a href="/logout">Logout</a>
      </DefautLayout>
    );
  }

});

module.exports = Dashboard;
