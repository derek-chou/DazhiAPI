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

.put(function(req, res) {
  //console.log(req.body);
  //console.log(Object.keys(req.body).length);

  var type, id, seq;
  type = req.body['type']; 
  id = req.body['id']; 
  seq = req.body['seq']; 

  var messageModel = new MessageModel();
  messageModel.updateRead(type, id, seq, 
    function(ret, data){
    if( ret )
      res.json({
        result: 'success',
      });
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

  var from_type, from_id, to_type, to_id, msg;
  from_type = req.body['from_type']; 
  from_id = req.body['from_id']; 
  to_type = req.body['to_type']; 
  to_id = req.body['to_id']; 
  msg = req.body['msg']; 

  var messageModel = new MessageModel();
  messageModel.add(from_type, from_id, to_type, to_id, msg, 
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