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

ProductModel.prototype.add = function(type, id, title, content, price, currency, callback) {
  var db = new dbBase();
  db._query('select * from "spAddProduct"($1, $2, $3, $4, $5, $6)', 
       [type ,id, title, content, price, currency]).then(function(result){
    callback( true, result.rows );
  }).catch(function(err){
    callback( false, err );
  });
};

module.exports = ProductModel;