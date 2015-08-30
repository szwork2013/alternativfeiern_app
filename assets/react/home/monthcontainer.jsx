var React = require('react');
var PropTypes = React.PropTypes;
var EventColumn = require('./eventcolumn.jsx');
var EventList = require('./eventlist.jsx');

const monthNames = [
  'Januar',
  'Februar',
  'März',
  'April',
  'Mai',
  'Juni',
  'Juli',
  'August',
  'September',
  'Oktober',
  'November',
  'Dezember'
];

var MonthContainer = React.createClass({
  getInitialState: function() {
    var firstEvent = this.props.events[0];
    var date = new Date(Date.parse(firstEvent.start));
    return {
      monthName : monthNames[date.getMonth()],
      col1 : [],
      col2 : [],
      col3 : [],
      list1 : [],
      list2 : [],
    };
  },

  componentWillMount: function() {
    this.putEventsInColumns();
  },

  putEventsInColumns : function(){
    var col1 = [];
    var col2 = [];
    var col3 = [];
    var list1 = [];
    var list2 = [];
    var colFlag = true;

    for(var i = 0; i < this.props.events.length; i++){
      if(i%3 == 0){
        col1.push(this.props.events[i]);
      }
      if(i%3 == 1){
        col2.push(this.props.events[i]);
      }
      if(i%3 == 2){
        col3.push(this.props.events[i]);
      }
    }

    var i = 0;
    for(i; i < Math.ceil(this.props.events.length/2);i++){
      list1.push(this.props.events[i]);
    }
    for(i; i < this.props.events.length; i++) {
      list2.push(this.props.events[i]);
    }

    this.setState({
      col1 : col1,
      col2 : col2,
      col3 : col3,
      list1 : list1,
      list2 : list2,
    });
  },

  returnColumnView : function(){
    return (
      <div>
        <EventColumn events={this.state.col1}></EventColumn>
        <EventColumn events={this.state.col2}></EventColumn>
        <EventColumn events={this.state.col3}></EventColumn>
      </div>
    );
  },

  returnListView : function(){
    return (
      <div>
        <EventList events={this.state.list1}></EventList>
        <EventList events={this.state.list2}></EventList>
      </div>
    )
  },

  render: function() {
    return (
      <div className="section">
        <div className="row">
          <h4 className="container__title">{this.state.monthName}</h4>
          <div className="col s12">
            {this.props.listView ? this.returnListView() : this.returnColumnView()}
          </div>
        </div>
      </div>
    );
  }

});

module.exports = MonthContainer;
