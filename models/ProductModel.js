var dbBase = require('dbBase');

function ProductModel() {}

ProductModel.prototype.query = function(seq, callback) {
  var db = new dbBase();
  db._query('select * from "spGetProduct"($1)', [seq]).then(function(result){
    callback( true, result.rows );
  }).catch(function(err){
    callback( false, err );
  });
};

ProductModel.prototype.queryByID = function(type, id, seq, callback) {
  var db = new dbBase();
  db._query('select * from "spGetProductByID"($1, $2, $3)', [type, id, seq]).then(function(result){
    callback( true, result.rows );
  }).catch(function(err){
    callback( false, err );
  });
};

ProductModel.prototype.queryByProductID = function(productID, callback) {
  var db = new dbBase();
  db._query('select * from "spGetProductByProductID"($1)', [productID]).then(function(result){
    callback( true, result.rows );
  }).catch(function(err){
    callback( false, err );
  });
};

ProductModel.prototype.queryByTopicID = function(topicID, callback) {
  var db = new dbBase();
  db._query('select * from "spGetProductByTopicID"($1)', [topicID]).then(function(result){
    callback( true, result.rows );
  }).catch(function(err){
    callback( false, err );
  });
};

ProductModel.prototype.add = function(type, id, title, content, price, currency, city, car, 
    drink, photo, smoke, memo, maxNumber, period, callback) {
  var db = new dbBase();
  db._query('select * from "spAddProduct"($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)', 
       [type ,id, title, content, price, currency, city, car, drink, photo, smoke, memo, maxNumber, period]).
  then(function(result){
    callback( true, result.rows );
  }).catch(function(err){
    callback( false, err );
  });
};

ProductModel.prototype.putDown = function(type, id, product_id, callback) {
  var db = new dbBase();
  db._query('select "spPutDownProduct"($1, $2, $3)', 
       [type, id, product_id]).then(function(result){
    callback( true, result.rows );
  }).catch(function(err){
    callback( false, err );
  });
};

module.exports = ProductModel;