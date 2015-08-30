const graph = require('fbgraph');
const Page = require('../models/fb_page');
const fs = require('fs');
const request = require('request');
const path = require('path');
const easyimg = require('easyimage');

const eventEdge = '/events';
const eventFields = '?fields=description,cover';

var pages;

module.exports = {
  //responds with an array of all events of a given page
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

  //responds with a short version of all events. mainly omitting the event description.
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

  //responds with an array of all whitelisted events
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

  //responds with an array of alle whitelisted events happening today
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

  /*
    returns a two-dimensional array of all whitelisted events sorted after month.
    Example:
      [
        [events for january],
        [events for february],
        ...
      ]
  */
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

  //responds with a single event given the event id
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

  /*
    adds a single event to the Alternativ-Feiern page entry.
    triggers event cover download.
    only requires a facebook event id, queries the data via graph api.
  */
  pushPrivateEvent : function(eventId) {
    var self = this;
    Page.findOne({'fbid' : '703596129748908'}, function(err, page){
      if(err) {
        console.error(err);
        return;
      }
      graph.get(eventId + '?fields=id,name,start_time,end_time,place,description,cover', function(err, res){
        if(err){
          console.error(err);
          return;
        }
        console.log('Private Event: ', res);
        var newEvent = {};
        newEvent.fbid = res.id;
        newEvent.name = res.name;
        newEvent.start = res.start_time;
        if(res.end_time)
          newEvent.end = res.end_time;
        newEvent.location = res.place.name;
        newEvent.description = res.description;
        if(res.cover) {
          newEvent.cover = res.cover.source;
          self.downloadImage(newEvent.cover, newEvent.fbid);
        }
        var isAdded = false;
        page.events.forEach(function(event){
          if(event.fbid == newEvent.fbid) {
            isAdded = true;
            return console.log('event already in array: ', event);
          }
        });
        if(!isAdded){
          page.events.push(newEvent);
          page.save(function(err){
            if(err)
              console.error(err);
          });
        }
      });
    });
  },

  //sets the blacklist flag of an event depending on its current state
  blacklist : function(pageId, eventId, response) {
    var self = this;
    Page.findOne({'fbid' : pageId}, function(err, page){
      if(err)
        return response.send(err);
      var state = null;
      page.events.forEach(function(event){
        if(event.fbid == eventId){
          event.isBlacklisted = event.isBlacklisted ? false : true;
          state = event.isBlacklisted;
          if(!event.isBlacklisted)
            if(event.cover)
              self.downloadImage(event.cover, event.fbid);
        }
      });
      page.save(function(err){
        if(err)
          console.error(err);
        return response.send({
            isBlacklisted : state
        });
      });
    });
  },

  //downloads a image for an event given the image url and event id.
  //also triggers the resizing of that image.
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

  //resizes an image
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
