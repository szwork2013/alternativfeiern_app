var React = require('react');
var $ = window.jQuery;
var EventContainer = require('./eventContainer_wl.jsx');
var apiUrl = require('../config/apiUrl.js');

const Whitelist = React.createClass({
  getInitialState: function() {
    return {
      pages : [],
      allPages : []
    };
  },

  componentWillMount: function() {
    this.getPages();
  },

  getPages : function() {
    var self = this;
    $.ajax({
      url: apiUrl.host + '/api/pages',
      success : function(pages) {
        self.setState({
          pages : pages,
          allPages : pages
        });
      }
    });
  },

  handleInput : function(event) {
    event.preventDefault();
    var input = React.findDOMNode(this.refs.page_name).value;
    var foundPages = [];
    this.state.allPages.forEach(function(page){
      if(page.name.toLowerCase().indexOf(input.toLowerCase()) != -1){
        foundPages.push(page);
      }
    });
    this.setState({
      pages : foundPages,
    });
  },

  addEvent : function(event) {
    event.preventDefault();
    var self = this;
    var id = React.findDOMNode(this.refs.event_id);
    $.ajax({
      method  : 'POST',
      url : apiUrl.host + '/api/events/addPrivate',
      data : {
        id : id.value
      },
      success : function() {
        self.getPages();
        id.value = ''
      },
    });
  },

  render: function() {
    var blackList = this.blackListEvent;
    return (
      <div>
        <h3>Events</h3>
          <form>
            <div className="row">
              <div className="input-field col s6">
                <input id="page_name" type="text" className="validate" ref="page_name" onChange={this.handleInput}></input>
                <label htmlFor="page_name">Suche Seiten</label>
              </div>
              <div className="input-field col s4">
                <input id="event_id" type="text" className="validate" ref="event_id"></input>
                <label htmlFor="event_id">Event hinzufügen (via Facebook-ID)</label>
                <a className="btn" onClick={this.addEvent}>Hinzufügen</a>
              </div>
            </div>
          </form>
        {this.state.pages.map(function(page, index){
          if(page.eventCount > 0)
            return <EventContainer page={page} key={index}></EventContainer>
        })}
      </div>
    );
  }
});

module.exports = Whitelist;
