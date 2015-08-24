const Location = require('../models/location');
const path = require('path');
const easyimg = require('easyimage');

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
  getLocation : function(locationId) {

  },

  /*
    adds a location to the db. expects following object:

    {
      name        : String, required
      description : String, required
      address     : String, required
      city        : String, required
      website     : String, required
    }

  */
  addLocation : function(newLocation, response) {
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
  }
}
