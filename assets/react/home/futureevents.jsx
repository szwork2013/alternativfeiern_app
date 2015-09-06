var React = require('react/addons');
var PropTypes = React.PropTypes;
var MonthContainer = require('./monthcontainer.jsx');
var EventItem = require('./eventitem.jsx');
var $ = window.jQuery;
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var FutureEvents = React.createClass({
  getInitialState: function() {
    return {
      events : [[]],
      containerCount : 2
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
    if($(window).scrollTop() + $(window).height() == $(document).height()){
      self.incrContainerCount();
    }
    $(window).scroll(function(){
      if($(window).scrollTop() + $(window).height() == $(document).height()){
        self.incrContainerCount();
      }
    });
  },

  incrContainerCount : function (event) {
    if(this.state.containerCount < this.state.events.length) {
      var count = this.state.containerCount + 1;
      console.log(count);
      this.setState({
        containerCount : count
      });
    }
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

  returnSrollBack : function(){
    return (
      <div className="row" id="noMore" style={{textAlign : 'center', color : '#fff'}}>
        <p>
        Mehr gibt's nicht!<br />
        Du vermisst ein Event? Kontaktiere uns!
        </p>
        <a className="btn waves-effect" id="scrollBackBtn" onClick={this.scrollToTop}>Nach oben</a>
      </div>
    )
  },

  returnPreloader : function() {
    return (
      <div className="row" style={{textAlign : 'center'}}>
        <div className="preloader-wrapper small active">
          <div className="spinner-layer spinner-green-only">
            <div className="circle-clipper left">
              <div className="circle"></div>
            </div>
            <div className="gap-patch">
              <div className="circle"></div>
            </div>
            <div className="circle-clipper right">
              <div className="circle"></div>
            </div>
          </div>
        </div>
      </div>
    )
  },

  render: function() {
    var self = this;
    if(this.state.events.length > 0){
      return (
        <div>
          {this.state.events.map(function(monthlyEvents, index){
            return (monthlyEvents.length > 0 && self.state.containerCount >= index) ? <MonthContainer key={index} events={monthlyEvents} listView={self.props.listView}></MonthContainer> : null
          })}
          <ReactCSSTransitionGroup transitionAppear={true} transitionName="frontpage">
            {this.state.containerCount >= this.state.events.length ? this.returnSrollBack() : this.returnPreloader()}
          </ReactCSSTransitionGroup>
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
