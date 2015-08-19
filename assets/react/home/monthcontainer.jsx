var React = require('react');
var PropTypes = React.PropTypes;
var EventItem = require('./eventitem.jsx');

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
      col3 : []
    };
  },

  componentWillMount: function() {
    this.putEventsInColumns();
  },

  putEventsInColumns : function(){
    var col1 = [];
    var col2 = [];
    var col3 = [];
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
    this.setState({
      col1 : col1,
      col2 : col2,
      col3 : col3
    });
  },

  render: function() {
    return (
      <div className="section">
        <div className="row">
          <h4 className="container__title">{this.state.monthName}</h4>
          <div className="col s12 m6 l4">
            {this.state.col1.map(function(event, index){
                return <EventItem key={event.fbid} image event={event}></EventItem>
            })}
          </div>
          <div className="col s12  m6 l4">
            {this.state.col2.map(function(event, index){
                return <EventItem key={event.fbid} image event={event}></EventItem>
            })}
          </div>
          <div className="col s12  m6 l4">
            {this.state.col3.map(function(event, index){
                return <EventItem key={event.fbid} image event={event}></EventItem>
            })}
          </div>
        </div>
      </div>
    );
  }

});

module.exports = MonthContainer;
