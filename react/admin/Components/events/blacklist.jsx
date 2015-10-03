var React = require('react');
var Reflux = require('reflux');
var $ = window.jQuery;

var PageStore = require('../../Stores/PageStore.jsx');
var PageActions = require('../../Actions/PageActions.jsx');
var EventContainer = require('./eventContainer.jsx');


var Blacklist = React.createClass({
  mixins : [Reflux.connect(PageStore, 'pages')],

  getInitialState: function() {
    return {
      pages : [],
      allPages : []
    };
  },

  handleInput : function(event) {

  },

  blacklist : function(pageId, eventId) {
    PageActions.blacklistEvent(pageId, eventId);
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
            </div>
          </form>
          {this.state.pages.map(function(page){
            return page.blacklist.length > 0 ? <EventContainer page={page} events={page.blacklist} key={page.fbid} blacklist={self.blacklist}/> : null
          })}
      </div>
    );
  }
});

module.exports = Blacklist;
