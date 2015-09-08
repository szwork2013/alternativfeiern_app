var React = require('react');
var PropTypes = React.PropTypes;
var Image = require('legit-image');

var FestivalItem = React.createClass({

  render: function() {
    var festivalName = this.props.festival.name;
    if(this.props.festival.name.length > 25){
      festivalName = festivalName.substring(0, 25) + '...';
    }

    var imgUrl = 'images/festivals/' + this.props.festival.img;
    var festivalUrl = '/festivals/' + this.props.festival.alias;
    return (
      <div className="card medium hoverable card--appear">
        <a href={festivalUrl} className="card__link">
          <div className="card-image">
            <Image src={imgUrl} ref="cardImage" />
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
