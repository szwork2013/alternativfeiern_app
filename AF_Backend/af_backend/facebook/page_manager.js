const Page = require('../models/fb_page');
const graph = require('fbgraph');

module.exports = {

  //Set the auth token for the graph api calls
  setAuthToken : function(token){
    graph.setAccessToken(token);
  },

  //page name should be the name from the facebook url e.g. "www.facebook.com/>>>alternativ.feiern<<<"
  addPage : function(pageName, res){
    graph.get(pageName, function(err, result) {
      if(err){
        console.error(err);
        res.send(err);
      } else {
        var page = new Page();
        page.pageId = result.id;
        page.pageName = result.name;
        page.save(function(err){
          if(err)
            throw err;
          res.send({'isAdded' : true});
        });
      }
    });
  },

  removePage : function(pageId, res){
    if(pageId){
      Page.remove({'pageId': pageId}, function(err){
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
      console.log(pages);
      res.send(pages);
    });
  },
}
