import React from 'react';
import PageActions from '../../../actions/PageActions.jsx'

class PageItem extends React.Component {
  constructor(props){
    super(props);
    this.removePage = this.removePage.bind(this);
  }

  removePage(){
    PageActions.removePage(this.props.page.fbid);
  }

  render(){
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
    )
  }
}

export default PageItem;
