const Location = require('../models/location');
const path = require('path');
const fs = require('fs');
const request = require('request');
const ImageController = require('./image_controller');

module.exports = {
  /*
      ====================
      CREATE =============
      ====================
  */
  create : function(data, response) {
    var self = this;

    Location.findOne({'name' : data.name}, function(err, location){
      if(err) {
        return response.send({
          error : err
        });
      }
      if(location) {
        return response.send({
          error : 'location already exists',
          location : location
        });
      }
      var location = new Location();
      location.name = data.name;
      location.description = data.description;
      location.address = data.address;
      location.city = data.city;
      location.website = data.website;
      location.alias = location.name.replace(/ /g,'').toLowerCase();
      location.save(function(err) {
        if(err) {
          return response.send({
            error : err
          });
        }
        ImageController.download(data.img, 'locations/', location._id, self.saveImgName)
        response.send({
          added : true,
          location : location
        });
      });
    });
  }, /* end addLocation */
  /*
      ====================
      UPDATE =============
      ====================
  */
  update : function(data, response) {
    var self = this;

    Location.findOne({'_id' : data._id}, function(error, location) {
      if(error){
        return response.send(error);
      }
      location.name = data.name
      location.website = data.website
      location.address = data.address
      location.city = data.city
      location.description = data.description
      location.alias = location.name.replace(/ /g,'').toLowerCase();

      if(data.img) {
        ImageController.delete('locations/' + location.img_orig);
        ImageController.download(data.img, '/locations', location._id, self.saveImgName);
      }
      location.save(function(error){
        if(error){
          console.error(error);
        } else {
          response.send({
            updated : true,
            location : location
          });
        }
      })
    });
  },

  /*
      ====================
      DELETE =============
      ====================
  */
  delete : function(id, response) {
    var self = this;

    if(id) {
      Location.findOne({'_id' : id}, function(error, location){
        if(error) {
          return;
        } else {
          ImageController.delete('locations/' + location.img_orig);
        }
      });
      Location.remove({'_id' : id}, function(err){
        if(err){
          return response.send({
            error : err
          });
        }
        response.send({
          deleted : true
        });
      });
    }
  },
  /*
      ====================
      GET =============
      ====================
  */
  get : function(alias, response) {
    var self = this;

    if(!alias | alias.length < 1) {
      response.send({
        error : 'no alias'
      });
    } else {
      Location.findOne({'alias' : alias}, function(err, location){
        if(err) {
          return response.send({
            error : 'not found'
          });
        }
        if(location) {
          return response.render(
            'locations/locationPage',
            {
              title : location.name,
              location : location
            }
          );
        }
      });
    }
  },

  /*
      ====================
      GET ALL ============
      ====================
  */
  getAll : function(response) {
    Location.find(function(err, locations){
      if(err) {
        response.send({
          msg : 'no locations',
        });
      }
      response.send(locations);
    });
  },

  /*
      =========================
      HELPER: store img name ==
      =========================
  */
  saveImgName : function(img_orig, img_small, id) {
    Location.findOne({'_id' : id}, function(err, location){
      if(err) {
        return console.error(err);
      } else {
        location.img_orig = img_orig;
        location.img_small = img_small;
        location.save(function(err){
          if(err) {
            return console.error(err);
          } else {
            console.log('saved image name', location);
          }
        })
      }
    })
  },

}
