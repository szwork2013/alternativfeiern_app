var React = require('react');
var PropTypes = React.PropTypes;
var FE_Layout = require('../layouts/frontend.jsx');

var Locations = React.createClass({

  render: function() {
    return (
      <FE_Layout title={this.props.title}>
        <main>
          <div className="container">
            <div className="row">
              <div className="s12 m9 l10">
                <h3>such locataions</h3>
              </div>
            </div>
          </div>
        </main>
      </FE_Layout>
    );
  }

});

module.exports = Locations;
