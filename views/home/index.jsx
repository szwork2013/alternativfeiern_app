var React = require('react');
var FE_Layout = require('../layouts/frontend.jsx');
const description = "Aktuelle Events in und um Nürnberg ✓ Täglich neue Veranstaltungen ✓ Sammlung der besten Locations ✓ Alternative Festivals";

var Frontpage = React.createClass({
  render: function() {
    return (
      <FE_Layout title={this.props.title} scripts={['frontpage.js']} stylesheets={[]} withTopNav description={description}>
        <main id="frontpage">
        </main>
      </FE_Layout>
    );
  }
});

module.exports = Frontpage;
