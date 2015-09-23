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
        } else if(festival) {
          console.log('found festival: ', festival.name);
          response.render('festivals/festivalPage', {title : festival.name, festival: festival});
        } else {
          return console.error('festival null for alias: ', alias);
        }
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
        festival.price = newFestival.price;
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

  updateFestival : function(updatedFestival, response) {
    var self = this;
    console.log(updatedFestival);
    updatedFestival = updatedFestival.festival;
    Festival.findOne({'_id' : updatedFestival._id}, function(error, festival){
      if(error){
        return response.send(error);
      }
      festival.name = updatedFestival.name ? updatedFestival.name : festival.name;
      festival.website = updatedFestival.website ? updatedFestival.website : festival.website;
      festival.city = updatedFestival.name ? updatedFestival.city : festival.city;
      festival.description = updatedFestival.description ? updatedFestival.description : festival.description;
      festival.price = updatedFestival.price ? updatedFestival.price : festival.price;
      festival.alias = festival.name.replace(/ /g, '').toLowerCase();
      if(updatedFestival.img) {
        self.deleteImage(festival.img);
        self.downloadImage(updatedFestival.img, festival.name);
      } else {
        self.renameImage(festival.img, festival.alias);
      }
      festival.save(function(error){
        if(error){
          console.error(error);
        } else {
          console.log('festival updated: ', festival.name);
          response.send({
            updated : true
          });
        }
      });
    });
  },

  removeFestival : function(id, response) {
    var self = this;

    var errResponse = {
      removed : true,
      msg   : ''
    };

    if(id) {
      Festival.findOne({'_id' : id}, function(error, festival){
        if(error) {
          return
        } else {
          self.deleteImage(festival.imgName);
        }
      });
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
    fileExt = /\.(jpg|png|gif)/.exec(path.extname(imgUrl))[0];
    if(fileExt == '.gif') {
      return console.error('download festival img: dont use GIF images');;
    }
    fs.exists(downloadDir + festivalAlias + fileExt, function(exists){
      if(!exists) {
        request(imgUrl).pipe(fs.createWriteStream(downloadDir + festivalAlias + fileExt)).on('close', function(){
          console.log('downloaded festival image');
          self.saveImgName(festivalAlias + fileExt, festivalAlias);
          return;
        });
      } else {
        console.log('image already exists');
        return;
      }
    });
  },

  saveImgName : function(imgName, festivalAlias) {
    Festival.find(function(error, festivals){
      if(error) {
        return console.error(error);
      } else {
        festivals.forEach(function(festival){
          if(festival.alias == festivalAlias) {
            festival.img = imgName;
            return festival.save(function(error) {
              if(error) {
                console.error(error);
              } else {
                console.log('save festival img: ', imgName);
              }
            });
          }
        });
      }
    });
  },

  deleteImage : function(imgName) {
    const dir = path.join(__dirname, '../assets/images/festivals/');
    fs.exists(dir + imgName, function(exists){
      if(exists){
        fs.unlink(dir + imgName, function(){
          console.log('deleted img', dir + imgName);
        });
      } else {
        console.error('can´t delete img, doesn´t exist: ', dir + imgName);
      }
    });
  },

  renameImage : function(imgName, festivalAlias) {
    const dir = path.join(__dirname, '../assets/images/festivals/');
    if(/\.(png|jpg)/.exec(imgName)) {
      var fileExt = /\.(png|jpg)/.exec(imgName)[0];
    } else {
      return console.log('error with fileextension');
    }
    var self = this;
    fs.exists(dir + imgName, function(exists){
      if(exists){
        fs.rename(dir + imgName, dir + festivalAlias + fileExt, function(error){
          if(error) {
            console.error(error);
          } else {
            self.saveImgName(festivalAlias + fileExt, festivalAlias);
          }
        });
      } else {
        console.error('can´t rename img, doesn´t exist: ', dir + imgName);
      }
    });
  }
}
