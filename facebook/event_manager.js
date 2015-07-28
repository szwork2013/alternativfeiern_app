const graph = require('fbgraph');
const Page = require('../models/fb_page');
const async = require('async');

const eventEdge = '/events';

module.exports = {

  getPageEvents : function(pageId, response) {
    graph.get(pageId + eventEdge, {limit: 30}, function(err, res){
      if(err){
        console.error(err);
        response.send(err);
      }
      console.log(res);
      response.send(res.data);
    });
  },

  getAllEventsShort : function(response) {
    var events = [];
    Page.find(function(err, pages){
      if(err){
        console.error(err);
      }
      /*pages.forEach(function(page, index){
        graph.get(page.pageId + eventEdge, {limi: 30}, function(err, res){
          if(err){
            console.error(err);
            response.send(err);
          }
          console.log(res.data);
          res.data.forEach(function(event){
            events.push(event);
          });
          console.log(index);
          console.log(pages.length - 1);
          if(index == pages.length - 1){
            console.log('sending');
            response.send(events);
          }
        });
      });*/
      var callback = function(page){
        console.log('callback');
      };
      async.eachSeries(pages, function(page, callback){
        graph.get(page.pageId + eventEdge, {limi: 30}, function(err, res){
          if(err){
            console.error(err);
            response.send(err);
          }
          console.log(res.data);
          res.data.forEach(function(event){
            events.push(event);
          });
        });
        callback();
      }, function(e){
        if(e) {
          console.log(e);
          throw e;
        }
        response.send(events);
        console.log('done');
      });
    });
  }

}
