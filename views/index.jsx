var React = require('react');
var FE_Layout = require('./layouts/frontend.jsx');

var Frontpage = React.createClass({
  render: function() {
    return (
      <FE_Layout title={this.props.title}>
        
      </FE_Layout>
    );
  }
});

module.exports = Frontpage;
