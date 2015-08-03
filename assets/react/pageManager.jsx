const React = require('react');
const $ = window.jQuery;
const PropTypes = React.PropTypes;
const PageItem = require('./partials/pageItem.jsx');
const apiUrl = require('./apiUrl.jsx');

const PageManager = React.createClass({
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
      url: apiUrl.host + '/api/pages',
      success : function(pages) {
        console.log(pages);
        self.setState({
          pages : pages
        });
      }
    });
  },

  addPage : function(event) {
    event.preventDefault();
    var self = this;
    var inputField = React.findDOMNode(this.refs.page_name);
    var pageName = inputField.value;
    $.ajax({
      method  : 'POST',
      url     : 'http://localhost:8000/api/pages/add',
      data    : {
        pageName : pageName
      },
      success : function() {
        inputField.value = '';
        self.getPages();
      }
    });
  },

  removePage : function(pageId) {
    var self = this;
    $.ajax({
      method  : 'POST',
      url   : 'http://localhost:8000/api/pages/delete',
      data  : {
        pageId : pageId
      },
      success : function() {
        self.getPages();
      },
    });
  },

  render: function() {
    var removePage = this.removePage
    return(
      <div>
        <h3>Seiten</h3>
        <form onSubmit={this.addPage}>
          <div className="row">
            <div className="input-field col s6">
              <input id="page_name" type="text" className="validate" ref="page_name"></input>
              <label htmlFor="page_name">Hinzufügen</label>
            </div>
          </div>
        </form>
        <ul className="collection">
          {this.state.pages.map(function(page, index){
            page.remove = removePage;
            return <PageItem page={page} key={index}></PageItem>
          })}
        </ul>
      </div>
    );
  }

});

module.exports = PageManager;
