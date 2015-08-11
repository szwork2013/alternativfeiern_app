var React = require('react');
var PropTypes = React.PropTypes;

var BE_Layout = React.createClass({

  render: function() {
    return (
      <html>
        <head>
          <link type="text/css" rel="stylesheet" href="css/materialize.min.css" media="screen,projection"/>
          <link type="text/css" rel="stylesheet" href="css/dashboard.css" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          <title>{this.props.title}</title>
        </head>
        <body>
          <script type="text/javascript" src="js/jquery-2.1.4.min.js"></script>
          <script type="text/javascript" src="js/materialize.min.js"></script>
          <div className="navbar-fixed">
            <nav className="teal darken-3">
              <div className="nav-wrapper">
                <ul className="right hide-on-med-and-down">
                  <li><a href="http://alternativ-feiern.de/" target="_blank">Website</a></li>
                  <li><a href="http://alternativ-feiern.de/wp-admin/" target="_blank">Wordpress</a></li>
                  <li><a href="https://us10.admin.mailchimp.com/" target="_blank">Mailchimp</a></li>
                  <li><a href="http://piwik.alternativ-feiern.de/index.php" target="_blank">Piwik</a></li>
                  <li className="teal darken-2"><a href="/logout">Logout</a></li>
                </ul>
              </div>
            </nav>
          </div>
          {this.props.children}
          <script src="js/bundle.js" type="text/javascript"></script>
        </body>
      </html>
    );
  }

});

module.exports = BE_Layout;
