const React = require('react');
const DefaultLayout = require('./layouts/default');

var HelloMessage = React.createClass({
  render: function(){
    return (
      <DefaultLayout title={this.props.title}>
        <div>Hello {this.props.title}</div>
      </DefaultLayout>
    );
  }
});

module.exports = HelloMessage;
