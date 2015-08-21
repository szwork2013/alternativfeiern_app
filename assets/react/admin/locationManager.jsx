const React = require('react');
const $ = window.jQuery;
const PropTypes = React.PropTypes;
const apiUrl = require('./apiUrl.jsx');

var LocationManager = React.createClass({
  getInitialState: function() {
    return {
      locations : []
    };
  },

  componentWillMount: function() {
    //this.getLocations();
  },

  componentDidMount: function() {
    $('select').material_select();
  },

  getLocations : function() {
    var self = this;
    $.ajax({
      url : apiUrl.host + '/api/locations',
      success : function(locations) {
        console.log(locations);
        self.setState({
          locations : locations
        });
      }
    });
  },

  addLocation : function(event) {
    event.preventDefault();
    var self = this;
    var name = React.findDOMNode(this.refs.location_name);
    var website = React.findDOMNode(this.refs.location_website);
    var address = React.findDOMNode(this.refs.location_address);
    var city = React.findDOMNode(this.refs.location_city);
    var description = React.findDOMNode(this.refs.location_description);

    var location = {
      name : name.value,
      description : description.value,
      address : address.value,
      city : city.value,
      website : website.value
    }

    $.ajax({
      method : 'POST',
      url : apiUrl.host + '/api/locations/add',
      data : location,
      success : function() {
        name.value = '';
        website.value = '';
        address.value = '';
        description.value = '';
        city.value = 'Nürnberg';
      }
    });

    console.log(location);
  },

  render: function() {
    return (
      <div>
        <h3>Locations (Clubs, Kneipen & Co)</h3>
        <form>
          <div className="row">
            <div className="input-field col s3">
              <input id="location_name" type="text" className="validate" ref="location_name"></input>
              <label htmlFor="location_name">Location Name</label>
            </div>
            <div className="input-field col s3">
              <input id="location_website" type="url" className="validate" ref="location_website"></input>
              <label htmlFor="location_website">Website</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s3">
              <input id="location_address" type="text" className="validate" ref="location_address"></input>
              <label htmlFor="location_website">Addresse (Straße Hsnr.)</label>
            </div>
            <div className="input-field col s3">
              <select defaultValue="Nürnberg" ref="location_city">
                <option value="Nürnberg">Nürnberg</option>
                <option value="Fürth">Fürth</option>
                <option value="Erlangen">Erlangen</option>
                <option value="Ansbach">Ansbach</option>
              </select>
              <label>Stadt</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s6">
              <textarea id="location_description" ref="location_description" className="materialize-textarea"></textarea>
              <label htmlFor="location_description">Beschreibung</label>
            </div>
          </div>
        </form>
        <button className="btn waves-effect" onClick={this.addLocation}>
          Hinzufügen
        </button>
      </div>
    );
  }

});

module.exports = LocationManager;
