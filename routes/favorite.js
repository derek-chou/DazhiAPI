var express = require('express');
var FavoriteModel = require('FavoriteModel');
var router = express.Router();

router.route('/')

.get(function(req, res) {
  var favoriteModel = new FavoriteModel();
  favoriteModel.query(req.query.type, req.query.id, function(ret, data){
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
  var type, id, favorite_type, favorite_id;
  type = req.body['type']; 
  id = req.body['id']; 
  favorite_type = req.body['favorite_type']; 
  favorite_id = req.body['favorite_id']; 

  var favoriteModel = new FavoriteModel();
  favoriteModel.add(type, id, favorite_type, favorite_id,
    function(ret, data){
    if( ret )
      res.json({
        result: 'success',
        return: data.rows[0]
      });
    else
      res.json({
        result: 'fail',
        return: data
      });
  });
})

.put(function(req, res) {
  var from_type, from_id, to_type, to_id, msg;
  type = req.body['type']; 
  id = req.body['id']; 
  favorite_type = req.body['favorite_type']; 
  favorite_id = req.body['favorite_id']; 

  var favoriteModel = new FavoriteModel();
  favoriteModel.delete(type, id, favorite_type, favorite_id,
    function(ret, data){
    if( ret )
      res.json({
        result: 'success',
        return: data.rows[0]
      });
    else
      res.json({
        result: 'fail',
        return: data
      });
  });
})

module.exports = router;