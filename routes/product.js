var express = require('express');
var ProductModel = require('ProductModel');
var router = express.Router();

router.route('/')

.get(function(req, res) {
  var productModel = new ProductModel();
  productModel.query(req.query.seq, function(ret, data){
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
  var title = req.body['title'];
  var content = req.body['content'];
  var price = req.body['price'];
  var currency = req.body['currency'];

  var productModel = new ProductModel();
  productModel.add(type, id, title, content, price, currency, 
    function(ret, data){
    if( ret )
      res.json({
        result: 'success',
        seq : data[0].spAddProduct
      });
    else
      res.json({
        result: 'fail',
        message: data
      });
  });
})

router.route('/byID')
.get(function(req, res) {
  var productModel = new ProductModel();
  productModel.queryByID(req.query.type, req.query.id, req.query.seq, function(ret, data){
    if(ret)
      res.json(data);
    else
      res.json({
        result: 'fail',
        message: data
      });
  });
})

router.route('/byProductID')
.get(function(req, res) {
  var productModel = new ProductModel();
  productModel.queryByProductID(req.query.productID, function(ret, data){
    if(ret)
      res.json(data);
    else
      res.json({
        result: 'fail',
        message: data
      });
  });
})

router.route('/byTopicID')
.get(function(req, res) {
  var productModel = new ProductModel();
  productModel.queryByTopicID(req.query.topicID, function(ret, data){
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