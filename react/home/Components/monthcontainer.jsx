var React = require('react');
var PropTypes = React.PropTypes;
var EventColumn = require('./eventcolumn.jsx');

var MonthContainer = React.createClass({

  render: function() {
    return (
      <div className="section monthContainer">
        <div className="row">
          <h4 className="container__title">{this.props.data.name}</h4>
          <div className="col s12">
            <EventColumn  events={this.props.data.col1}></EventColumn>
            <EventColumn  events={this.props.data.col2}></EventColumn>
            <EventColumn  events={this.props.data.col3}></EventColumn>
            <EventColumn  events={this.props.data.col4}></EventColumn>
          </div>
        </div>
      </div>
    );
  }

});

module.exports = MonthContainer;
