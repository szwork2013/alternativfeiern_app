var React = require('react');
var PropTypes = React.PropTypes;

var LocationItem = React.createClass({

  render: function() {
    return (
      <div className="card lage">
        <div className="card-image">
          <img src="http://materializecss.com/images/sample-1.jpg"></img>
        </div>
        <div className="card-content">
          <span className="card-title">{this.props.location.name}</span>
          <p>
            {this.props.location.description}
          </p>
        </div>
        <div className="card-action">
          <a href={this.props.location.website}>Website</a>
        </div>
      </div>
    );
  }

});

module.exports = LocationItem;
