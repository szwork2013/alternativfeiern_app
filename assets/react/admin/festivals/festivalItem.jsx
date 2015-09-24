var React = require('react');
var FestivalEdit = require('./festivalEdit.jsx');

var FestivalItem = React.createClass({
  getInitialState: function() {
    return {
      editEnabled : false,
    };
  },

  startEdit : function () {
    this.setState({
      editEnabled : !this.state.editEnabled
    });
  },

  removeFestival: function(){
    this.props.remove(this.props.festival._id);
  },

  showFestival : function() {
    var imgUrl = '/images/festivals/' + this.props.festival.img_small;
    return (
        <li className="collection-item avatar">
          <img src={imgUrl} alt="" className="circle" ref="avatarImage" onError={this.changeImageExt}/>
          <span className="title" style={{fontWeight : 'bold'}}>{this.props.festival.name}</span><br/>
          {this.props.festival.city}<br />
        <a href={this.props.festival.website} target="_blank">Website</a>
          <button className="secondary-content btn red" onClick={this.removeFestival} style={{top : '.5pc'}}>Remove</button>
          <button className="secondary-content btn teal" style={{top : '3pc'}} onClick={this.startEdit}>Edit</button>
        </li>
    );
  },

  showEditFestival : function () {
    return (
      <FestivalEdit festival={this.props.festival} update={this.props.update} editEnabled={this.startEdit}>
        <button className="btn red" onClick={this.startEdit}>Abbrechen</button>
      </FestivalEdit>
    );
  },

  render: function() {
    return (
      <div>
        {this.state.editEnabled ? this.showEditFestival() : this.showFestival()}
      </div>
    )
  }

});

module.exports = FestivalItem;
