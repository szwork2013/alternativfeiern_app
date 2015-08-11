var React = require('react');
var PropTypes = React.PropTypes;
var $ = require('jquery');

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
      borderBottom: '1px solid #ddd'
    };
    return (
      <header>
            <nav className="top-nav blue-grey darken-1" style={{height : 97}}>
              <a href="#" data-activates="nav-mobile" className="button-collapse top-nav full hide-on-large-only">
                <i className="mdi-navigation-menu"></i>
              </a>
            </nav>
            <div className="container">
            </div>
            <ul id="nav-mobile" className="side-nav fixed" style={{width: 240 + 'px'}}>
              <li class="logo" style={logoContainerStyle}>
                <a id="logo-container" href="http://materializecss.com/" class="brand-logo">
                  <img src="images/logos/brand_logo.png" style={logoStyle}></img>
                </a>
             </li>
              <li className="bold"><a href="about.html" className="waves-effect waves-teal">About</a></li>
              <li className="bold"><a href="getting-started.html" className="waves-effect waves-teal">Getting Started</a></li>

              <li className="bold"><a href="http://materializecss.com/mobile.html" className="waves-effect waves-teal">Mobile</a></li>
              <li className="bold"><a href="showcase.html" className="waves-effect waves-teal">Showcase</a></li>
            </ul>
          </header>
    );
  }

});

module.exports = SideNavigation;
