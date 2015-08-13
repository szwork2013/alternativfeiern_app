var React = require('react');
var PropTypes = React.PropTypes;

var EventItem = React.createClass({
  handleCardClick : function(event){
    console.log('click');
    window.location('http://alternativ-feiern.de');
  },

  render: function() {
    var cardTitle = <span className="card-title">{this.props.event.name}</span>;
    var cardImage = <div className="card-image"><img src="http://bruecken-festival.de/wordpress/wp-content/uploads/2013/07/slide_08_schuh.jpg"></img>{cardTitle}</div>;
    var cardSize = this.props.image ? "card small" : "card blue-grey";
    var cardColor = this.props.image ? "card-content" : "card-content white-text";
    return (
      <div className={cardSize} onClick={this.handleCardClick}>
        {this.props.image ? cardImage : null}
        <div className={cardColor}>
          {!this.props.image ? cardTitle : null}
          <p>
          13.-15.August, ab 18.00 Uhr
          </p>
        </div>
        <div className="card-action">
          <a href="#">Details</a>
        </div>
      </div>
    );
  }

});

module.exports = EventItem;
