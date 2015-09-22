const Location = require('../models/location');
const path = require('path');
const fs = require('fs');
const request = require('request');

module.exports = {
  //responds with an array of all locations
  getLocations : function(response) {
    Location.find(function(err, locations){
      if(err) {
        response.send({
          msg : 'no locations',
        });
      }
      response.send(locations);
    });
  },

  //responds with an array of all locations of a given city
  getLocationsByCity: function(cityName, response) {

  },

  //reponds with a single location given an id
  getLocation : function(alias, response) {
    var self = this;

    var errResponse = {
      found : true,
      msg : ''
    };

    if(!alias | alias.length < 1) {
      errResponse.found = false;
      errResponse.msg = 'no alias supplied';
    } else {
      Location.findOne({'alias' : alias}, function(err, location){
        if(err) {
          errResponse.found = false;
          errResponse.msg = 'could not found location with alias: ' + alias;
          return response.send(errResponse);
        }
        console.log('found location: ', location.name);
        response.render('locations/locationPage', {title : location.name, location: location});
      });
    }
  },

  /*
    adds a location to the db. expects following object:

    {
      name        : String, required
      description : String, required
      address     : String, required
      city        : String, required
      website     : Url, required
      img         : Url, required
    }

  */
  addLocation : function(newLocation, response) {
    var self = this;

    var errResponse = {
      added : true,
      msg   : ''
    };

    if (!newLocation.name | newLocation.name.length < 1) {
      errResponse.added = false;
      errResponse.msg = 'No name given or name too short (<0).';
    }
    else if (!newLocation.description) {
      errResponse.added = false;
      errResponse.msg = 'No description given.'
    }
    else if (!newLocation.address | newLocation.address.length < 1) {
      errResponse.added = false;
      errResponse.msg = 'No address given or address too short (<0)';
    }
    else if (!newLocation.city | newLocation.city.length < 1) {
      errResponse.added = false;
      errResponse.msg = 'No city given or city name too short (<0)';
    }
    else if (!newLocation.website | newLocation.website.length < 1) {
      errResponse.added = false;
      errResponse.msg = 'No website given or website url too short (<0)';
    }
    else if (!newLocation.img | newLocation.img.length < 1) {
      errResponse.added = false;
      errResponse.msg = 'No img url supplied';
    }

    if(errResponse.added){
      Location.findOne({'name' : newLocation.name}, function(err, location){
        if(err) {
          errResponse.added = false;
          errResponse.msg = "error adding location.";
          return response.send(errResponse);
        }
        if(location) {
          errResponse.added = false;
          errResponse.msg = "location already exists";
          errResponse.location = location;
          return response.send(errResponse);
        }
        var location = new Location();
        location.name = newLocation.name;
        location.description = newLocation.description;
        location.address = newLocation.address;
        location.city = newLocation.city;
        location.website = newLocation.website;
        location.alias = newLocation.name.replace(/ /g,'').toLowerCase();
        location.save(function(err) {
          if(err) {
            errResponse.added = false;
            errResponse.msg = "error saving location";
          }
          console.log('added location: ', location);
          self.downloadImage(newLocation.img, location.alias);
          response.send(errResponse);
        });
      });
    } else {
      response.send(errResponse);
    }
  }, /* end addLocation */

  removeLocation : function(id, response) {
    var self = this;
    var errResponse = {
      removed : true,
      msg   : ''
    };

    if(id) {
      var img;
      Location.findOne({'_id' : id}, function(error, location){
        if(error) {
          return;
        } else {
          self.deleteImage(location.img);
        }
      });
      Location.remove({'_id' : id}, function(err){
        if(err){
          errResponse.remove = false;
          errResponse.msg = 'could not remove location.';
          return response.send(errResponse);
        }
        console.log('removed location', id);
        response.send(errResponse);
      });
    }
  },

  updateLocation : function(updatedLocation, response) {
    var self = this;
    console.log(updatedLocation);
    updatedLocation = updatedLocation.location;
    Location.findOne({'_id' : updatedLocation._id}, function(error, location) {
      if(error){
        return response.send(error);
      }
      location.name = updatedLocation.name ? updatedLocation.name : location.name;
      location.website = updatedLocation.website ? updatedLocation.website : location.website;
      location.address = updatedLocation.address ? updatedLocation.address : location.address;
      location.city = updatedLocation.city ? updatedLocation.city : location.city;
      location.description = updatedLocation.description ? updatedLocation.description : location.description;
      location.alias = location.name.replace(/ /g,'').toLowerCase();
      if(updatedLocation.img) {
        self.deleteImage(location.img);
        self.downloadImage(updatedLocation.img, location.alias);
      } else {
        self.renameImage(location.img, location.alias);
      }
      location.save(function(error){
        if(error){
          console.error(error);
        } else {
          console.log('location updated: ', location.name);
          response.send({
            updated : true
          });
        }
      })
    });
  },

  downloadImage : function(imgUrl, locationAlias) {
    var self = this;
    const downloadDir = path.join(__dirname, '../assets/images/locations/');
    var fileExt = /\.(jpg|png|gif)/.exec(path.extname(imgUrl))[0];
    if(fileExt == '.gif') {
      return console.error('download location img: dont use GIF images');;
    }
    fs.exists(downloadDir + locationAlias + fileExt, function(exists){
      if(!exists) {
        request(imgUrl).pipe(fs.createWriteStream(downloadDir + locationAlias + fileExt)).on('close', function(){
          self.saveImgName(locationAlias + fileExt, locationAlias);
          return;
        });
      } else {
        return;
      }
    });
  },

  saveImgName : function(imgName, locationAlias) {
    Location.find(function(error, locations){
      if(error) {
        return console.error(error);
      } else {
        locations.forEach(function(location){
          if(location.alias == locationAlias) {
            location.img = imgName;
            return location.save(function(error){
              if (error) {
                console.error(error);
              } else {
                console.log('saved location img: ', imgName);
              }
            });
          }
        });
      }
    });
  },

  deleteImage : function(imgName) {
    const dir = path.join(__dirname, '../assets/images/locations/');
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

  renameImage : function(imgName, locationAlias) {
    const dir = path.join(__dirname, '../assets/images/locations/');
    var fileExt = /\.(png|jpg)/.exec(imgName)[0];
    var self = this;
    fs.exists(dir + imgName, function(exists){
      if(exists){
        fs.rename(dir + imgName, dir + locationAlias + fileExt, function(error){
          if(error) {
            console.error(error);
          } else {
            self.saveImgName(locationAlias + fileExt, locationAlias);
          }
        });
      } else {
        console.error('can´t rename img, doesn´t exist: ', dir + imgName);
      }
    });
  }
}
