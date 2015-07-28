var express = require('express');
var TopicModel = require('TopicModel');
var router = express.Router();

router.route('/')

.get(function(req, res) {
  var topicModel = new TopicModel();
  topicModel.query(req.query.seq, function(ret, data){
    if(ret)
      res.json(data);
    else
      res.json({
        result: 'fail',
        message: data
      });
  });
})

module.exports = router;