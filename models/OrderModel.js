var dbBase = require('dbBase');

function OrderModel() {}

OrderModel.prototype.query = function(type, id, seq, callback) {
  var db = new dbBase();
  db._query('select * from "spGetOrder"($1, $2, $3)', [type, id, seq]).then(function(result){
    callback( true, result.rows );
  }).catch(function(err){
    callback( false, err );
  });
};

OrderModel.prototype.add = function(type, id, productID, callback) {
  var db = new dbBase();
  db._query('select * from "spAddOrder"($1, $2, $3)', 
       [type ,id, productID]).then(function(result){
    var ret = result.rows[0]["spAddOrder"];
    callback( true, ret );
  }).catch(function(err){
    callback( false, err );
  });
};

OrderModel.prototype.sellerConfirm = function(type, id, orderID, callback) {
  var db = new dbBase();
  db._query('select * from "spSellerConfirmOrder"($1, $2, $3)', 
       [type ,id, orderID]).then(function(result){
    var ret = result.rows[0]["spSellerConfirmOrder"];
    callback( true, ret);
  }).catch(function(err){
    callback( false, err );
  });
};

OrderModel.prototype.buyerConfirm = function(type, id, orderID, callback) {
  var db = new dbBase();
  db._query('select * from "spBuyerConfirmOrder"($1, $2, $3)', 
       [type ,id, orderID]).then(function(result){
    var ret = result.rows[0]["spBuyerConfirmOrder"];
    callback( true, ret);
  }).catch(function(err){
    callback( false, err );
  });
};

module.exports = OrderModel;