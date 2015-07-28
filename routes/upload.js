var express = require('express');
var router = express.Router();
var fs = require('fs');
var Q = require('q');
var dbBase = require('dbBase');
var config = require('config');
var mkdirp = require('mkdirp')

var form = "<!DOCTYPE HTML><html><body>" +
"<form method='post' action='/uploadImage' enctype='multipart/form-data'>" +
"<select name='ImageType'><option value='1'>Topic</option><option value='2'>Procuct</option></select>" +
"id : <input type='text' name='ID'/></br>" +
"<input type='file' name='imageName'/></br>" +
"<input type='submit' /></form>" +
"</body></html>";

router.get('/uploadFile', function (req, res){
  res.writeHead(200, {'Content-Type': 'text/html' });
  //console.log('addr: ' + config.urlPrefix);
  res.end(form);
});

/// Include ImageMagick
var im = require('imagemagick');

/// Post files
router.post('/uploadImage', function(req, res) {
  // console.log(req.files.imageName.name);
  // console.log(req.files.imageName);
  var imageType = req.body.ImageType;
  var db = new dbBase();

  var ID = req.body.ID;
  var folder = '', fileName = '', sqlstr = '';
  console.log('imageType : ' + imageType);
  if(imageType === '1') {
    folder = "public/images/topic/" + ID;
    fileName = config.urlPrefix + 'topicImage/' + ID + '_' + req.files.imageName.name;
    sqlstr = 'insert into "TopicImage"("topicID", "imageURL") values($1, $2)';
  } else {
    folder = "public/images/product/" + ID;
    fileName = config.urlPrefix + 'productImage/' + ID + '_' + req.files.imageName.name;
    sqlstr = 'insert into "ProductImage"("productID", "imageURL") values($1, $2)';
  }

  console.log('folder : ' + folder);
  console.log('fileName : ' + fileName);

  mkdirp(folder, function(err) {
    if(err){
      res.json({ 
        result: 'fail',
        message: 'create folder fail',
        err: err
      })
      return;
    }
  });

  var allPromise = Q.all([ fsSaveProductImage(req.files.imageName, folder), 
    db._query(sqlstr, [ID, fileName]) ])
      
  allPromise.then(function(){res.json({ 'result': 'success', 'image_url': fileName})}, 
    function(){res.json({ 'result': 'fail' })});
});

function fsSaveProductImage(file, folder, callback) {
  var deferred = Q.defer();
  if(!file.name)
    deferred.reject("incorrect file");

  fs.readFile(file.path, function (err, data) {
    if(err) deferred.reject(err);
    
    var newPath = folder + '/' + file.name;
    fs.writeFile(newPath, data, function (err){
      if (err) deferred.reject(err); // rejects the promise with `er` as the reason
      else deferred.resolve(data); // fulfills the promise with `data` as the value
    })
  })
  return deferred.promise.nodeify(callback) // the promise is returned
}

/// Show files
router.get('/productImage/:file', function (req, res){
  file = req.params.file;
  console.log(file);
  var split = file.split('_');

  var content;
  fs.readFile('public/images/product/' + split[0] + '/' + split[1], function read(err, data) {
    if (err) { res.json({ 'result': 'fail', 'err': err }); return; }
    content = data;

    console.log(content);
    processFile();
  });

  function processFile() {
    res.writeHead(200, {'Content-Type': 'image/jpg' });
    res.end(content, 'binary');
  }
});

router.get('/topicImage/:file', function (req, res){
  file = req.params.file;
  console.log(file);
  var split = file.split('_');

  var content;
  fs.readFile('public/images/topic/' + split[0] + '/' + split[1], function read(err, data) {
    if (err) { res.json({ 'result': 'fail', 'err': err }); return; }
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