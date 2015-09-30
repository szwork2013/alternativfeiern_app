const Page = require('../models/fb_page');
const Graph = require('fbgraph');
const ImageController = require('./image_controller');
const config = require('../config/auth');

Graph.setAccessToken(config.token);

module.exports = {
  /*
      ====================
      CREATE =============
      ====================
  */
  create : function(page, fbid, manually) {
    var self = this;

    var query = fbid + '?fields=name,start_time,end_time,description,place,cover,id&include_headers=false';
    Graph.get(query, function(err, result) {
      if(err) {
        response.send({
          error : err
        });
        return console.error(err);
      }
      if(result) {
        var event  = {};
        event.fbid = result.id;
        event.name = result.name;
        event.start = result.start_time;
        event.end = result.end_time ? result.end_time : null;
        event.location = result.place ? result.place.name : ' - ';
        event.description = result.description;
        event.isBlacklisted = manually ? false : true;

        var doublCheckIsNew = true;
        page.events.forEach(function(storedEvent){
          if(storedEvent.fbid == event.fbid) {
            doublCheckIsNew = false;
          }
        });
        if(doublCheckIsNew) {
          page.events.push(event);
          page.save(function(err){
            if(err){
              return console.error(err);
            }
            console.log('saved new event: ', page.name + ': ' + event.name);
          });
          if(result.cover) {
            ImageController.download(result.cover.source, '/events', event.fbid, self.saveImgName);
          }
        }
      }
    });
  },

  /*
    ====================
    GET ================
    ====================
  */
  get : function (id, response) {
    Page.findOne({'events.fbid' : id}, function(err, page){
      if(err) {
        console.error(err);
        response.redirect('/');
      }
      if(page) {
        page.events.forEach(function(event){
          if(event.fbid == id) {
            return response.render('events/eventPage', {title : event.name, event : event});
          }
        });
      }
    });
  },

  /*
    ====================
    GET BY PAGE ========
    ====================
  */
  getByPage : function(id, response) {
    Page.findOne({'fbid' : id}, function(err, page){
      if(err) {
        console.error(err);
        response.send({
          events : [],
          error : err
        });
      } else {
        response.send(page.events);
      }
    });
  },


  /*
    ===================
    GET WHITELISTED  ==
    ===================
  */
  getWhitelisted : function(response) {
    var whitelisted = [];
    Page.find(function(err, pages){
      if(err){
        console.error(err);
        response.send(err);
        return;
      }
      pages.forEach(function(page){
        page.events.forEach(function(event){
          if(!event.isBlacklisted){
            whitelisted.push(event);
          }
        });
      });
      response.send(whitelisted);
    });
  },

  /*
    ==========================
    GET WHITELISTED--sorted ==
    ==========================
  */
  getWhitelistedSorted : function(response) {
    var sortedEvents = [[]];
    for(var i = 0; i < 12; i++){
      sortedEvents[i] =[];
    }
    var now = new Date((Date.now() - Date.now()%1000));
    now.setDate(now.getDate());
    Page.find(function(err, pages){
      if(err){
        console.error(err);
        return [];
      }
      pages.forEach(function(page){
        page.events.forEach(function(event){
          if(!event.isBlacklisted){
            var startTime = new Date(Date.parse(event.start));
            if(startTime.toDateString() != now.toDateString()){
              if(startTime > now){
                sortedEvents[startTime.getMonth()].push(event);
              }
            }
          }
        })
      });
      //sort inner arrays near future ----> far future
      sortedEvents.forEach(function(events){
        events.sort(function(a, b){
          return Date.parse(a.start) - Date.parse(b.start);
        });
      })
      response.send(sortedEvents);
    })
  },

  /*
    =========================
    GET WHITELISTED--today ==
    =========================
  */
  getWhitelistedToday : function(response) {
    var todayWhitelisted = [];
    var now = new Date((Date.now() - Date.now()%1000));
    now.setDate(now.getDate());
    Page.find(function(err, pages){
      if(err){
        console.error(err);
        response.send(err);
        return;
      }
      pages.forEach(function(page){
        page.events.forEach(function(event, index){
          if(!event.isBlacklisted) {
            var startTime = new Date(Date.parse(event.start));
            var endTime = event.end ? new Date(Date.parse(event.end)) : null;
            if(endTime){
              if(startTime <= now && endTime >= now){
                todayWhitelisted.push(event);
              }
            } else {
              if(startTime.toDateString() == now.toDateString()){
                todayWhitelisted.push(event);
              }
            }
          }
        });
      });
        response.send(todayWhitelisted);
    });
  },

  /*
    =================
    ADD--manually ===
    =================
  */

  addManually : function(id) {
    var self = this;

    Page.findOne({'fbid' : '703596129748908'}, function(err, page){
      if(err) {
        return console.error(err);
      }
      if(page) {
        var isNew = true;
        page.events.forEach(function(event){
          if(event.fbid == id){
            isNew = false;
            return;
          }
        });
        if(isNew) {
          return self.create(page, id, true);
        }
      }
    });
  },

  /*
    =============
    BLACKLIST ===
    =============
  */
  blacklist : function(pageId, eventId, response) {
    var self = this;
    Page.findOne({'fbid' : pageId}, function(err, page){
      if(err) {
        console.error(err);
        return response.send({
          error : err
        });
      }
      if(page) {
        page.events.forEach(function(event){
          if(event.fbid == eventId) {
            event.isBlacklisted = !event.isBlacklisted;
            return page.save(function(err){
              if(err){
                return console.error(err);
              } else {
                return response.send({
                  isBlacklisted : event.isBlacklisted
                });
              }
            });
          }
        });
      }
    });
  },

  /*
    =======================
    HELPER:               =
      gets 30 page        =
      events.             =
      triggers event      =
      creation if event   =
      is new              =
    =======================
  */
  getPageEvents : function(page) {
    var self = this;
    var query = page.fbid + '/events?limit=30';
    Graph.get(query, function(err, result){
      if(err) {
        console.error(err);g
      }
      if(result.data) {
        result.data.forEach(function(event){
          var isNew = true;
          page.events.forEach(function(storedEvent){
            if(storedEvent.fbid == event.id) {
              isNew = false;
            }
          });
          if(Date.parse(event.start_time) > Date.now() && isNew){
            self.create(page, event.id);
          }
        });
      }
    });
  },

  /*
    =========================
    HELPER: store img name ==
    =========================
  */
  saveImgName : function(img_orig, img_small, fbid) {
    Page.findOne({'events.fbid' : fbid}, function(err, page){
      if(err) {
        return console.error(err);
      }
      if(page) {
        page.events.forEach(function(event){
          if(event.fbid == fbid){
            event.img_orig = img_orig;
            event.img_small = img_small;
            return page.save(function(err){
              if(err) {
                return console.error(err);
              }
            });
          }
        })
      }
    });
  },
}
