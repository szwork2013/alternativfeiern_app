var $ = window.jQuery;
var React = require('react');
var Reflux = require('reflux');
var Preloader = require('./preloader.jsx');
var MonthContainer = require('./monthcontainer.jsx');
var EventStore = require('../Stores/FutureEventStore.jsx');

var FutureEvents = React.createClass({
  mixins : [Reflux.connect(EventStore, 'store')],

  getInitialState: function() {
    return {
      store : [],
    };
  },

  scrollToTop : function(){
    window.scrollTo(0,0);
  },

  renderScrollback : function(){
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

  renderPreloader : function() {
    return <Preloader />
  },

  render: function() {
    var self = this;
    return (
      <div>
        {this.state.store.length > 0 ? 
          this.state.store.map(function(container,index){
          return container.hasEvents ?  <MonthContainer data={container} listView={self.props.listView} key={index}/> : null
        }) : self.renderPreloader()}
        {self.renderScrollback()}
      </div>
    )
  }

});

module.exports = FutureEvents;
