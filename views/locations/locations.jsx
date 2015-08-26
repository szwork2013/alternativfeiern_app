var React = require('react');
var PropTypes = React.PropTypes;
var FE_Layout = require('../layouts/frontend.jsx');

var Locations = React.createClass({

  render: function() {
    return (
      <FE_Layout title={this.props.title} scripts={['/js/locations.js']} stylesheets={['/css/locations.css']} withTopNav>
        <main id="locationOverview">
        </main>
      </FE_Layout>
    );
  }

});

module.exports = Locations;
