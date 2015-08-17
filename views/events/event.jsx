var React = require('react');
var PropTypes = React.PropTypes;
var FE_Layout = require('../layouts/frontend.jsx');

var EventPage = React.createClass({

  render: function() {
    return (
      <FE_Layout title={this.props.title} scripts={[]}>
        <main>
          <h4>{this.props.event.name}</h4>
        </main>
      </FE_Layout>
    );
  }

});

module.exports = EventPage;
