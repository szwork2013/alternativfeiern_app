var React = require('react');
var DefaultLayout = require('./layouts/loggedOut');

var HelloMessage = React.createClass({
  render: function() {
    return (
      <DefaultLayout title={this.props.title}>
        <a href="/login">Login</a>
      </DefaultLayout>
    );
  }
});

module.exports = HelloMessage;
