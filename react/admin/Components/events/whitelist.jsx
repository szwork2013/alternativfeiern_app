var React = require('react');
var Reflux = require('reflux');
var $ = window.jQuery;

var apiUrl = require('../../config/apiUrl.js');
var PageStore = require('../../Stores/PageStore.jsx');
var PageActions = require('../../Actions/PageActions.jsx');
var EventContainer = require('./eventContainer.jsx');

var Whitelist = React.createClass({
  mixins : [Reflux.connect(PageStore, 'pages')],

  getInitialState: function() {
    return {
      pages : [],
    };
  },

  handleInput : function(event) {

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
        id.value = '';
        PageActions.fetchPageEvents('703596129748908');
      },
    });
  },

  blacklist : function(pageId, eventId) {
    PageActions.blacklistEvent(pageId, eventId);
  },

  recommend : function(pageId, eventId) {
    PageActions.recommendEvent(pageId, eventId);
  },

  render: function() {
    var self = this;
    return (
      <div>
        <h3>Events</h3>
          <form>
            <div className="row">
              <div className="input-field col s6">
                <input id="page_name" type="text" className="validate" ref="page_name" onChange={this.handleInput} disabled></input>
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
            return page.whitelist.length > 0 ? <EventContainer page={page}
                                                               events={page.whitelist}
                                                               key={page.fbid}
                                                               blacklist={self.blacklist}
                                                               recommend={self.recommend}  /> : null
        })}
      </div>
    );
  }
});

module.exports = Whitelist;
