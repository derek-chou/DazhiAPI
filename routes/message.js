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

  var toType, toID, fromType, fromID, seq;
  toType = req.body['to_type']; 
  toID = req.body['to_id']; 
  fromType = req.body['from_type']; 
  fromID = req.body['from_id']; 
  seq = req.body['seq']; 

  var messageModel = new MessageModel();
  messageModel.updateRead(toType, toID, fromType, fromID, seq, 
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
    var desc = '';
    var result = 'fail';
    switch(data){
      case -1: 
        desc = '資料庫錯誤';
        break;
      case 0: 
      default:
        result = 'success';
        break;
    }

    if( ret )
      res.json({
        result: result,
        return_code: data,
        return_desc: desc
      });
    else
      res.json({
        result: 'fail',
        message: data
      });
  });
})

router.route('/byDate')
.get(function(req, res) {
  var messageModel = new MessageModel();
  messageModel.queryByDate(req.query.type, req.query.id, req.query.date, function(ret, data){
    if(ret)
      res.json(data);
    else
      res.json({
        result: 'fail',
        message: data
      });
  });
})

router.route('/byUser')
.get(function(req, res) {
  var messageModel = new MessageModel();
  messageModel.queryByUser(req.query.type, req.query.id, 
    req.query.other_type, req.query.other_id, req.query.seq,function(ret, data){
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