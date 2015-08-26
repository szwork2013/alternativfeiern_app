const React = require('react');
const PropTypes = React.PropTypes;

const LocationItem = React.createClass({
  getInitialState: function() {
    return {
      extSwitched : false,
    };
  },

  changeImageExt : function(event){
      if(!this.state.extSwitched){
        var img = React.findDOMNode(this.refs.avatarImage);
        img.src = img.src.replace(/\.jpg/, '.png');
        this.setState({
          extSwitched : true
        });
      }
  },

  removeLocation: function(){
    this.props.location.remove(this.props.location._id);
  },

  render: function() {
    var imgUrl = '/images/locations/' + this.props.location.alias + '.jpg';
    return (
        <li className="collection-item avatar">
          <img src={imgUrl} alt="" className="circle" ref="avatarImage" onError={this.changeImageExt}/>
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
