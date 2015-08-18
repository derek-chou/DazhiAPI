var express = require('express');
var OrderModel = require('OrderModel');
var router = express.Router();

router.route('/')

.get(function(req, res) {
  var orderModel = new OrderModel();
  orderModel.query(req.query.type, req.query.id, req.query.seq, function(ret, data){
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
  var productID = req.body['productID']

  var orderModel = new OrderModel();
  orderModel.add(type, id, productID, 
    function(ret, data){

    var desc = '';
    var result = 'fail';
    switch(data){
      case -1: 
        desc = 'DB exception.';
        break;
      case -2: 
        desc = 'Product does not exist.'; 
        break;
      case 0: 
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

router.route('/sellerConfirm')

.put(function(req, res) {
  var type = req.body['type'];
  var id = req.body['id'];
  var orderID = req.body['orderID']

  var orderModel = new OrderModel();
  orderModel.sellerConfirm(type, id, orderID, function(ret, data){
    var desc = '';
    var result = 'fail';
    switch(data){
      case -1: 
        //desc = 'DB exception.';
        desc = '資料庫錯誤';
        break;
      case -2: 
        //desc = 'Order does not exist.'; 
        desc = '訂單不存在'; 
        break;
      case -3: 
        //desc = 'Seller do not match.'; 
        desc = '此訂單不屬於此賣家帳號'; 
        break;
      case -4: 
        //desc = 'Seller has a confirmed.'; 
        desc = '賣家已確認過'; 
        break;
      case 0: 
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

router.route('/buyerConfirm')

.put(function(req, res) {
  var type = req.body['type'];
  var id = req.body['id'];
  var orderID = req.body['orderID']

  var orderModel = new OrderModel();
  orderModel.buyerConfirm(type, id, orderID, function(ret, data){
    var desc = '';
    var result = 'fail';
    switch(data){
      case -1: 
        //desc = 'DB exception.';
        desc = '資料庫錯誤';
        break;
      case -2: 
        //desc = 'Order does not exist.'; 
        desc = '訂單不存在'; 
        break;
      case -3: 
        //desc = 'Buyer do not match.'; 
        desc = '此訂單不屬於此買家帳號'; 
        break;
      case -4: 
        //desc = 'Buyer has a confirmed.'; 
        desc = '買家已確認過'; 
        break;
      case -5: 
        //desc = 'Seller not yet confirmed.'; 
        desc = '賣家尚未確認'; 
        break;
      case 0: 
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

module.exports = router;