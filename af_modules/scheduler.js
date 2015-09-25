const schedule = require('node-schedule');
const Page = require('../models/fb_page.js');
const EventController = require('../controller/event_controller');

module.exports = {
  /*
    schedules updating of event data.
  */
  setupSchedule : function() {
    var self = this;
    var job = schedule.scheduleJob('* * 1 * * *', function(){
      self.getNewEvents();
    });
  },

  /*
    triggers updating of event data.
  */
  getNewEvents : function() {
    Page.find(function(err, pages){
      pages.forEach(function(page){
        EventController.getPageEvents(page);
      });
    });
  }
}
