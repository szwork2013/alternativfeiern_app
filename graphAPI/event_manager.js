const graph = require('fbgraph');
const Page = require('../models/fb_page');
const BlackListEvent = require('../models/blackListEvent');
const fs = require('fs');
const request = require('request');
const path = require('path');
const easyimg = require('easyimage');

const eventEdge = '/events';
const eventFields = '?fields=description,cover';

var pages;

module.exports = {

  getPageEvents : function(pageId, response) {
    Page.findOne({'fbid' : pageId}, function(err, page){
      if(err){
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

  getExtendedEvent : function(eventId, callback) {
    graph.get(eventId + eventFields, function(err, res){
      if(err){
        console.error(err);
        callback(null, err);
      }
      console.log(res);
      callback(res);
    });
  },

  getAllEventsShort : function(response) {
    return response.send([]);
    var self = this;
    var events = [];
    Page.find(function(err, pages){
      if(err){
        console.error(err);
        response.send(err)
      }
      self.pages = pages;
      var query = '?ids=';
      pages.forEach(function(page){
        query += page.pageId + ',';
      });
      query = query.substring(0, query.length-1);
      graph.get(eventEdge + query, function(err, res){
        if(err){
          console.error(err);
          response.send(err);
        }
        self.pages.forEach(function(page){
          pageEvents = res[page.pageId].data;
          pageEvents.forEach(function(singleEvent){
            events.push(singleEvent);
          });
        });
        console.log(events);
        response.send(events);
      });
    });
  },

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
      console.log(whitelisted);
      response.send(whitelisted);
    });
  },

  getTodayWhitelisted : function(response) {
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
            console.log(event.name);
            console.log(event.end);
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

  getSorted : function(response){
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

  getSingle : function(eventId, response) {
    Page.find(function(err, pages){
      if(err){
        console.error(err);
        reponse.render('home/index');
      }
      pages.forEach(function(page){
        page.events.forEach(function(event){
          if(event.fbid == eventId){
            console.log('found event: ' + event.fbid);
            response.render('events/eventPage', {title : event.name, event : event});
          }
        });
      });
    })
  },

  blacklist : function(pageId, eventId, response) {
      Page.findOne({'fbid' : pageId}, function(err, page){
        if(err)
          return response.send(err);
        var state = null;
        page.events.forEach(function(event){
          if(event.fbid == eventId){
            event.isBlacklisted = event.isBlacklisted ? false : true;
            state = event.isBlacklisted;
          }
        });
        page.save(function(err){
          if(err)
            console.error(err);
          return response.send({
              isBlacklisted : state
          });
        });
      })
  },

  downloadImage : function(imgUrl, eventId) {
    var self = this;
    const downloadDir = path.join(__dirname, '../assets/images/events/');
    var fileExt = path.extname(imgUrl);
    fileExt = /\.(jpg|png)/.exec(fileExt)[0];
    fs.exists(downloadDir + eventId + fileExt, function(exists){
      if(!exists){
        request(imgUrl).pipe(fs.createWriteStream(downloadDir + eventId + fileExt)).on('close', function(){
          self.resizeImage(downloadDir + eventId + fileExt, 450);
        });
      }
    });
  },

  resizeImage : function(file, width){
    //Resize pngs after conversion
    var dirname = path.dirname(file);
    var filename = path.basename(file);
    easyimg.resize({src: file, dst: dirname + '/small_' + filename, width: width}, function(err, stdout, stderr){
      if(err){
        console.error(err);
        throw err;
      }
    });
  },

}
