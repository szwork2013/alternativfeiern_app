var React = require('react');
var PropTypes = React.PropTypes;
var EventItem = require('./eventitem.jsx');
var $ = window.jQuery;

var TodayEvents = React.createClass({
  getInitialState: function() {
    return {
      events : [],
      col1 : [],
      col2 : [],
      col3 : [],
    };
  },

  componentWillMount: function() {
    //console.log(this.state.events);
    var self = this;
    $.ajax({
      type : 'GET',
      url  : '/api/events/whitelisted/today',
      success : function(data){
        self.putEventsInColumns(data);
        self.setState({
          events : data
        });
      },
      error : function(err) {
        console.log(err);
      }
    });

  },

  putEventsInColumns : function(events){
    var col1 = [];
    var col2 = [];
    var col3 = [];
    for(var i = 0; i < events.length; i++){
      if(i%3 == 0){
        col1.push(events[i]);
      }
      if(i%3 == 1){
        col2.push(events[i]);
      }
      if(i%3 == 2){
        col3.push(events[i]);
      }
    }
    this.setState({
      col1 : col1,
      col2 : col2,
      col3 : col3
    });
  },

  render: function() {
    var image1Index = Math.floor((Math.random() * this.state.col1.length));
    var image2Index = Math.floor((Math.random() * this.state.col2.length) + 1);
    var image3Index = Math.floor((Math.random() * this.state.col3.length));
    if(this.state.events.length > 0){
      return (
        <div>
          <div className="section">
            <div className="row">
              <h4>Heute</h4>
              <div className="col s12 m6 l4">
                {this.state.col1.map(function(event, index){
                    return <EventItem key={index} image event={event}></EventItem>
                })}
              </div>
              <div className="col s12  m6 l4">
                {this.state.col2.map(function(event, index){
                    return <EventItem image event={event}></EventItem>
                })}
              </div>
              <div className="col s12  m6 l4">
                {this.state.col3.map(function(event, index){
                    return <EventItem image event={event}></EventItem>
                })}
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div></div>
      )
    }
  }

});

module.exports = TodayEvents;
