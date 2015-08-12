var express = require('express');
var CommentModel = require('CommentModel');
var router = express.Router();

router.route('/')

.get(function(req, res) {
  var commentModel = new CommentModel();
  commentModel.query(req.query.type, req.query.id, req.query.seq, function(ret, data){
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
  var type = req.body['type'];
  var id = req.body['id']; 
  var from_type = req.body['from_type'];
  var from_id = req.body['from_id'];
  var score = req.body['score'];
  var comment = req.body['comment'];

  var commentModel = new CommentModel();
  commentModel.add(type, id, from_type, from_id, score, comment,  
    function(ret, data){
    if( ret )
      res.json({
        result: 'success'
      });
    else
      res.json({
        result: 'fail',
        message: data
      });
  });
})

module.exports = router;