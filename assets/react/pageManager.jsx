const React = require('react');
const $ = window.jQuery;
const PropTypes = React.PropTypes;
const PageItem = require('./partials/pageItem.jsx');

const PageManager = React.createClass({
  getInitialState: function() {
    return {
      pages: []
    };
  },

  componentWillMount: function() {
    var self = this;
    $.ajax({
      url: 'http://localhost:8080/api/pages',
      success : function(pages){
        self.setState({
          pages : pages
        });
      }
    });
  },

  render: function() {
    return(
      <div>
        <h3>Pages</h3>
        <div className="collection">
          {this.state.pages.map(function(page, index){
            return <PageItem page={page} key={index}></PageItem>
          })}
        </div>
      </div>
    );
  }

});

module.exports = PageManager;
