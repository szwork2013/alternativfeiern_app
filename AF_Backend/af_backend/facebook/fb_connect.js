const graph = require('fbgraph');

module.exports = {

  //Set the auth token for the graph api calls
  setAuthToken : function(token){
    graph.setAccessToken('CAACEdEose0cBAPeszjP6QwBOjwoSDeZAXyFCY5oQXNDA3Qf6AIilxFIB5OXE9nqMZADZCEq6KqURZASsddBoK72jr5AqZBUF8zphaZBlH4GFHrauxdS3PpuEo61J6ydZCMepDTVpRZCWENlvYo77hZA3Ve0vwZBgwZAxF4rQ8nflZADgsbzMbDJoAbhkWYNO9zZBCDzgZD');
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
