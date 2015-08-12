var React = require('react');
var FE_Layout = require('../layouts/frontend.jsx');
var FrontEvents = require('./partials/frontevents.jsx');

var Frontpage = React.createClass({
  render: function() {
    return (
      <FE_Layout title={this.props.title}>
        <main>
          <div className="container">
            <div className="row">
              <div className="s12 m9 l10">
                <FrontEvents></FrontEvents>
              </div>
            </div>
          </div>
        </main>
      </FE_Layout>
    );
  }
});

module.exports = Frontpage;
