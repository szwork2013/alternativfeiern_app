const React = require('react');

const DefaultLayout = React.createClass({
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
          <div className="container">
              {this.props.children}
          </div>
        </body>
      </html>
    );
  }
});

module.exports = DefaultLayout;
