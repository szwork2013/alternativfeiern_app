const Page = require('../models/fb_page');
const em = require('./event_manager.js');
const graph = require('fbgraph');

module.exports = {

  //Set the auth token for the graph api calls
  setAuthToken : function(token){
    graph.setAccessToken(token);
  },

  //page name should be the name from the facebook url e.g. "www.facebook.com/>>>alternativ.feiern<<<"
  addPage : function(pageName, response){
      var page_query = {
        method : 'GET',
        relative_url : pageName + '?fields=id,name,picture&include_headers=false'
      };
      var event_query = {
        method : 'GET',
        relative_url : pageName + '/events?fields=name,start_time,end_time,description,place,cover,id&include_headers=false'
      };
      var batch_query = [page_query, event_query];
      graph.batch(batch_query, function(err, result) {
        if(err){
          //console.error(err);
          response.send(err);
        } else {
          var pageData = JSON.parse(result[0].body);
          var eventData = JSON.parse(result[1].body);
          console.log(pageData);
            if(!pageData.error){
            Page.findOne({'fbid' : pageData.id}, function(err, page){
              if(err)
                response.send(err);
              if(page) {
                return response.send(page);
              }
              var page = new Page();
              page.fbid = pageData.id;
              console.log(pageData.id);
              console.log(page.fbid);
              page.name = pageData.name;
              page.picture = pageData.picture.data.url;
              console.log(eventData);
              eventData.data.forEach(function(event){
                var singleEvent = {};
                if(Date.parse(event.start_time) > Date.now()){
                  if(event.cover)
                    em.downloadImage(event.cover.source, event.id);
                  singleEvent = {
                    fbid          :   event.id,
                    name          :   event.name,
                    start         :   event.start_time,
                    end           :   event.end_time,
                    location      :   event.place.name,
                    description   :   event.description,
                    cover         :   event.cover ? event.cover.source : null,
                    isBlacklisted :   true,
                  };
                  page.events.push(singleEvent);
                }
              });
              page.save(function(err){
                if(err){
                  console.log(err);
                  response.send({
                    isAdded : false,
                    error : err
                  });
                }
                response.send({
                  isAdded : true
                });
              });
            });
          } else {
            response.send(pageData.error);
          }
        }
      });
  },

  removePage : function(pageId, res){
    if(pageId){
      Page.remove({'fbid': pageId}, function(err){
        if(err){
          console.error(err);
          res.send({
            'isRemoved' : false,
            'error' : err
          });
        }
        console.log(pageId);
        res.send({'isRemoved' : true});
      });
    } else {
      res.send({
        'isRemoved' : false,
        'error' : 'No pageId provided'
      });
    }
  },

  getAllPages : function(res){
    Page.find(function(err, pages){
      if(err) {
         console.error(err);
         res.send(err);
      }
      var lightPages = [];
      var lightPage;
      pages.forEach(function(page){
        lightPage = {
          fbid : page.fbid,
          name : page.name,
          picture : page.picture,
          eventCount : page.events.length
        }
        lightPages.push(lightPage);
      });
      res.send(lightPages);
    });
  },

  getNewEvents : function(page) {
    graph.get(page.fbid + '/events?fields=name,start_time,end_time,description,place,cover,id', function(err, res){
      if(err)
        return console.error(err);
      if(res.data){
        res.data.forEach(function(newEvent){
          var isInArray = false;
          page.events.forEach(function(oldEvent){
            if(newEvent.cover) {
              em.downloadImage(newEvent.cover.source, newEvent.id);
            }
            if(newEvent.id == oldEvent.fbid){
              isInArray = true;
            }
          });
          if(!isInArray && Date.parse(newEvent.start_time) > Date.now()){
            console.log('new event found');
            var event = {
              fbid   :   newEvent.id,
              name   :   newEvent.name,
              start  :   newEvent.start_time,
              end    :   newEvent.end_time,
              location  :   newEvent.place.name,
              description   :   newEvent.description,
              cover   :   newEvent.cover.source,
              isBlacklisted : true,
            }
            page.events.push(event);
          }
        });
        page.save(function(err){
          if(err)
            console.error(err);
        });
      }
    });
  },
}
