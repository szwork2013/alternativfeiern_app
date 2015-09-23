var React = require('react');
var PropTypes = React.PropTypes;
var FE_Layout = require('../layouts/frontend.jsx');

var Newsletter = React.createClass({

  render: function() {
    return (
      <FE_Layout title={this.props.title} scripts={['newsletter.js']} stylesheets={[]} withTopNav>
        <meta name="description" content="Unser Newsletter versorgt dich jede Woche mit ausgesuchten alternativen Event-Empfehlungen"></meta>
        <main id="newsletterContainer">
        </main>
      </FE_Layout>
    );
  }

});

module.exports = Newsletter;
