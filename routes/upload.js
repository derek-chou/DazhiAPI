var express = require('express');
var router = express.Router();

var form = "<!DOCTYPE HTML><html><body>" +
"<form method='post' action='/upload' enctype='multipart/form-data'>" +
"<input type='file' name='imageName'/>" +
"<input type='submit' /></form>" +
"</body></html>";

router.get('/uploadFile', function (req, res){
  res.writeHead(200, {'Content-Type': 'text/html' });
  res.end(form);
});

/// Include the node file module
var fs = require('fs');

/// Include ImageMagick
var im = require('imagemagick');

/// Post files
router.post('/upload', function(req, res) {
  console.log(req.files.imageName.name);
  console.log(req.files.imageName);

  fs.readFile(req.files.imageName.path, function (err, data) {
    var imageName = req.files.imageName.name

    /// If there's an error
    if(!imageName){
      console.log("There was an error")
      res.redirect("/");
      res.end();
    } else {
      var newPath = "public/images/uploads/fullsize/" + imageName;
      var thumbPath = "public/images/uploads/thumbs/" + imageName;
      /// write file to uploads/fullsize folder
      console.log(newPath);
      fs.writeFile(newPath, data, function (err) {
        /// write file to uploads/thumbs folder
        im.resize({
          srcPath: newPath,
          dstPath: thumbPath,
          width:   200
        }, function(err, stdout, stderr){
          if (err) throw err;
          console.log('resized image to fit within 200x200px');
        });
        res.json({ message: 'ok' });
        //res.redirect("/uploads/fullsize/" + imageName);
      });
    }
  });
});

/// Show files
router.get('/uploads/fullsize/:file', function (req, res){
	file = req.params.file;

  var content;
  fs.readFile("public/images/uploads/fullsize/" + file, function read(err, data) {
    if (err) { throw err; }
    content = data;

    console.log(content);
    processFile();
  });

  function processFile() {
    res.writeHead(200, {'Content-Type': 'image/jpg' });
    res.end(content, 'binary');
  }
});

router.get('/uploads/thumbs/:file', function (req, res){
	file = req.params.file;

  var content;
  fs.readFile("public/images/uploads/thumbs/" + file, function read(err, data) {
    if (err) { throw err; }
    content = data;

    console.log(content);
    processFile();
  });

  function processFile() {
    res.writeHead(200, {'Content-Type': 'image/jpg' });
    res.end(content, 'binary');
  }
});

module.exports = router;