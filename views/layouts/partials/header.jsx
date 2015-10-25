var React = require('react');
var PropTypes = React.PropTypes;

var Header = React.createClass({

  render: function() {
    return (
      <head>
        <meta name="google-site-verification" content="il4RSK3fBT6b8OMykYpiBMtnx_GpdY2fhYqdCnNjKZg" />
        
        <link rel="icon" href="/images/logos/favicon_50x50.png" type="img/png" />
        <link type="text/css" rel="stylesheet" href="/css/dist/materialize.css" media="screen,projection"/>
        <link type="text/css" rel="stylesheet" href="/css/dist/global.css" />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />

        {this.props.stylesheets.map(function(css){
          return <link type="text/css" rel="stylesheet" href={'/css/dist/' + css} />
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
        <meta name="description" content={this.props.description}></meta>
        {/* facebook meta tags*/}
        <meta property="og:site_name" content="Alternativ-Feiern" />
        <meta property="og:title" content={this.props.title} />
        <meta property="fb:app_id" content="408323422704321" />
      </head>
    );
  }

});

module.exports = Header;
