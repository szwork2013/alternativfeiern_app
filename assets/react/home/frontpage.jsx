var React = require('react');
var PropTypes = React.PropTypes;
var FutureEvents = require('./futureevents.jsx');
var TodayEvents = require('./todayevents.jsx');

const switchRowStyle = {
  marginTop : 20,
  marginBottom : 0,
  textAlign : 'center'
};

const switchStyle = {
  display : 'inline-block'
};

const switchLabelStyle = {
  color : '#fff',
  fontSize : 15
}

const leverStyle = {
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
          <div className="switch" style={switchStyle}>
            <label style={switchLabelStyle}>
              Karten
              <input type="checkbox" ref="viewSwitch" onChange={this.switchView}></input>
              <span className="lever" style={leverStyle}></span>
              Liste
            </label>
        </div>
        </div>
        <div className="row" id="todayevents" style={{marginBottom : 0}}>
          <TodayEvents listView={this.state.listView}></TodayEvents>
        </div>
        <div className="row" id="futureevents">
          <FutureEvents listView={this.state.listView}></FutureEvents>
        </div>
      </div>
    );
  }

});

module.exports = Frontpage;
