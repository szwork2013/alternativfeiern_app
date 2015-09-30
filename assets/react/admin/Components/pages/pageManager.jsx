var React = require('react');
var Reflux = require('reflux');
var $ = window.jQuery;

var PageItem = require('./pageItem.jsx');
var PageStore = require('../../Stores/PageStore.jsx');
var PageActions = require('../../Actions/PageActions.jsx');

var PageManager = React.createClass({
  mixins : [Reflux.connect(PageStore, 'pages')],

  getInitialState: function() {
    return {
      pages: [],
    };
  },

  addPage : function(event) {
    event.preventDefault();
    var self = this;
    var inputField = React.findDOMNode(this.refs.page_name);
    var pageName = inputField.value;
    PageActions.addPage(pageName, function(){
      inputField.value = '';
    });
  },

  removePage : function(pageId) {
    PageActions.removePage(pageId);
  },

  render: function() {
    var self = this;
    return(
      <div>
        <h3>Seiten</h3>
        <form onSubmit={this.addPage}>
          <div className="row">
            <div className="input-field col s6">
              <input id="page_name" type="text" className="validate" ref="page_name"></input>
              <label htmlFor="page_name">Hinzufügen (FB-Seitenname, z.b. alternativ.feiern)</label>
            </div>
          </div>
        </form>
        <ul className="collection">
          {this.state.pages.map(function(page, index){
            return <PageItem page={page} key={index} remove={self.removePage}/>
          })}
        </ul>
      </div>
    );
  }

});

module.exports = PageManager;
