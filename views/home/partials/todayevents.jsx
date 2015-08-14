var React = require('react');
var PropTypes = React.PropTypes;
var EventItem = require('./eventitem.jsx');
var $ = window.jQuery;

var FrontEvents = React.createClass({
  getInitialState: function() {
    return {
      col1   : [],
      col2   : [],
      col3   : [],
    };
  },

  componentWillMount: function() {
    $.ajax({
      type : 'GET',
      url  : 'localhost:8080/api/events/whitelisted/today',
      success : function(data){
        console.log(data);
      },
      error : function(err){
        console.log(err);
      }
    });
    /*var col1 = [];
    var col2 = [];
    var col3 = [];
    for(var i = 0; i < this.state.events.length; i++){
      if(i%3 == 0){
        col1.push(this.state.events[i]);
      }
      if(i%3 == 1){
        col2.push(this.state.events[i]);
      }
      if(i%3 == 2){
        col1.push(this.state.events[i]);
      }
    }
    this.setState({
      col1 : col1,
      col2 : col2,
      col3 : col3
    });*/
  },

  render: function() {
    var image1Index = Math.floor((Math.random() * this.state.col1.length));
    var image2Index = Math.floor((Math.random() * this.state.col2.length) + 1);
    var image3Index = Math.floor((Math.random() * this.state.col3.length));
    return (
      <div>
        <div className="section">
          <div className="row">
            <h5>Heute</h5>
            <div className="col s12 m6 l4">
              {this.state.col1.map(function(event, index){
                if(index == image1Index){
                  return <EventItem image event={event}></EventItem>
                } else {
                  return <EventItem event={event}></EventItem>
                }
              })}
            </div>
            <div className="col s12  m6 l4">
              {this.state.col2.map(function(event, index){
                if(index == image2Index){
                  return <EventItem image event={event}></EventItem>
                } else {
                  return <EventItem event={event}></EventItem>
                }
              })}
            </div>
            <div className="col s12  m6 l4">
              {this.state.col3.map(function(event, index){
                if(index == image3Index){
                  return <EventItem image event={event}></EventItem>
                } else {
                  return <EventItem event={event}></EventItem>
                }
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

});

module.exports = FrontEvents;
