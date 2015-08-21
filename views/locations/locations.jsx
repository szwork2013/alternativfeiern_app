var React = require('react');
var PropTypes = React.PropTypes;
var FE_Layout = require('../layouts/frontend.jsx');

var Locations = React.createClass({

  render: function() {
    return (
      <FE_Layout title={this.props.title} scripts={[]} stylesheets={[]} withTopNav>
        <main>
        <div className="row">
          {/* Tab navigation*/}
          <div className="col s12" style={{padding : 0}}>
            <ul className="tabs">
              <li className="tab col s3"><a href="#test1">Nbg</a></li>
              <li className="tab col s3"><a href="#test2">Frth</a></li>
              <li className="tab col s3"><a href="#test3">Erlng</a></li>
              <li className="tab col s3"><a href="#test4">Ansbch</a></li>
            </ul>
          </div>
          {/* Tab content*/}
          <div id="test1" className="col s12">Nürnberg</div>
          <div id="test2" className="col s12">Fürth</div>
          <div id="test3" className="col s12">Erlangen</div>
          <div id="test4" className="col s12">Ansbach</div>
        </div>
        </main>
      </FE_Layout>
    );
  }

});

module.exports = Locations;
