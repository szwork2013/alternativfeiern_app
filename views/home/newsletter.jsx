var React = require('react');
var PropTypes = React.PropTypes;
var FE_Layout = require('../layouts/frontend.jsx');

var Newsletter = React.createClass({

  render: function() {
    return (
      <FE_Layout title={this.props.title} scripts={['newsletter.js']} stylesheets={[]} withTopNav>
        <main id="newsletterContainer">
        </main>
      </FE_Layout>
    );
  }

});

module.exports = Newsletter;
