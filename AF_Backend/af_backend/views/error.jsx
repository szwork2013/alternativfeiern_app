const React = require('react');
const DefaultLayout = require('./layouts/default');

var HelloMessage = React.createClass({
  render: function(){
    return (
      <DefaultLayout title={this.props.title}>
        {this.props.error}
      </DefaultLayout>
    );
  }
});

module.exports = HelloMessage;
