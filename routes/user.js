var express = require('express');
var UserModel = require('UserModel');
var router = express.Router();

router.get('/', function(req, res, next) {
  console.log(req.query.id);
  if( req.query.id )
    next();
  else
    res.render('user', { title: 'user' });
});

router.route('/')

.get(function(req, res) {
  var userModel = new UserModel();
  userModel.query(req.query.type, req.query.id, function(ret, data){
    if(ret)
      res.json(data);
    else
      res.json({
        result: 'fail',
        message: data
      });
  });
})

.post(function(req, res) {
  //console.log(req.body);
  //console.log(Object.keys(req.body).length);

  var type, id, name, link, gender, email, birthday, locale;
  if(req.body['link']) {
    type = 'FB'; id = req.body['id']; name = req.body['name']; link = req.body['link'];
    gender = req.body['gender']; email = req.body['email']; birthday = req.body['birthday'];
    locale = req.body['locale'];
  } else {
    type = 'WB'; id = req.body['idstr']; name = req.body['name']; link = req.body['profile_url'];
    gender = req.body['gender']; email = ''; birthday = '';
    locale = req.body['location'];

    gender = (gender === 'm') ? 'male' : 'female';
  }

  var userModel = new UserModel();
  userModel.add(type, id, name, link, gender, email, birthday, locale, 
    function(ret, data){
    if( ret )
      res.json({
        result: 'success',
        type: type,
        id: id     
      });
    else
      res.json({
        result: 'fail',
        message: data
      });
  });
})

.put(function(req, res) {
  var type = req.body['type'];
  var id = req.body['id'];
  var name = req.body['name'];
  var gender = req.body['gender'];
  var birthday = req.body['birthday'];
  var city = req.body['city'];
  var lang = req.body['lang'];
  var job = req.body['job'];
  var desc = req.body['desc'];

  var userModel = new UserModel();
  userModel.update(type, id, name, gender, birthday, city, lang, job, desc,
    function(ret, data){
    if( ret )
      res.json({
        result: 'success',
        type: type,
        id: id     
      });
    else
      res.json({
        result: 'fail',
        message: data
      });
  });
})

module.exports = router;