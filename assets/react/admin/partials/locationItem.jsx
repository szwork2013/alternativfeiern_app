const React = require('react');
const PropTypes = React.PropTypes;

const LocationItem = React.createClass({
  removeLocation: function(){
    this.props.location.remove(this.props.location._id);
  },

  render: function() {
    return (
        <li className="collection-item avatar">
          <span className="title" style={{fontWeight : 'bold'}}>{this.props.location.name}</span><br/>
          {this.props.location.address}<br />
          {this.props.location.city}<br />
        <a href={this.props.location.website} target="_blank">Website</a>
          <button className="waves-effect waves-light secondary-content btn-floating red" onClick={this.removeLocation}>x</button>
        </li>
    );
  }

});

module.exports = LocationItem;
