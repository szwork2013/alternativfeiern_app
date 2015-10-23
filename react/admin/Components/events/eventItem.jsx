var React = require('react');
var PropTypes = React.PropTypes;

var weekdays = {
  'Mon' : 'Mo',
  'Tue' : 'Di',
  'Wed' : 'Mi',
  'Thu' : 'Do',
  'Fri' : 'Fr',
  'Sat' : 'Sa',
  'Sun' : 'So',
};

/*const months = {
  'Jan' : '01',
  'Feb' : '02',
  'Mar' : '03',
  'Apr' : '04',
  'May' : '05',
  'Jun' : '06',
  'Jul' : '07',
  'Aug' : '08',
  'Sep' : '09',
  'Oct' : '10',
  'Nov' : '11',
  'Dec' : '12',
};*/

var EventItem  = React.createClass({

  blacklist : function() {
    this.props.blacklist(this.props.event.fbid);
  },

  recommend : function() {
    this.props.recommend(this.props.event.fbid);
  },

  render: function() {
    var fbUrl = 'https://www.facebook.com/' + this.props.event.fbid;
    var unlistBtn = <a className="btn waves-effect green" onClick={this.blacklist}>+</a>;
    var listBtn = <a className="btn waves-effect red" onClick={this.blacklist}>x</a>;
    var date = new Date(this.props.event.start);
    date.setTime(date.getTime() - date.getTimezoneOffset()*60*1000);
    var weekday = weekdays[/.{3}/.exec(date)[0]];
    return (
      <li className="collection-item">
        <div className="row">
          <a href={fbUrl} target="_blank">
            <div className="col s6 eventLink">
                {this.props.event.name}
            </div>
          </a>
          <div className="col s4">{weekday + ', ' + date.toLocaleDateString()}</div>
          <div className="col s2">
            {this.props.event.isBlacklisted ? unlistBtn : listBtn}
            {this.props.event.isBlacklisted ? null :
                <div className="checkboxWrapper" style={{marginTop : 10}}>
                  <input type="checkbox" id={'check'+this.props.event.fbid} onChange={this.recommend} checked={this.props.event.isRecommended}></input>
                  <label htmlFor={'check'+this.props.event.fbid}>Recommend</label>
                </div>
            }
          </div>
        </div>
      </li>
    );
  }
});

module.exports = EventItem;
