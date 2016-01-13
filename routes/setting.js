var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('setting', { title: 'Express' });
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

module.exports = router;
