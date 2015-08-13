var React = require('react');
var PropTypes = React.PropTypes;

var Header = React.createClass({

  render: function() {
    return (
      <head>
        <link type="text/css" rel="stylesheet" href="css/materialize.css" media="screen,projection"/>
        <link type="text/css" rel="stylesheet" href="css/nav.css" />

        <script type="text/javascript" src="js/jquery-2.1.4.min.js"></script>
        <script type="text/javascript" src="js/materialize.min.js"></script>
        <script type="text/javascript" src="js/sidenav.js"></script>

        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>{this.props.title}</title>
      </head>
    );
  }

});

module.exports = Header;
