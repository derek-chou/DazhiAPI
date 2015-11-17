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
  var city = req.body['city'];
  var car = req.body['car'];
  var drink = req.body['drink'];
  var photo = req.body['photo'];
  var smoke = req.body['smoke'];
  var memo = req.body['memo'];
  var maxNumber = req.body['maxNumber'];
  var period = req.body['period'];

  var productModel = new ProductModel();
  productModel.add(type, id, title, content, price, currency, city, car, drink, photo, smoke, memo, maxNumber, period,
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

.put(function(req, res) {
  var type, id, product_id;
  type = req.body['type']; 
  id = req.body['id']; 
  product_id = req.body['product_id']; 

  var productModel = new ProductModel();
  productModel.putDown(type, id, product_id,
    function(ret, data){
    if( ret )
      res.json({
        result: 'success',
        return: data
      });
    else
      res.json({
        result: 'fail',
        return: data
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