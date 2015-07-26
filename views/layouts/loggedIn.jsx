var React = require('react');
var PropTypes = React.PropTypes;

var DashboardLayout = React.createClass({

  render: function() {
    return (
      <html>
        <head>
          <link type="text/css" rel="stylesheet" href="css/materialize.min.css" media="screen,projection"/>
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          <title>{this.props.title}</title>
        </head>
        <body>
          <script type="text/javascript" src="js/jquery-2.1.4.min.js"></script>
          <script type="text/javascript" src="js/materialize.min.js"></script>
          <div className="navbar-fixed">
            <nav className="teal darken-3">
              <div className="nav-wrapper">
                <a href="#!" className="brand-logo">AF Backend</a>
                <ul className="right hide-on-med-and-down">
                  <li><a href="/logout">Logout</a></li>
                </ul>
              </div>
            </nav>
          </div>
          <div className="container">
            {this.props.children}
          </div>
        </body>
      </html>
    );
  }

});

module.exports = DashboardLayout;
