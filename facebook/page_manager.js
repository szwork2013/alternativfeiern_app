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
      relative_url : pageName + '/events?fields=name,start_time,end_time,description,location,cover,id&include_headers=false'
    };
    var batch_query = [page_query, event_query];
    graph.batch(batch_query, function(err, result) {
      if(err){
        console.error(err);
        res.send(err);
      } else {
        var pageData = JSON.parse(result[0].body);
        var eventData = JSON.parse(result[1].body);
        console.log(eventData);
        var page = new Page();
        page.fbid = pageData.id;
        page.name = pageData.name;
        page.picture = pageData.picture.data.url;
        eventData.data.forEach(function(event){
          var singleEvent = {};
          console.log(event);
          if(Date.parse(event.start_time) > Date.now()){
            singleEvent = {
              fbid          :   event.id,
              name          :    event.name,
              start         :   event.start_time,
              end           :   event.end_time,
              location      :   event.location,
              description   :   event.description,
              cover         :   event.cover.source,
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
        })
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
      res.send(pages);
    });
  },
}
