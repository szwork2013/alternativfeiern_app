const graph = require('fbgraph');

module.exports = {

  //Set the auth token for the graph api calls
  setAuthToken : function(token){
    graph.setAccessToken(token);
  },

  //Get event from a single fb page
  getPageEvents : function(pageId) {
    graph.get("alternativ.feiern/events", function(err, res){
      if(err){
        console.log(err);
      } else {
        console.log(res);
      }
    });
  }

};
