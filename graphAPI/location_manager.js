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
        location.img = newLocation.img;
        location.alias = newLocation.name.replace(/ /g,'').toLowerCase();
        location.save(function(err) {
          if(err) {
            errResponse.added = false;
            errResponse.msg = "error saving location";
          }
          console.log('added location: ', location);
          self.downloadImage(location.img, location.alias);
          response.send(errResponse);
        });
      });
    } else {
      response.send(errResponse);
    }
  }, /* end addLocation */

  removeLocation : function(id, response) {
    var errResponse = {
      removed : true,
      msg   : ''
    };

    if(id) {
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

  downloadImage : function(imgUrl, locationAlias) {
    var self = this;
    const downloadDir = path.join(__dirname, '../assets/images/locations/');
    fileExt = /\.(jpg|png|gif)/.exec(path.extname(imgUrl))[0];
    if(fileExt == '.gif')
      return;
    fs.exists(downloadDir + locationAlias + fileExt, function(exists){
      if(!exists) {
        request(imgUrl).pipe(fs.createWriteStream(downloadDir + locationAlias + fileExt)).on('close', function(){
          console.log('downloaded location image');
          return;
        });
      } else {
        console.log('image already exists');
        return;
      }
    });
  }
}
