var React = require('react');
var PropTypes = React.PropTypes;
var FE_Layout = require('../layouts/frontend.jsx');

var Festivals = React.createClass({

  render: function() {
    return (
      <FE_Layout title={this.props.title} scripts={['festivals.js']} stylesheets={[]} withTopNav>
        <meta name="description"
              content="Eine Übersicht lokaler alternativer Festivals.
                      Hier findest du Informationen zu den Veranstaltungsorten sowie zu den Ticket-Preisen."></meta>
        <main id="festivalOverview">
        </main>
      </FE_Layout>
    );
  }

});

module.exports = Festivals;
