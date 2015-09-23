var React = require('react');
var Header = require('./partials/header.jsx');
var SideNav = require('./partials/sidenav.jsx');
var TopNav = require('./partials/topnav.jsx');
var PropTypes = React.PropTypes;

var FE_Layout = React.createClass({

  render: function() {
    return (
      <html>
      <Header title={this.props.title}
              scripts={this.props.scripts}
              stylesheets={this.props.stylesheets}
              description={this.props.description}/>
        <body className="blue-grey darken-2">
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
