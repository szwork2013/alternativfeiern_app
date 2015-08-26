var React = require('react');
var PropTypes = React.PropTypes;

var Header = React.createClass({

  render: function() {
    return (
      <head>
        <link type="text/css" rel="stylesheet" href="/css/materialize.css" media="screen,projection"/>
        <link type="text/css" rel="stylesheet" href="/css/nav.css" />
        <link type="text/css" rel="stylesheet" href="/css/global.css" />

        {this.props.stylesheets.map(function(css){
          return <link type="text/css" rel="stylesheet" href={css} />
        })}

        <script type="text/javascript" src="/js/jquery-2.1.4.min.js"></script>
        <script type="text/javascript" src="/js/materialize.min.js"></script>
        <script type="text/javascript" src="/js/sidenav.js"></script>
        <script type="text/javascript" src="/js/moment-with-locales.js"></script>
        <script type="text/javascript" src="/js/moment-timezone.js"></script>

        {this.props.scripts.map(function(script){
          return <script type="text/javascript" src={script}></script>
        })}

        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>{this.props.title + ' - Alternativ-Feiern'}</title>
      </head>
    );
  }

});

module.exports = Header;
