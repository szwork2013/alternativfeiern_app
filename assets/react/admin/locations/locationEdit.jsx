var React = require('react');
var $ = window.jQuery;

var LocationEdit = React.createClass({
  componentDidMount: function() {
    $(React.findDOMNode(this.refs.location_city)).material_select();
  },

  updateLocation : function(event) {
    event.preventDefault();
    var name = React.findDOMNode(this.refs.location_name).value;
    var website = React.findDOMNode(this.refs.location_website).value;
    var address = React.findDOMNode(this.refs.location_address).value;
    var city = React.findDOMNode(this.refs.location_city).value;
    var img = React.findDOMNode(this.refs.location_img).value;
    var description = React.findDOMNode(this.refs.location_description).value;
    var updatedLocation = this.props.location;

    updatedLocation.name = name;
    updatedLocation.website = website;
    updatedLocation.address = address;
    updatedLocation.city = city;
    updatedLocation.description = description;
    updateLocation.img = img.length > 0 ? img : null;
    this.props.update(updatedLocation);
    this.props.editEnabled();
  },

  render: function() {
    return (
      <li className="collection-item">
        <form>
          <h5>Location bearbeiten</h5>
          <div className="row">
            <div className="input-field col s3">
              <input id="location_name" type="text" className="validate" ref="location_name" defaultValue={this.props.location.name}></input>
            </div>
            <div className="input-field col s3">
              <input id="location_website" type="url" className="validate" ref="location_website" defaultValue={this.props.location.website}></input>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s3">
              <input id="location_address" type="text" className="validate" ref="location_address" defaultValue={this.props.location.address}></input>
            </div>
            <div className="input-field col s3">
              <select defaultValue={this.props.location.city} ref="location_city">
                <option value="Nürnberg">Nürnberg</option>
                <option value="Fürth">Fürth</option>
                <option value="Erlangen">Erlangen</option>
                <option value="Ansbach">Ansbach</option>
              </select>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s6">
              <input id="location_img" type="url" className="validate" ref="location_img"></input>
              <label htmlFor="location_img">Bild URL (leer lassen, wenn Bild behalten)</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s6">
              <textarea id="location_description"
                        ref="location_description"
                        className="materialize-textarea"
                        defaultValue={this.props.location.description}
                        style={{overflowY : 'scroll'}}></textarea>
            </div>
          </div>
        </form>
        <button className="btn green" style={{marginRight : 10}} onClick={this.updateLocation}>Änderung speichern</button>
        {this.props.children}
      </li>
    );
  }

});

module.exports = LocationEdit;
