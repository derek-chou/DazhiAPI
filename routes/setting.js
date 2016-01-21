var express = require('express');
var router = express.Router();
var fs = require('fs');
var Q = require('q');
var dbBase = require('dbBase');
var config = require('config');
var mkdirp = require('mkdirp');
var UserModel = require('UserModel');

router.post('/changPersonalInfo', function(req, res) {
  console.log(req.body);
  //console.log(req.files);

  //req.files為key-value，以下列方式將其轉換為array
  var files = [];
  var fileKeys = Object.keys(req.files);

  fileKeys.forEach(function(key) {
    files.push(req.files[key]);
  });
  console.log(files);

  var db = new dbBase();

  var type = req.body.userType;
  var id = req.body.userID;
  var idx = req.body.idx;

  var userName = req.body.userName;
  var gender = req.body.gender;
  var birthday = req.body.birthday;
  var birthdayAry = birthday.split("-");
  var birthdayDate = new Date(birthdayAry[0], birthdayAry[1]-1, birthdayAry[2]);
  console.log(birthdayDate);
  var birthdayStr = ('0' + (birthdayDate.getMonth()+1)).slice(-2) + '/' +
                    ('0' + birthdayDate.getDate()).slice(-2) + '/' +
                    birthdayDate.getFullYear();  
  console.log(userName + ',' + gender + ',' + birthdayStr);
  var city = req.body.citySelect;
  var job = req.body.jobSelect;
  var lang = req.body.langSelect;
  lang = lang.toString();
  console.log(city + '@' + job + '@' +lang);
  var phone = req.body.userCellPhone;
  var email = req.body.userEmail;
  console.log(phone + ',' + email);

  var userDesc = (req.body.userDesc === undefined) ? "" : req.body.userDesc;

  var folder = '', fileName = '', sqlstr = '';
  console.log(type);
  console.log(id);
  console.log(idx);
  console.log("desc="+userDesc);  

  // if(req.files.length < 0)
  //   return;
  folder = "public/images/userPhoto/" + id;
  if(files.length > 0) {
    fileName = config.urlPrefix + 'userPhoto/' + id + '_' + files[0].name;
    sqlstr = 'select * from "spAddUserPhoto"($1, $2, $3, $4)';

    console.log('folder : ' + folder);
    console.log('fileName : ' + fileName);
  }

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

  console.log('setp 2');
  var allPromise;
  if(files.length > 0) {
    allPromise = Q.all([ fsSaveImage(files[0], folder), 
                          db._query(sqlstr, [type, id, idx, fileName]),
                          db._query('select * from "spUptUserAndProp" ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
                              [type, id, userName, gender, birthdayStr, city, lang, job, userDesc])
                        ]);
  } else {
    allPromise = Q.all([ db._query('select * from "spUptUserAndProp" ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
                              [type, id, userName, gender, birthdayStr, city, lang, job, userDesc])
                        ]);
  }

  console.log('setp 3');

  allPromise.then(function(){
      res.json({ 'result': 'success', 'image_url': fileName})
    }, function(){
      res.json({ 'result': 'fail' })
    });
});

function fsSaveImage(file, folder, callback) {
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
  return deferred.promise.nodeify(callback); // the promise is returned
}

function userUpdate(type, id, userName, gender, birthdayStr, city, lang, job, userDesc, callback) {
  var deferred = Q.defer();
  var userModel = new UserModel();
  userModel.update(type, id, userName, gender, birthdayStr, city, lang, job, userDesc,
      function(ret, data){
      if(ret)
        deferred.resolve(data);
      else
        deferred.reject(data);
    })         
  return deferred.promise.nodeify(callback);               
}

router.get('/personalInfo', function(req, res, next) {
  var userType = req.query.type;
  var userID = req.query.id;

  if(userType === undefined || userID === undefined)
  	res.json({
        result: 'fail',
        message: 'incorrect parameters'
    });
  else
  	res.render('personalInfo', { userType:userType, userID:userID });
});

router.post('/personalInfo', function(req, res, next) {
  var userType = req.body['type'];
  var userID = req.body['id'];

  if(userType === undefined || userID === undefined)
  	res.json({
        result: 'fail',
        message: 'incorrect parameters'
    });
  else
  	res.render('personalInfo', { userType:userType, userID:userID });
});

function getLangPath(lang) {
  if (lang === "zh_TW")
  	return "tw";
  else if (lang === "zh_CN")
  	return "cn";
  else
  	return "en";
}

router.get('/about', function(req, res, next) {
  var lang = getLangPath(req.query.lang);

  res.render(lang+'/about');
});

router.get('/rules', function(req, res, next) {
  var lang = getLangPath(req.query.lang);

  res.render(lang+'/rules');
});

router.get('/privacy', function(req, res, next) {
  var lang = getLangPath(req.query.lang);

  res.render(lang+'/privacy');
});

router.get('/faq', function(req, res, next) {
  var lang = getLangPath(req.query.lang);

  res.render(lang+'/faq');
});

module.exports = router;
