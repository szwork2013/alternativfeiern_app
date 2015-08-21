const Location = require('../models/location');
const path = require('path');
const easyimg = require('easyimg');

module.exports = {
  //responds with an array of all locations
  getLocations : function(response) {

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
  addLocation : function(location, response) {
    var errResponse = {
      added : true,
      msg   : ''
    };

    if (!location.name | location.name.length < 1) {
      errResponse.added = false;
      errResponse.msg = 'No name given or name too short (<0).';
    }
    else if (!location.description) {
      errResponse.added = false;
      errResponse.msg = 'No description given.'
    }
    else if (!location.address | location.address.length < 1) {
      errResponse.added = false;
      errResponse.msg = 'No address given or address too short (<0)';
    }
    else if (!location.city | location.city.length < 1) {
      errResponse.added = false;
      errResponse.msg = 'No city given or city name too short (<0)':
    }
    else if (!location.website | location.website.length < 1) {
      errResponse.added = false;
      errResponse.msg = 'No website given or website url too short (<0)';
    }

    if(errResponse.added){

    } else {
      response.send(errResponse);
    }
  },
}
