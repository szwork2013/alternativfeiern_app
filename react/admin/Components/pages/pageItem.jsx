var React = require('react');

var PageItem = React.createClass({

  removePage: function(event){
    event.preventDefault();
    this.props.remove(this.props.page.fbid);
  },

  render: function() {
    var fbUrl = "https://www.facebook.com/" + this.props.page.fbid;
    return (
        <li className="collection-item avatar">
          <img src={this.props.page.picture} alt="" className="circle" />
          <span className="title">{this.props.page.name}</span>
          <p>
            {this.props.page.eventCount} Event{this.props.page.eventCount > 1 ? 's' : ''}
          </p>
          <p>
            <a href={fbUrl} target="_blank">Facebook-Seite</a>
          </p>
          <button className="waves-effect waves-light secondary-content btn-floating red" onClick={this.removePage}>x</button>
        </li>
    );
  }

});

module.exports = PageItem;
