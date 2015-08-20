var React = require('react');
var PropTypes = React.PropTypes;
var MonthContainer = require('./monthcontainer.jsx');
var EventItem = require('./eventitem.jsx');
var $ = window.jQuery;

var FutureEvents = React.createClass({
  getInitialState: function() {
    return {
      events : [[]],
      containerCount : 1
    };
  },

  componentWillMount: function() {
    var self = this;
    $.ajax({
      type : 'GET',
      url  : '/api/events/whitelisted/sorted',
      success : function(data){
        self.sortMonths(data);
      },
      error : function(err) {
        console.log(err);
      }
    });
  },

  componentDidMount: function() {
    var self = this;
    $(window).scroll(function(){
      if($(window).scrollTop() + $(window).height() == $(document).height()){
        self.incrContainerCount();
      }
    });
  },

  incrContainerCount : function (event) {
    console.log(this.state.events.length);
    var count = this.state.containerCount + 1;
    console.log(count);
    if(count >= this.state.events.length){
      $('#noMore').css('display', 'block');
    }
    this.setState({
      containerCount : count
    });
  },

  scrollToTop : function(){
    window.scrollTo(0,0);
  },

  sortMonths : function(events){
    var now = new Date(Date.now());
    var monthNow = now.getMonth();
    var sortedEvents = [];
    for(var i = monthNow; i < monthNow + events.length; i++){
      if(events[i] == undefined){
        //sortedEvents.push([]);
      } else {
        sortedEvents.push(events[i]);
      }
    }
    this.setState({
      events : sortedEvents
    });
  },

  render: function() {
    var self = this;
    if(this.state.events.length > 0){
      return (
        <div>
          {this.state.events.map(function(monthlyEvents, index){
            return (monthlyEvents.length > 0 && self.state.containerCount > index) ? <MonthContainer key={index} events={monthlyEvents}></MonthContainer> : null
          })}
          <div className="row" id="noMore" style={{textAlign : 'center', display : 'none', color : '#fff'}}>
            <p>
            Mehr gibt's nicht!<br />
            Du vermisst ein Event? Kontaktiere uns!
            </p>
            <a className="btn waves-effect" id="scrollBackBtn" onClick={self.scrollToTop}>Nach oben</a>
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

module.exports = FutureEvents;
