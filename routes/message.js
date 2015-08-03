var express = require('express');
var MessageModel = require('MessageModel');
var router = express.Router();

router.route('/')

.get(function(req, res) {
  var messageModel = new MessageModel();
  messageModel.query(req.query.type, req.query.id, req.query.seq, function(ret, data){
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