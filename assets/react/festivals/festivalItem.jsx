var React = require('react');
var PropTypes = React.PropTypes;

var FestivalItem = React.createClass({
  getInitialState: function() {
    return {
      extSwitched : false,
    };
  },

  changeImageExt : function(event) {
    if(!this.state.extSwitched){
      var img = React.findDOMNode(this.refs.cardImage);
      img.src = img.src.replace(/\.jpg/, '.png');
      this.setState({
        extSwitched : true
      });
    }
  },

  render: function() {
    var festivalName = this.props.festival.name;
    if(this.props.festival.name.length > 25){
      festivalName = festivalName.substring(0, 25) + '...';
    }

    var imgUrl = 'images/festivals/' + this.props.festival.alias + '.jpg';
    var festivalUrl = '/festivals/' + this.props.festival.alias;
    return (
      <div className="card medium hoverable">
        <a href={festivalUrl} className="card__link">
          <div className="card-image">
            <img src={imgUrl} onError={this.changeImageExt} ref="cardImage"></img>
          </div>
          <div className="card-content">
            <span className="card-title">{festivalName}</span>
          </div>
        </a>
      </div>
    );
  }

});

module.exports = FestivalItem;
