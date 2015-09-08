var React = require('react');
var PropTypes = React.PropTypes;
var FE_Layout = require('../layouts/frontend.jsx');

var Festivals = React.createClass({

  render: function() {
    return (
      <FE_Layout title={this.props.title} scripts={['festivals.js']} stylesheets={[]} withTopNav>
        <main id="festivalOverview">
        </main>
      </FE_Layout>
    );
  }

});

module.exports = Festivals;
