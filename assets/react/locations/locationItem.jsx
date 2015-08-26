var React = require('react');
var PropTypes = React.PropTypes;

var LocationItem = React.createClass({
  getInitialState: function() {
    return {
      extSwitched : false,
    };
  },

  changeImageExt : function(event){
      if(!this.state.extSwitched){
        var img = React.findDOMNode(this.refs.cardImage);
        img.src = img.src.replace(/\.jpg/, '.png');
        this.setState({
          extSwitched : true
        });
      }
  },

  render: function() {
    var imgUrl = '/images/locations/' + this.props.location.alias + '.jpg';
    var locationUrl = '/locations/' + this.props.location.alias;
    return (
      <div className="card medium hoverable">
        <a href={locationUrl} className="card__link">
        <div className="card-image">
          <img src={imgUrl} ref="cardImage" onError={this.changeImageExt}></img>
        </div>
        <div className="card-content">
          <span className="card-title">{this.props.location.name}</span>
          <p>
            {this.props.location.address}
          </p>
        </div>
        </a>
      </div>
    );
  }

});

module.exports = LocationItem;
