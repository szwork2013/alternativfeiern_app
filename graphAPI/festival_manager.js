const Festival = require('../models/festival');
const path = require('path');
const fs = require('fs');
const request = require('request');

module.exports = {
  //responds with an array of all festivals
  getFestivals : function(response) {
    Festival.find(function(err, festivals){
      if(err) {
        response.send({
          msg : 'no festivals',
        });
      }
      response.send(festivals);
    });
  },

  //reponds with a single festival given an alias
  getFestival : function(alias, response) {
    var self = this;

    var errResponse = {
      found : true,
      msg : ''
    };

    if(!alias | alias.length < 1) {
      errResponse.found = false;
      errResponse.msg = 'no alias supplied';
    } else {
      Festival.findOne({'alias' : alias}, function(err, festival){
        if(err) {
          errResponse.found = false;
          errResponse.msg = 'could not found festival with alias: ' + alias;
          return response.send(errResponse);
        }
        console.log('found festival: ', festival.name);
        response.render('festivals/festivalPage', {title : festival.name, festival: festival});
      });
    }
  },

  /*
    adds a festival to the db. expects following object:

    {
      name        : String, required
      description : String, required
      city        : String, required
      price       : String, required
      website     : Url, required
      img         : Url, required
    }

  */
  addFestival : function(newFestival, response) {
    var self = this;

    var errResponse = {
      added : true,
      msg   : ''
    };

    if (!newFestival.name | newFestival.name.length < 1) {
      errResponse.added = false;
      errResponse.msg = 'No name given or name too short (<0).';
    }
    else if (!newFestival.description) {
      errResponse.added = false;
      errResponse.msg = 'No description given.'
    }
    else if (!newFestival.city | newFestival.city.length < 1) {
      errResponse.added = false;
      errResponse.msg = 'No city given or city name too short (<0)';
    }
    else if (!newFestival.website | newFestival.website.length < 1) {
      errResponse.added = false;
      errResponse.msg = 'No website given or website url too short (<0)';
    }

    else if (!newFestival.price | newFestival.price.length < 1) {
      errResponse.added = false;
      errResponse.msg = 'No price given.';
    }


    if(errResponse.added){
      Festival.findOne({'name' : newFestival.name}, function(err, festival){
        if(err) {
          errResponse.added = false;
          errResponse.msg = "error adding festival.";
          return response.send(errResponse);
        }
        if(festival) {
          errResponse.added = false;
          errResponse.msg = "festival already exists";
          errResponse.festival = festival;
          return response.send(errResponse);
        }
        var festival = new Festival();
        festival.name = newFestival.name;
        festival.description = newFestival.description;
        festival.city = newFestival.city;
        festival.website = newFestival.website;
        festival.alias = newFestival.name.replace(/ /g,'').toLowerCase();
        festival.save(function(err) {
          if(err) {
            errResponse.added = false;
            errResponse.msg = "error saving festival";
          }
          console.log('added festival: ', festival);
          self.downloadImage(newFestival.img, festival.alias);
          response.send(errResponse);
        });
      });
    } else {
      response.send(errResponse);
    }
  }, /* end addfestival */

  removeFestival : function(id, response) {
    var errResponse = {
      removed : true,
      msg   : ''
    };

    if(id) {
      Festival.remove({'_id' : id}, function(err){
        if(err){
          errResponse.remove = false;
          errResponse.msg = 'could not remove festival.';
          return response.send(errResponse);
        }
        console.log('removed festival', id);
        response.send(errResponse);
      });
    }
  },

  downloadImage : function(imgUrl, festivalAlias) {
    var self = this;
    const downloadDir = path.join(__dirname, '../assets/images/festivals/');
    fileExt = /\.(jpg|png)/.exec(path.extname(imgUrl))[0];
    fs.exists(downloadDir + festivalAlias + fileExt, function(exists){
      if(!exists) {
        request(imgUrl).pipe(fs.createWriteStream(downloadDir + festivalAlias + fileExt)).on('close', function(){
          console.log('downloaded festival image');
          return;
        });
      } else {
        console.log('image already exists');
        return;
      }
    });
  }
}
