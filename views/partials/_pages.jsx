const React = require('react');
const Page_Manager = require('../../facebook/page_manager');


const Pages = React.createClass({
  getInitialState: function() {
    return {
      pages : [],
    };
  },

  componentWillMount: function() {
    Page_Manager.setAuthToken(' ');
    var pages = Page_Manager.getAllPages();
    this.setState({
      pages : pages
    });
  },

  render: function() {
    return (
      <div>
        <ul>
          {this.state.pages.map(function(page){
            return <li key={page.id}>{page.pageName}</li>;
          })}
        </ul>
      </div>
    );
  }

});

module.exports = Pages;
