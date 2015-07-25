const Page = require('../models/fb_page');
const graph = require('fbgraph');

module.exports = {

  //Set the auth token for the graph api calls
  setAuthToken : function(token){
    graph.setAccessToken('CAACEdEose0cBAPeszjP6QwBOjwoSDeZAXyFCY5oQXNDA3Qf6AIilxFIB5OXE9nqMZADZCEq6KqURZASsddBoK72jr5AqZBUF8zphaZBlH4GFHrauxdS3PpuEo61J6ydZCMepDTVpRZCWENlvYo77hZA3Ve0vwZBgwZAxF4rQ8nflZADgsbzMbDJoAbhkWYNO9zZBCDzgZD');
  },

  //page name should be the name from the facebook url e.g. "www.facebook.com/>>>alternativ.feiern<<<"
  addPage : function(pageName){
    graph.get(pageName, function(err, res) {
      if(err){
        console.error(res);
      } else {
        var page = new Page();
        page.pageId = res.id;
        page.pageName = res.name;
        page.save(function(err){
          if(err)
            throw err;
        });
      }
    });
  },

  getAllPages : function(){
    Page.find(function(err, pages){
      if(err)
        return console.error(err);
      console.log(pages);
    })
  },
}
