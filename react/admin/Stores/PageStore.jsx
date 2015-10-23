var Reflux = require('reflux');
var $ = window.jQuery;
var PageActions = require('../Actions/PageActions.jsx');
var apiUrl = require('../config/apiUrl.js');

var data = [];

var PageStore = Reflux.createStore({

  listenables : [PageActions],

  init: function() {
    console.log('PageStore initialized');
    this.onFetchPages();
  },

  onFetchPages : function() {
    var self = this;
    $.ajax({
      url     : apiUrl.host + '/api/pages',
      success : function(pages) {
        if(pages){
          self.initialSort(pages);
        }
      }
    })
  },

  onFetchPageEvents : function(fbid) {
    var self = this;
    $.ajax({
      url     : apiUrl.host + '/api/events/page',
      data    : {
        pageId : fbid
      },
      success : function(events) {
        self.singleSort(fbid, events);
      }
    });
  },

  onAddPage : function(pageName, callback) {
    var self = this;
    $.ajax({
      method  : 'POST',
      url     : apiUrl.host + '/api/pages/add',
      data    : {
        pageName : pageName
      },
      success : function(result) {
        self.onFetchPages();
        callback();
      }
    });
  },

  onRemovePage : function(pageId) {
    var self = this;
    $.ajax({
      method  : 'POST',
      url     : apiUrl.host + '/api/pages/delete',
      data    : {
        pageId : pageId
      },
      success : function(result) {
        self.onFetchPages();
      }
    });
  },

  onBlacklistEvent : function(pageId, eventId) {
    var self = this;
    $.ajax({
      method  : 'POST',
      url     : apiUrl.host + '/api/events/blacklist',
      data    : {
        pageId  : pageId,
        eventId : eventId
      },
      success : function(response) {
        self.onFetchPageEvents(pageId);
      }
    });
  },

  onRecommendEvent : function(pageId, eventId) {
    var self = this;
    $.ajax({
      method  : 'POST',
      url     : apiUrl.host + '/api/events/recommend',
      data    : {
        pageId  : pageId,
        eventId : eventId
      },
      success : function(response) {
        self.onFetchPageEvents(pageId);
      }
    });
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
