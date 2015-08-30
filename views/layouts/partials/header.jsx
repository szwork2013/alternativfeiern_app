var React = require('react');
var PropTypes = React.PropTypes;

var Header = React.createClass({

  render: function() {
    return (
      <head>
        <link rel="icon" href="/images/logos/brand_logo.png" type="img/png" />
        <link type="text/css" rel="stylesheet" href="/css/materialize.css" media="screen,projection"/>
        <link type="text/css" rel="stylesheet" href="/css/global.css" />

        {this.props.stylesheets.map(function(css){
          return <link type="text/css" rel="stylesheet" href={'/css/' + css} />
        })}

        <script type="text/javascript" src="/js/jquery-2.1.4.min.js"></script>
        <script type="text/javascript" src="/js/materialize.min.js"></script>
        <script type="text/javascript" src="/js/sidenav.js"></script>
        <script type="text/javascript" src="/js/moment-with-locales.js"></script>
        <script type="text/javascript" src="/js/moment-timezone.js"></script>
        <script type="text/javascript" src="/js/piwikLoader.js"></script>

        {this.props.scripts.map(function(script){
          return <script type="text/javascript" src={'/js/' + script}></script>
        })}

        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>{this.props.title + ' - Alternativ-Feiern'}</title>
        {/* meta tags*/}
        <meta name="description" content="✓ Aktuelle Events in und um Nürnberg ✓ Täglich neue Veranstaltungen ✓ Sammlung der besten Locations ✓ Alternative Festivals ✓ Top Veranstalter" />
        {/* facebook meta tags*/}
        <meta property="og:site_name" content="Alternativ-Feiern" />
        <meta property="og:title" content={this.props.title} />
        <meta property="fb:app_id" content="408323422704321" />
      </head>
    );
  }

});

module.exports = Header;
