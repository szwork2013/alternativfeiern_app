var React = require('react');
var $ = window.jQuery;
var apiUrl = require('../config/apiUrl.js');
var FestivalItem = require('./festivalItem.jsx');

var FestivalManager = React.createClass({
  getInitialState: function() {
    return {
      festivals : []
    };
  },

  componentWillMount: function() {
    this.getFestivals();
  },

  getFestivals : function() {
    var self = this;
    $.ajax({
      url : apiUrl.host + '/api/festivals',
      success : function(festivals) {
        self.setState({
          festivals : festivals
        });
      }
    });
  },

  addFestival : function(event) {
    event.preventDefault();
    var self = this;
    var name = React.findDOMNode(this.refs.festival_name);
    var website = React.findDOMNode(this.refs.festival_website);
    var price = React.findDOMNode(this.refs.festival_price);
    var city = React.findDOMNode(this.refs.festival_city);
    var description = React.findDOMNode(this.refs.festival_description);
    var img = React.findDOMNode(this.refs.festival_img);

    var festival = {
      name : name.value,
      description : description.value,
      city : city.value,
      website : website.value,
      price : price.value,
      img : img.value,
    }

    $.ajax({
      method : 'POST',
      url : apiUrl.host + '/api/festivals/add',
      data : festival,
      success : function() {
        name.value = '';
        website.value = '';
        description.value = '';
        img.value = '';
        price.value = '';
        self.getFestivals();
      }
    });
  },

  updateFestival : function(updatedFestvial) {
    $.ajax({
      method : 'POST',
      url : apiUrl.host + '/api/festivals/update',
      data : updatedFestvial,
      success : function(response) {
      }
    })
  },

  removeFestival : function(id) {
    var self = this;
    $.ajax({
      method : 'POST',
      url : apiUrl.host + '/api/festivals/delete',
      data : {
        id : id
      },
      success : function(){
        self.getFestivals();
      }
    });
  },

  render: function() {
    var self = this;
    return (
      <div>
        <h3>Festivals</h3>
        <form>
          <h5>Alles Pflichtfelder!</h5>
          <div className="row">
            <div className="input-field col s3">
              <input id="festival_name" type="text" className="validate" ref="festival_name"></input>
              <label htmlFor="festival_name">Festival Name</label>
            </div>
            <div className="input-field col s3">
              <input id="festival_website" type="url" className="validate" ref="festival_website"></input>
              <label htmlFor="festival_website">Website</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s3">
              <input id="festival_city" type="text" className="validate" ref="festival_city"></input>
              <label htmlFor="festival_city">Stadt</label>
            </div>
            <div className="input-field col s3">
              <input id="festival_price" type="number" className="validate" ref="festival_price"></input>
              <label htmlFor="festival_price">Preis (€)</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s6">
              <input id="festival_img" type="url" className="validate" ref="festival_img"></input>
              <label htmlFor="festival_img">Bild URL (nur .png und .jpg)</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s6">
              <textarea id="festival_description" ref="festival_description" className="materialize-textarea"></textarea>
              <label htmlFor="festival_description">Beschreibung</label>
            </div>
          </div>
        </form>
        <button className="btn waves-effect" onClick={this.addFestival}>
          Hinzufügen
        </button>
        <h4>Added Festivals</h4>
        <ul className="collection">
          {this.state.festivals.map(function(festival, index){
            return <FestivalItem festival={festival}
                                 key={index}
                                 remove={self.removeFestival}
                                 update={self.updateFestival}></FestivalItem>
          })}
        </ul>
      </div>
    );
  }

});

module.exports = FestivalManager;
