var React = require('react');
var FE_Layout = require('../layouts/frontend.jsx');

var Frontpage = React.createClass({
  render: function() {
    return (
      <FE_Layout title={this.props.title} scripts={['/js/frontpage.js']} stylesheets={[]} withTopNav>
        <main>
          <div className="container">
            <div className="row" id="todayevents" style={{marginBottom : 0}}>
              {/* today events client side*/}
            </div>
            <div className="row" id="futureevents">
              {/* future events client side*/}
            </div>
          </div>
        </main>
      </FE_Layout>
    );
  }
});

module.exports = Frontpage;
