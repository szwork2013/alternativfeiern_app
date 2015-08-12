var React = require('react');
var Header = require('./partials/header.jsx');
var SideNav = require('./partials/sidenav.jsx');
var PropTypes = React.PropTypes;

var FE_Layout = React.createClass({

  render: function() {
    return (
      <html>
      <Header title={this.props.title}/>
        <body className="blue-grey lighten-3">
          <SideNav title={this.props.title}></SideNav>
          {this.props.children}
        </body>

      </html>
    );
  }

});

module.exports = FE_Layout;
