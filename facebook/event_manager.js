const graph = require('fbgraph');
const Page = require('../models/fb_page');
const BlackListEvent = require('../models/blackListEvent');

const eventEdge = '/events';
const eventFields = '?fields=description,cover';

var pages;

module.exports = {

  getPageEvents : function(pageId, callback) {
    graph.get(pageId + eventEdge, {limit: 30}, function(err, res){
      if(err){
        callback([], err);
      }
      console.log(res);
      callback(res.data);
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

//TODO: Filter events (past/future), sort events (now-later)
  blackListEvent : function(eventId, response) {
    if(eventId){
      Page.findOne({'fbid': eventId}, function(err, res){
        if(err){
          console.error(err);
          response.send(err);
        }
        if(res){
          console.log('already blacklisted:[id]' + res.fbid);
          response.send('already blacklisted');
        } else {
          var blEvent = new BlackListEvent();
          blEvent.fbid = eventId;
          blEvent.save(function(err){
            if(err){
              throw err;
            }
            response.send({blacklisted  : true});
          });
        }
      });
    } else {
      console.log('no eventId');
      response.send('no eventId');
    }
  }

}
