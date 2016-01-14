var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  var userType = req.query.type;
  var userID = req.query.id;

  if(userType === undefined || userID === undefined)
  	res.json({
        result: 'fail',
        message: 'incorrect parameters'
    });
  else
  	res.render('setting', { userType:userType, userID:userID });
});

router.post('/', function(req, res, next) {
  var userType = req.body['type'];
  var userID = req.body['id'];

  if(userType === undefined || userID === undefined)
  	res.json({
        result: 'fail',
        message: 'incorrect parameters'
    });
  else
  	res.render('setting', { userType:userType, userID:userID });
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
