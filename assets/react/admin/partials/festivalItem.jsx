const React = require('react');
const PropTypes = React.PropTypes;

const FestivalItem = React.createClass({
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

  removeFestival: function(){
    this.props.festival.remove(this.props.festival._id);
  },

  render: function() {
    var imgUrl = '/images/festivals/' + this.props.festival.alias + '.jpg';
    return (
        <li className="collection-item avatar">
          <img src={imgUrl} alt="" className="circle" ref="avatarImage" onError={this.changeImageExt}/>
          <span className="title" style={{fontWeight : 'bold'}}>{this.props.festival.name}</span><br/>
          {this.props.festival.city}<br />
        <a href={this.props.festival.website} target="_blank">Website</a>
          <button className="waves-effect waves-light secondary-content btn-floating red" onClick={this.removeFestival}>x</button>
        </li>
    );
  }

});

module.exports = FestivalItem;
