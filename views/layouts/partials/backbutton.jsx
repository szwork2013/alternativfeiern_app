var React = require('react');
var PropTypes = React.PropTypes;

var BackButton = React.createClass({

  render: function() {
    return (
      <a className="btn-floating backButton" >
        <img src="/images/icons/back_arrow.png"></img>
      </a>
    );
  }

});

module.exports = BackButton;
