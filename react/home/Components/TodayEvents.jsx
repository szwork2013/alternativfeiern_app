var $ = window.jQuery;
var React = require('react');
var Reflux = require('reflux')
var MonthContainer = require('./monthcontainer.jsx');
var EventStore = require('../Stores/TodayEventStore.jsx');

var TodayEvents = React.createClass({
  mixins : [Reflux.connect(EventStore, 'store')],

  getInitialState: function() {
    return {
      store : {
        name : 'Heute',
        hasEvents : false,
        col1 : [],
        col2 : [],
        col3 : [],
        col4 : []
      }
    };
  },

  renderMonthContainer : function(){
    if(this.state.store.hasEvents) {
      return <MonthContainer data={this.state.store}/>
    }
  },

  render: function() {
    return (
      <div>
        {this.renderMonthContainer()}
      </div>
    )
  }

});

module.exports = TodayEvents;
