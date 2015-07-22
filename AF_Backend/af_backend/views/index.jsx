var React = require('react');
var DefaultLayout = require('./layouts/default');

var HelloMessage = React.createClass({
  render: function() {
    return (
      <DefaultLayout title={this.props.title}>
        <div>Hello {this.props.title}</div>
        <a href="/signup">Signup</a>
        <br />
        <a href="/login">Login</a>
      </DefaultLayout>
    );
  }
});

module.exports = HelloMessage;
