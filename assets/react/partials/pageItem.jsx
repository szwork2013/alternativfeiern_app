const React = require('react');
const PropTypes = React.PropTypes;

const PageItem = React.createClass({
  removePage: function(){
    this.props.page.remove(this.props.page.fbid);
  },

  render: function() {
    var fbUrl = "https://www.facebook.com/" + this.props.page.pageId;
    return (
        <li className="collection-item avatar">
          <img src={this.props.page.picture} alt="" className="circle" />
          <span className="title">{this.props.page.name}</span>
          <p>
            {this.props.page.events.length} Events
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
