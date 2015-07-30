const React = require('react');
const $ = window.jQuery;
const PropTypes = React.PropTypes;
const EventContainer = require('./partials/eventContainer.jsx');

const EventManager = React.createClass({
  getInitialState: function() {
    return {
      pages: []
    };
  },

  componentWillMount: function() {
    this.getPages();
  },

  getPages : function() {
    var self = this;
    $.ajax({
      url: 'http://localhost:8000/api/pages',
      success : function(pages) {
        console.log(pages);
        self.setState({
          pages : pages
        });
      }
    });
  },

  render: function() {
    var blackList = this.blackListEvent;
    return (
      <div>
        <h3>Events</h3>
        {this.state.pages.map(function(page, index){
          return <EventContainer page={page} key={index}></EventContainer>
        })}
      </div>
    );
  }
});

module.exports = EventManager;
