var React = require('react');
var FE_Layout = require('../layouts/frontend.jsx');

var Frontpage = React.createClass({
  render: function() {
    return (
      <FE_Layout title={this.props.title} scripts={['frontpage.js']} stylesheets={[]} withTopNav>
        <main id="frontpage">
        </main>
      </FE_Layout>
    );
  }
});

module.exports = Frontpage;
