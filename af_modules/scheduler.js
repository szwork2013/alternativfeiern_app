const schedule = require('node-schedule');
const pm = require('../graphAPI/page_manager.js');
const Page = require('../models/fb_page.js');

module.exports = {
  /*
    schedules updating of event data.
  */
  setupSchedule : function() {
    var self = this;
    var job = schedule.scheduleJob('* 1 * * * *', function(){
      self.getNewEvents();
    });
  },

  /*
    triggers updating of event data.
  */
  getNewEvents : function() {
    Page.find(function(err, pages){
      pages.forEach(function(page){
        pm.getNewEvents(page);
      });
    });
  }
}
