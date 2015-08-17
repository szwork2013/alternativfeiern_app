var React = require('react');
var PropTypes = React.PropTypes;

var SideNavigation = React.createClass({
  render: function() {
    var logoStyle = {
      display : 'inline-block',
      height : '100%',
    };
    var logoContainerStyle = {
      textAlign: 'center',
      paddingTop: 16,
      paddingBottom: 16,
      marginBottom: 16
    };
    return (
      <header>
            <nav className="top-nav af_green">
              <div className="container">
                <div className="nav-wrapper">
                  <a className="page-title">{this.props.title}</a>
                </div>
              </div>
              <div className="container">
                <a href="#" data-activates="nav-mobile" className="button-collapse top-nav full hide-on-large-only">
                  <i className="mdi-navigation-menu"></i>
                </a>
              </div>
            </nav>
            <div className="container">
            </div>
            <ul id="nav-mobile" className="side-nav fixed" style={{width: 240 + 'px'}}>
              <li class="logo" style={logoContainerStyle}>
                <a id="logo-container" href="http://localhost:8080" class="brand-logo">
                  <img src="/images/logos/brand_logo.png" style={logoStyle}></img>
                </a>
             </li>
              <li className="bold"><a href="/locations" className="waves-effect waves-light">Clubs, Kneipen & Co</a></li>
              <li className="bold"><a href="/organisers" className="waves-effect waves-light">Veranstalter</a></li>
              <li className="bold"><a href="/festivals" className="waves-effect waves-light">Festivals</a></li>
              <li className="bold"><a href="/about" className="waves-effect waves-light">Über uns</a></li>
              <li><a href="/login">Login</a></li>
            </ul>
          </header>
    );
  }

});

module.exports = SideNavigation;
