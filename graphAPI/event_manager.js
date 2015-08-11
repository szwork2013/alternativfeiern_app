const graph = require('fbgraph');
const Page = require('../models/fb_page');
const BlackListEvent = require('../models/blackListEvent');

const eventEdge = '/events';
const eventFields = '?fields=description,cover';

var pages;

module.exports = {

  getPageEvents : function(pageId, response) {
    Page.findOne({'fbid' : pageId}, function(err, page){
      if(err){
        console.error(err);
        response.send({
          events : [],
          error : err
        });
      } else {
        response.send(page.events);
      }
    });
  },

  getExtendedEvent : function(eventId, callback) {
    graph.get(eventId + eventFields, function(err, res){
      if(err){
        console.error(err);
        callback(null, err);
      }
      console.log(res);
      callback(res);
    });
  },

  getAllEventsShort : function(response) {
    return response.send([]);
    var self = this;
    var events = [];
    Page.find(function(err, pages){
      if(err){
        console.error(err);
        response.send(err)
      }
      self.pages = pages;
      var query = '?ids=';
      pages.forEach(function(page){
        query += page.pageId + ',';
      });
      query = query.substring(0, query.length-1);
      graph.get(eventEdge + query, function(err, res){
        if(err){
          console.error(err);
          response.send(err);
        }
        self.pages.forEach(function(page){
          pageEvents = res[page.pageId].data;
          pageEvents.forEach(function(singleEvent){
            events.push(singleEvent);
          });
        });
        console.log(events);
        response.send(events);
      });
    });
  },

  getWhitelisted : function(response) {
    var whitelisted = [];
    Page.find(function(err, pages){
      if(err){
        console.error(err);
        response.send(err);
        return;
      }
      pages.forEach(function(page){
        page.events.forEach(function(event){
          if(!event.isBlacklisted){
            whitelisted.push(event);
          }
        });
      });
      console.log(whitelisted);
      response.send(whitelisted);
    });
  },

  getTodayWhitelisted : function(response) {
    var todayWhitelisted = [];
    var now = new Date((Date.now() - Date.now()%1000));
    now.setDate(now.getDate());
    Page.find(function(err, pages){
      if(err){
        console.error(err);
        response.send(err);
        return;
      }
      pages.forEach(function(page){
        page.events.forEach(function(event, index){
          if(!event.isBlacklisted) {
            var startTime = new Date(Date.parse(event.start));
            var endTime = event.end ? new Date(Date.parse(event.end)) : startTime + 43200;
            if(startTime.toDateString() == now.toDateString()){
              todayWhitelisted.push(event);
            }
          }
        });
      });
      response.send(todayWhitelisted);
    });
  },

  blacklist : function(pageId, eventId, response) {
      Page.findOne({'fbid' : pageId}, function(err, page){
        if(err)
          return response.send(err);
        var state = null;
        page.events.forEach(function(event){
          if(event.fbid == eventId){
            event.isBlacklisted = event.isBlacklisted ? false : true;
            state = event.isBlacklisted;
          }
        });
        page.save(function(err){
          if(err)
            console.error(err);
          return response.send({
              isBlacklisted : state
          });
        });
      })
  }

}
