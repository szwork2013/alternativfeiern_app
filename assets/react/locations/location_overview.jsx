var React = require('react');
var PropTypes = React.PropTypes;
var LocationItem = require('./locationItem.jsx');
var $ = window.jQuery;

var LocationOverview = React.createClass({
  getInitialState: function() {
    return {
      locations : []
    };
  },

  componentWillMount: function() {
    this.getLocations();
  },

  componentDidMount: function() {
    $('ul.tabs').tabs();
  },

  getLocations : function() {
    var self = this;
    $.ajax({
      url : '/api/locations',
      success : function(locations) {
        console.log(locations);
        self.setState({
          locations : locations
        });
      }
    });
  },

  render: function() {
    var frthSwitch = true;
    return (
      <div className="row">
        {/* Tab navigation*/}
        <div className="col s12" style={{padding : 0}}>
          <ul className="tabs">
            <li className="tab col s3"><a href="#nbg">Nbg</a></li>
            <li className="tab col s3"><a href="#frth">Frth</a></li>
            <li className="tab col s3"><a href="#erlngn">Erlngn</a></li>
            <li className="tab col s3"><a href="#ansbch">Ansbch</a></li>
          </ul>
        </div>
        {/* Tab content*/}
          {/* Nürnberg*/}
          <div id="nbg" className="container">
            <div className="col s12 m6 l6">
              {this.state.locations.map(function(location, index){
                return (location.city == "Nürnberg" && index%2 == 0) ? <LocationItem location={location} key={index}></LocationItem> : null;
              })}
            </div>
            <div className="col s12 m6 l6">
              {this.state.locations.map(function(location, index){
                return (location.city == "Nürnberg" && index%2 == 1) ? <LocationItem location={location} key={index}></LocationItem> : null;
              })}
            </div>
          </div>

          {/* Fürth */}
          <div id="frth" className="container">
            <div className="col s12 m6 l6">
              {this.state.locations.map(function(location, index){
                return (location.city == "Fürth" && frthSwitch)? <LocationItem location={location} key={index}></LocationItem> : null;
                frthSwitch = false;
              })}
            </div>
            <div className="col s12 m6 l6">
              {this.state.locations.map(function(location, index){
                return (location.city == "Fürth" && !frthSwitch) ? <LocationItem location={location} key={index}></LocationItem> : null;
                frthSwitch = true;
              })}
            </div>
          </div>

          {/* Erlangen */}
          <div id="erlngn" className="container">
            <div className="col s12 m6 l6">
              {this.state.locations.map(function(location, index){

                return (location.city == "Erlangen") ? <LocationItem location={location} key={index}></LocationItem> : null;
              })}
            </div>
            <div className="col s12 m6 l6">
              {this.state.locations.map(function(location, index){
                return (location.city == "Erlangen" && index%2 == 1) ? <LocationItem location={location} key={index}></LocationItem> : null;
              })}
            </div>
          </div>

          {/* Ansbach */}
          <div id="ansbch" className="container">
            <div id="ansbch" className="col s12 m6 l6">
              {this.state.locations.map(function(location, index){
                return (location.city == "Ansbach" && index%2 == 0) ? <LocationItem location={location} key={index}></LocationItem> : null;
              })}
            </div>
            <div id="ansbch" className="col s12 m6 l6">
              {this.state.locations.map(function(location, index){
                return (location.city == "Ansbach" && index%2 == 1) ? <LocationItem location={location} key={index}></LocationItem> : null;
              })}
            </div>
          </div>

      </div>
    );
  }

});

module.exports = LocationOverview;
