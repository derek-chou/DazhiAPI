var express = require('express');
var router = express.Router();
var fs = require('fs');
var Q = require('q');
var dbBase = require('dbBase');
var config = require('config');
var mkdirp = require('mkdirp');
var UserModel = require('UserModel');

router.get('/orderManage', function(req, res, next) {
  var userType = req.query.type;
  var userID = req.query.id;

  if(userType === undefined || userID === undefined)
  	res.json({
        result: 'fail',
        message: 'incorrect parameters'
    });
  else
  	res.render('orderManage', { userType:userType, userID:userID });
});

router.post('/orderManage', function(req, res, next) {
  var userType = req.body['type'];
  var userID = req.body['id'];

  if(userType === undefined || userID === undefined)
  	res.json({
        result: 'fail',
        message: 'incorrect parameters'
    });
  else
  	res.render('orderManage', { userType:userType, userID:userID });
});

module.exports = router;
