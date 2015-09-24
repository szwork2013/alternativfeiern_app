const Festival = require('../models/festival');
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

    Festival.findOne({'name' : data.name}, function(err, festival){
      if(err) {
        errResponse.added = false;
        errResponse.msg = "error adding festival.";
        return response.send(errResponse);
      }
      if(festival) {
        return response.send({
          error : 'festival already exists',
          festival : festival
        });
      }
      var festival = new Festival();
      festival.name = data.name;
      festival.description = data.description;
      festival.city = data.city;
      festival.website = data.website;
      festival.alias = festival.name.replace(/ /g,'').toLowerCase();
      festival.price = data.price;
      festival.save(function(err) {
        if(err) {
          return response.send({
            error : err,
          });
        }
        ImageController.download(data.img, 'festivals/', festival._id, self.saveImgName);
        response.send({
          added : true,
          festival : festival
        });
      });
    });
  },

  /*
      ====================
      UPDATE =============
      ====================
  */
  update : function(data, response) {
    var self = this;

    Festival.findOne({'_id' : data._id}, function(error, festival){
      if(error){
        return response.send(error);
      }
      festival.name = data.name
      festival.website = data.website
      festival.city = data.city
      festival.description = data.description
      festival.price = data.price
      festival.alias = festival.name.replace(/ /g, '').toLowerCase();

      if(data.img) {
        ImageController.delete('festivals/' + festival.img_orig);
        ImageController.download(data.img, '/festivals', festival._id, self.saveImgName);
      }
      festival.save(function(error){
        if(error){
          console.error(error);
        } else {
          response.send({
            updated : true,
            festival : festival
          });
        }
      });
    });
  },

  /*
      ====================
      DELETE =============
      ====================
  */
  delete : function(id, response) {
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
          ImageController.delete('festivals/' + festival.img_orig);
        }
      });
      Festival.remove({'_id' : id}, function(err){
        if(err){
          errResponse.remove = false;
          errResponse.msg = 'could not remove festival.';
          return response.send(errResponse);
        }
        response.send(errResponse);
      });
    }
  },

  /*
      ====================
      GET ================
      ====================
  */
  get : function(alias, response) {
    var self = this;

    if(!alias | alias.length < 1) {
      response.send({
        error : 'no alias'
      });
    } else {
      Festival.findOne({'alias' : alias}, function(err, festival){
        if(err) {
          return response.send({
            error : 'not found'
          });
        } else if(festival) {
          console.log(festival);
          return response.render('festivals/festivalPage', {title : festival.name, festival: festival});
        } else {
          return console.error('festival null for alias: ', alias);
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
    Festival.find(function(err, festivals){
      if(err) {
        response.send({
          msg : 'no festivals',
        });
      }
      response.send(festivals);
    });
  },

  /*
      =========================
      HELPER: store img name ==
      =========================
  */
  saveImgName : function(img_orig, img_small, id) {
    Festival.findOne({'_id' : id}, function(err, festival){
      if(err) {
        return console.error(error);
      } else {
        festival.img_orig = img_orig;
        festival.img_small = img_small;
        festival.save(function(err){
          if(err){
            return console.error(err);
          } else {
            console.log('saved image name', festival);
          }
        });
      }
    });
  },

}
