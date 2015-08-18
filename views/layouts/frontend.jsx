var React = require('react');
var Header = require('./partials/header.jsx');
var SideNav = require('./partials/sidenav.jsx');
var TopNav = require('./partials/topnav.jsx');
var PropTypes = React.PropTypes;

var FE_Layout = React.createClass({

  render: function() {
    return (
      <html>
      <Header title={this.props.title} scripts={this.props.scripts} stylesheets={this.props.stylesheets}/>
        <body className="blue-grey lighten-3">
          {/*<div className="backgroundFonts">
          nürnberg<br />
          feiern<br />
          muz<br />
          festival<br />
          babylon<br />
          fürth<br />
          openair<br />
          alternativ<br />
          k4<br />
          letitbetechno<br />
          nano<br />
          erlangen<br />
          monstersofjungle<br />
          dubworxx<br />
          festival<br />
          babylon<br />
          fürth<br />
          openair<br />
          alternativ<br />
          k4<br />
          letitbetechno<br />
          nano<br />
          alternativ<br />
          k4<br />
          letitbetechno<br />
          nano<br />
          erlangen<br />
          monstersofjungle<br />
          dubworxx<br />
          festival<br />
          babylon<br />
          fürth<br />
          </div>*/}
          <SideNav title={this.props.title}>
            {this.props.withTopNav ? <TopNav title={this.props.title}></TopNav> : null}
          </SideNav>
          {this.props.children}
        </body>

      </html>
    );
  }

});

module.exports = FE_Layout;
