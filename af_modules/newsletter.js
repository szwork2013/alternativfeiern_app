const mcapi = require('mailchimp-api');
const config = require('../config/mailchimp');

var mc = new mcapi.Mailchimp(config.apiKey);

module.exports = {
  /*
    subscribes to the alternati-feiern mailchimp list.
    expects data object:
    {
      email : String,
      name  : String,
    }
  */
  subscribe : function(req, res){
    var subscription = {
      id : config.listID,
      email : { email : req.body.email},
      merge_vars : {
        FNAME : req.body.name
      }
    }
    mc.lists.subscribe(subscription, function(data){
      res.send({
        subscribed : true,
      });
    },
    function(error){
      if(error)
      res.send({
        code : error.code,
      });
    });
  }
}
