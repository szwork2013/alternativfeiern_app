var React = require('react');
var PropTypes = React.PropTypes;
var LocationItem = require('./locationItem.jsx');
var $ = window.jQuery;

var LocationOverview = React.createClass({
  getInitialState: function() {
    return {
      locations : [],
      nbg : [],
      frth : [],
      erlngn : [],
      ansbch : []
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
        var nbg = [];
        var frth = [];
        var erlngn = [];
        var ansbch = [];
        locations.forEach(function(location){
          if(location.city == 'Nürnberg')
            nbg.push(location);
          else if (location.city == 'Fürth')
            frth.push(location);
          else if (location.city == 'Erlangen')
            erlngn.push(location);
          else if (location.city == 'Ansbach')
            ansbch.push(location);
        });
        self.setState({
          locations : locations,
          nbg : nbg,
          frth : frth,
          erlngn : erlngn,
          ansbch : ansbch
        });
      }
    });
  },

  render: function() {
    return (
      <div className="row">
        {/* Tab navigation*/}
        <div className="col s12" style={{padding : 0}}>
          <ul className="tabs blue-grey darken-2">
            <li className="tab col s3"><a href="#nbg">Nbg</a></li>
            <li className="tab col s3"><a href="#frth">Fü</a></li>
            <li className="tab col s3"><a href="#erlngn">Er</a></li>
            <li className="tab col s3"><a href="#ansbch">An</a></li>
          </ul>
        </div>
        {/* Tab content*/}
        <div className="tabContent">
          {/* Nürnberg*/}
          <div id="nbg" className="col s12">
            <p className="cityDescription">
              Alternative Locations in <b>Nürnberg</b>.<br />Alles was das Herz begehrt! Von der Kneipe über den Club ist für jeden Geschmack etwas dabei.
            </p>
            <div className="col s12 m6 l6">
              {this.state.nbg.map(function(location, index){
                return (location.city == "Nürnberg" && index%2 == 0) ? <LocationItem location={location} key={index}></LocationItem> : null;
              })}
            </div>
            <div className="col s12 m6 l6">
              {this.state.nbg.map(function(location, index){
                return (location.city == "Nürnberg" && index%2 == 1) ? <LocationItem location={location} key={index}></LocationItem> : null;
              })}
            </div>
          </div>

          {/* Fürth */}
          <div id="frth" className="col s12">
            <p className="cityDescription">
              Alternative Locations in <b>Fürth</b>.<br />Feiern in Fürth? ABER JA! Kneipen und Bars in Fürth überzeugen mit Charakter und Charme.
            </p>
            <div className="col s12 m6 l6">
              {this.state.frth.map(function(location, index){
                return (location.city == "Fürth" &&  index%2 == 0)? <LocationItem location={location} key={index}></LocationItem> : null;
              })}
            </div>
            <div className="col s12 m6 l6">
              {this.state.frth.map(function(location, index){
                return (location.city == "Fürth" && index%2 == 1) ? <LocationItem location={location} key={index}></LocationItem> : null;
              })}
            </div>
          </div>

          {/* Erlangen */}
          <div id="erlngn" className="col s12">
            <p className="cityDescription">
              Alternative Locations in <b>Erlangen</b>.<br />Neben “Berg” und Universtät bietet Erlangen auch für das abendliche Programm eine attraktive Auswahl.
            </p>
            <div className="col s12 m6 l6">
              {this.state.erlngn.map(function(location, index){
                return (location.city == "Erlangen" && index%2 == 0) ? <LocationItem location={location} key={index}></LocationItem> : null;
              })}
            </div>
            <div className="col s12 m6 l6">
              {this.state.erlngn.map(function(location, index){
                return (location.city == "Erlangen" && index%2 == 1) ? <LocationItem location={location} key={index}></LocationItem> : null;
              })}
            </div>
          </div>

          {/* Ansbach */}
          <div id="ansbch" className="col s12">
            <p className="cityDescription">
              Alternative Locations in <b>Ansbach</b>.<br />Kneipen, Bars und Technopartys!
            </p>
            <div id="ansbch" className="col s12 m6 l6">
              {this.state.ansbch.map(function(location, index){
                return (location.city == "Ansbach" && index%2 == 0) ? <LocationItem location={location} key={index}></LocationItem> : null;
              })}
            </div>
            <div id="ansbch" className="col s12 m6 l6">
              {this.state.ansbch.map(function(location, index){
                return (location.city == "Ansbach" && index%2 == 1) ? <LocationItem location={location} key={index}></LocationItem> : null;
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

});

module.exports = LocationOverview;
