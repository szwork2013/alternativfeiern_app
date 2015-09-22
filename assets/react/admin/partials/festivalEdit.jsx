var React = require('react');
var PropTypes = React.PropTypes;
var $ = window.jQuery;

var FestivalEdit = React.createClass({
  updateFestival : function(event) {
      event.preventDefault();
      console.log('updating festival');
      var name = React.findDOMNode(this.refs.festival_name).value;
      var website = React.findDOMNode(this.refs.festival_website).value;
      var city = React.findDOMNode(this.refs.festival_city).value;
      var img = React.findDOMNode(this.refs.festival_img).value;
      var description = React.findDOMNode(this.refs.festival_description).value;
      var price = React.findDOMNode(this.refs.festival_price).value;
      var updatedFestvial = this.props.festival;

      updatedFestvial.name = name;
      updatedFestvial.website = website;
      updatedFestvial.city = city;
      updatedFestvial.description = description;
      updatedFestvial.img = img.length > 0 ? img : null;
      this.props.update(updatedFestvial);
      this.props.editEnabled();
  },

  render: function() {
    return (
      <li className="collection-item">
        <form>
          <div className="row">
            <div className="input-field col s3">
              <input id="festival_name" type="text"
                     className="validate"
                     ref="festival_name"
                     defaultValue={this.props.festival.name}></input>
            </div>
            <div className="input-field col s3">
              <input id="festival_website"
                     type="url" className="validate"
                     ref="festival_website"
                     defaultValue={this.props.festival.website}></input>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s3">
              <input id="festival_city"
                     type="text"
                     className="validate"
                     ref="festival_city"
                     defaultValue={this.props.festival.city}></input>
            </div>
            <div className="input-field col s3">
              <input id="festival_price"
                     type="number"
                     className="validate"
                     ref="festival_price"
                     defaultValue={this.props.festival.price}></input>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s6">
              <input id="festival_img" type="url" className="validate" ref="festival_img"></input>
              <label htmlFor="festival_img">Bild URL (leer lassen, wenn Bild behalten)</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s6">
              <textarea id="festival_description"
                        ref="festival_description"
                        className="materialize-textarea"
                        defaultValue={this.props.festival.description}
                        style={{overflowY : 'scroll'}}></textarea>
            </div>
          </div>
        </form>
        <button className="btn green" style={{marginRight : 10}} onClick={this.updateFestival}>Änderung speichern</button>
        {this.props.children}
      </li>
    );
  }

});

module.exports = FestivalEdit;
