const schedule = require('node-schedule');
const Page = require('../models/fb_page.js');
const EventController = require('../controller/event_controller');

module.exports = {
  /*
    schedules updating of event data.
  */
  setupSchedule : function() {
    var self = this;
    var rule = new schedule.RecurrenceRule();
    rule.hour = [0, 12];
    var job = schedule.scheduleJob(rule, function(){
      self.getNewEvents();
    });
  },

  /*
    triggers updating of event data.
  */
  getNewEvents : function() {
    console.log(Date.now() + ': running event job');
    Page.find(function(err, pages){
      pages.forEach(function(page){
        EventController.getPageEvents(page);
      });
    });
  },

  //TODO which checks image names and event fields
  /*
    if event.img_orig/small == undefined check if image exists
    if not --> try downloading
  */
}
