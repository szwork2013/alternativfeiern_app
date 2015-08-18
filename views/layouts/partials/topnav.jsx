var React = require('react');
var PropTypes = React.PropTypes;

var TopNav = React.createClass({

  render: function() {
    return (
      <nav className="top-nav af_green">
        <div className="container">
          <div className="nav-wrapper">
            <a className="page-title">{this.props.title}</a>
          </div>
        </div>
      </nav>
    );
  }

});

module.exports = TopNav;
