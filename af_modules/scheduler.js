const schedule = require('node-schedule');
const pm = require('../graphAPI/page_manager.js');
const Page = require('../models/fb_page.js');

module.exports = {
  setupSchedule : function() {
    console.log('test123');
    var self = this;
    var job = schedule.scheduleJob('* 1 * * * *', function(){
      console.log('getting new events');
      self.getNewEvents();
    });
  },

  getNewEvents : function() {
    Page.find(function(err, pages){
      pages.forEach(function(page){
        pm.getNewEvents(page);
      });
    });
  }
}
