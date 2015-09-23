var React = require('react');
var PropTypes = React.PropTypes;
var FE_Layout = require('../layouts/frontend.jsx');

var Locations = React.createClass({

  render: function() {
    return (
      <FE_Layout title={this.props.title} scripts={['locations.js']} stylesheets={['locations.css']} withTopNav>
        <meta name="description" content="Entspannter Kneipfenabend oder ausgiebig Feiern? Hier gibt´s eine Überischt
          der besten alternativen Locations im Raum Nürnberg."></meta>
        <main id="locationOverview">
        </main>
      </FE_Layout>
    );
  }

});

module.exports = Locations;
