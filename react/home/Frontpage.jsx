var React = require('react');
var FutureEvents = require('./Components/FutureEvents.jsx');
var TodayEvents = require('./Components/TodayEvents.jsx');
var TodayEventStore = require('./Stores/TodayEventStore.jsx');

var switchRowStyle = {
  marginTop : 20,
  marginBottom : 0,
  textAlign : 'center',
};

var switchStyle = {
  display : 'inline-block'
};

var switchLabelStyle = {
  color : '#fff',
  fontSize : 15
}

var leverStyle = {
  backgroundColor : '#272F38'
}

var Frontpage = React.createClass({
  getInitialState: function() {
    return {
      listView : false
    };
  },

  switchView : function(event) {
    var viewSwitch = React.findDOMNode(this.refs.viewSwitch);
    this.setState({
      listView : viewSwitch.checked
    });
  },

  render: function() {
    return (
      <div className="container">
        <div className="row" style={switchRowStyle}>
          <p className="cityDescription" style={{color : '#272F38'}}>Event-Kalender für Nürnberg und Umgebung</p>
        </div>
        <div className="row" id="todayevents" style={{marginBottom : 0}}>
          <TodayEvents listView={this.state.listView} />
        </div>
        <div className="row" id="futureevents">
          <FutureEvents listView={this.state.listView} />
        </div>
      </div>
    );
  }

});

module.exports = Frontpage;
