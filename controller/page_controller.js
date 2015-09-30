const Page = require('../models/fb_page');
const Graph = require('fbgraph');
const config = require('../config/auth.js');
const EventController = require('./event_controller');

Graph.setAccessToken(config.token);

module.exports = {
  /*
      ====================
      CREATE =============
      ====================
  */
  create : function(data, response) {
    var query = data.pageName + '?fields=id,name,picture&include_headers=false'
    Graph.get(query, function(err, result) {
      if(err) {
        response.send({
          error : err
        });
        return console.error(err);
      }
      if(result) {
        Page.findOne({'fbid' : result.id}, function(err, page) {
          if(err) {
            response.send({
              error : err
            })
            return console.error(err);
          }
          if(page) {
            response.send({
              error : 'page already exists'
            });
          } else {
            console.log('new page');
            var page = new Page();
            page.fbid = result.id;
            page.name = result.name;
            if(result.picture) {
              page.picture = result.picture.data.url
            }
            page.save(function(err){
              if(err) {
                response.send({
                  error : err
                });
                console.error(err);
              } else {
                EventController.getPageEvents(page);
                response.send({
                  added : true,
                  page : page
                });
              }
            });
          }
        });
      }
    });
  },

  getAll : function(response) {
    Page.find(function(err, pages){
      if(err) {
         console.error(err);
         response.send(err);
      } else {
        pages.forEach(function(page){
          var activeEvents = [];
          page.events.forEach(function(event){
            if(Date.parse(event.start) >= Date.now()) {
              activeEvents.push(event);
            }
          });
          page.events = activeEvents;
        });
        response.send(pages);
      }
    });
  },

  /*
      ====================
      DELETE =============
      ====================
  */
  delete : function(data, response) {
    Page.findOne({'fbid' : data.pageId}, function(err, page){
      if(err) {
        reponse.send({
          error : err
        });
        return console.error(err);
      } else if(page) {
        //TODO: delete all event images
        page.remove(function(err){
          if(err) {
            console.error(err);
            return response.send({
              error : err
            });
          }
          response.send({
            deleted : true
          });
        });
      } else {
        return response.send({
          error : 'no page found'
        });
      }
    });
  }
}
