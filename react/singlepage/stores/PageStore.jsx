import Reflux from 'reflux'
import request from 'ajax-request';
import PageActions from '../actions/PageActions.jsx';
var apiUrl = { host : 'http://localhost:8080'}

var data = [];

var PageStore = Reflux.createStore({

  listenables : [PageActions],

  init: function() {
    console.log('PageStore initialized');
    //this.onFetchPages();
  },

  onFetchPages : function() {
    console.log('fetching pages');
    var self = this;
    request({
      url     : apiUrl.host + '/api/pages',
      method  : 'GET'
    }, (err, res, body) => {
      if(res.statusCode == 200){
        self.initialSort(JSON.parse(body));
      }
    });
  },

  onFetchPageEvents : function(fbid) {
    var self = this;
  /*  $.ajax({
      url     : apiUrl.host + '/api/events/page',
      data    : {
        pageId : fbid
      },
      success : function(events) {
        self.singleSort(fbid, events);
      }
    });*/
  },

  onAddPage : function(pageName, callback) {
    var self = this;
    // $.ajax({
    //   method  : 'POST',
    //   url     : apiUrl.host + '/api/pages/add',
    //   data    : {
    //     pageName : pageName
    //   },
    //   success : function(result) {
    //     self.onFetchPages();
    //     callback();
    //   }
    // });
  },

  onRemovePage : function(pageId) {
    var self = this;
    request({
      url     : apiUrl.host + '/api/pages/delete',
      method  : 'POST',
      data    : {
        pageId : pageId
      }
    }, (err, res, body) => {
      if(res.statusCode == 200){
        self.onFetchPages();
      }
    });
  },

  onBlacklistEvent : function(pageId, eventId) {
    var self = this;
    // $.ajax({
    //   method  : 'POST',
    //   url     : apiUrl.host + '/api/events/blacklist',
    //   data    : {
    //     pageId  : pageId,
    //     eventId : eventId
    //   },
    //   success : function(response) {
    //     self.onFetchPageEvents(pageId);
    //   }
    // });
  },

  /*
    HELPER for sorting Events
  */
  initialSort : function(pages) {
    data = [];
    pages.forEach(function(page){
      page.eventCount = page.events.length;
      page.blacklist = [];
      page.whitelist = [];
      page.events.forEach(function(event){
        if(event.isBlacklisted) {
          page.blacklist.push(event);
        } else {
          page.whitelist.push(event);
        }
      });
      page.events = null;
      data.push(page);
    });
    this.trigger(data);
  },

  singleSort : function(pageId, events) {
    data.forEach(function(page){
      if(page.fbid == pageId){
        page.blacklist = [];
        page.whitelist = [];
        events.forEach(function(event){
          if(event.isBlacklisted) {
            page.blacklist.push(event);
          } else {
            page.whitelist.push(event);
          }
        });
        return;
      }
    });
    this.trigger(data);
  }

});

module.exports = PageStore;
