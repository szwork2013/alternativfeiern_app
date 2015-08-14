const React = require('react');
const $ = window.jQuery;
const PropTypes = React.PropTypes;
const EventContainer = require('./partials/eventContainer_wl.jsx');
const apiUrl = require('./apiUrl.jsx');

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
        console.log(pages);
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
