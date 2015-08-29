var React = require('react');
var PropTypes = React.PropTypes;
var TopNav = require('./topnav.jsx');

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
    };
    return (
      <header>
        {this.props.children}
            <div className="container">
              <a href="#" data-activates="nav-mobile" className="btn-floating sideNavBtn top-nav full hide-on-large-only">
                <i className="mdi-navigation-menu"></i>
              </a>
            </div>
            <div className="container">
            </div>
            <ul id="nav-mobile" className="side-nav fixed" style={{width: 240 + 'px'}}>
              <li class="logo" style={logoContainerStyle}>
                <a id="logo-container" href="/" class="brand-logo">
                  <img src="/images/logos/brand_logo.png" style={logoStyle}></img>
                </a>
                <a href="/" className="pageName">
                  <h5>Alternativ-Feiern</h5>
                </a>
             </li>
              <li className="bold"><a href="/locations">Clubs, Kneipen & Co</a></li>
              <li className="bold"><a href="/organizers">Veranstalter</a></li>
            {/*<li className="bold"><a href="/festivals" className="waves-effect waves-light">Festivals</a></li>
              <li className="bold"><a href="/about" className="waves-effect waves-light">Über uns</a></li>*/}
              <li><a href="/login">Login</a></li>

                <hr />

              <li>
                <a href="/about" style={{fontSize : '12px'}}>Über uns</a>
              </li>
              <li>
                <a href="/impressum" style={{fontSize : '12px'}}>Impressum</a>
              </li>
            </ul>

          </header>
    );
  }

});

module.exports = SideNavigation;
