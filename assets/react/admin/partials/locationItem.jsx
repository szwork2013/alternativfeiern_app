var React = require('react');
var PropTypes = React.PropTypes;
var LocationEdit = require('./locationEdit.jsx');

var LocationItem = React.createClass({
  getInitialState: function() {
    return {
      editEnabled : false
    };
  },

  startEdit : function(){
    this.setState({
      editEnabled : !this.state.editEnabled
    });
  },

  removeLocation : function(){
    this.props.remove(this.props.location._id)
  },

  showLocation : function(){
    var imgUrl = '/images/locations/' + this.props.location.img;
    return (
        <li className="collection-item avatar">
          <img src={imgUrl} alt="" className="circle" ref="avatarImage" onError={this.changeImageExt}/>
          <span className="title" style={{fontWeight : 'bold'}}>{this.props.location.name}</span><br/>
          {this.props.location.address}<br />
          {this.props.location.city}<br />
        <a href={this.props.location.website} target="_blank">Website</a>
          <button className="secondary-content btn red" onClick={this.removeLocation}>Delete</button>
          <button className="secondary-content btn teal" style={{top : '4pc'}} onClick={this.startEdit}>Edit</button>
        </li>
    );
  },

  showEditLocation : function() {
    return (
      <LocationEdit location={this.props.location} update={this.props.update}>
        <button className="btn red" onClick={this.startEdit}>Abbrechen</button>
      </LocationEdit>
    );
  },

  render: function() {
    return (
      <div>
        {this.state.editEnabled ? this.showEditLocation() : this.showLocation()}
      </div>
    );
  }

});

module.exports = LocationItem;
