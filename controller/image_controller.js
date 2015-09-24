const easyimg = require('easyimage');
const path = require('path');
const fs = require('fs');
const request = require('request');

const basePath = path.join(__dirname, '../assets/images/');

module.exports = {

  download : function(url, dir, filename, callback){
    filename = String(filename);
    var self = this;
    var fileext = path.extname(url);
    if(/\.(jpg|png|gif)/.exec(fileext)) {
      fileext = /\.(jpg|png|gif)/.exec(fileext)[0];
      var fullPath = path.join(basePath, dir, filename + fileext);
      request(url)
              .pipe(fs.createWriteStream(fullPath))
              .on('close', function(){
                self.resizeWidth(fullPath, 450);
                callback(filename + fileext, 'small_' + filename + fileext, filename);
              });
    } else {
      return console.error('image format could not be identified as jpg, png oder gif.');
    }
  },

  rename : function (fullPath, filename) {

  },

  resizeWidth : function (fullPath, width) {
    var dir = path.dirname(fullPath);
    var file = path.basename(fullPath);
    easyimg.resize({
      src : fullPath,
      dst : dir + '/small_' + file,
      width : width
    }).then(
      function(file) {
        console.log('done resizing', file);
      },
      function(err) {
        console.error('error resizing', err);
      }
    );
  },

  resizeHeight : function (fullPath, height) {

  },

  convertToPNG : function (fullPath) {

  },

  convertToJPG : function (fullPath) {

  },

  delete : function (fullPath) {
    fullPath = path.join(basePath, fullPath);

    var dir = path.dirname(fullPath);
    var file = path.basename(fullPath);

    fs.exists(fullPath, function(exists){
      if(exists){
        fs.unlink(fullPath, function(){
          console.log('deleted image: ', fullPath);
        });
      } else {
        console.error('image does not exist: ', fullPath);
      }
    });

    fs.exists(dir + '/small_' + file, function(exists){
      if(exists){
        fs.unlink(dir + '/small_' + file, function(){
          console.log('deleted image: ', dir + '/small_' + file);
        });
      } else {
        console.error('image does not exist: ', dir + '/small_' + file);
      }
    });
  }
}
