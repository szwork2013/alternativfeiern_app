var React = require('react');
var PropTypes = React.PropTypes;
var EventColumn = require('./eventcolumn.jsx');
var EventList = require('./eventlist.jsx');



var MonthContainer = React.createClass({

  returnColumnView : function(){
    return (
      <div>
        <EventColumn  events={this.props.data.col1}></EventColumn>
        <EventColumn  events={this.props.data.col2}></EventColumn>
        <EventColumn  events={this.props.data.col3}></EventColumn>
      </div>
    );
  },

  returnListView : function(){
    return (
      <div>
        <EventList events={this.props.data.list1}></EventList>
        <EventList events={this.props.data.list2}></EventList>
      </div>
    )
  },

  render: function() {
    return (
      <div className="section">
        <div className="row">
          <h4 className="container__title">{this.props.data.name}</h4>
          <div className="col s12">
            {this.props.listView ? this.returnListView() : this.returnColumnView()}
          </div>
        </div>
      </div>
    );
  }

});

module.exports = MonthContainer;
