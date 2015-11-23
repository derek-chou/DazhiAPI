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
    drink, photo, smoke, memo, maxNumber, period, tourType, extra, deposit, cancel, agenda, callback) {

  if (!String.format) {
    String.format = function(format) {
      var args = Array.prototype.slice.call(arguments, 1);
      return format.replace(/{(\d+)}/g, function(match, number) { 
        return typeof args[number] != 'undefined'
          ? args[number] 
          : match
        ;
      });
    };
  }

  var db = new dbBase();
  console.log('agenda = ' + agenda);
  var sqlstr = ' begin;';
  sqlstr += String.format('select * from "spAddProduct"(\'{0}\', \'{1}\', \'{2}\', \'{3}\', {4}, \
    \'{5}\', \'{6}\', {7}, {8}, {9}, {10}, \'{11}\', {12}, {13}, \'{14}\', {15}, {16}, \'{17}\');', 
       type ,id, title, content, price, currency, city, car, drink, photo, smoke, memo, maxNumber, 
       period, tourType, extra, deposit, cancel);

  agenda.forEach(handleAgeda);
  function handleAgeda(value, index, ar) {
    // console.log('value='+value);
    // console.log('index='+index);
    // console.log('ar='+ar)

    sqlstr += String.format('insert into "ProductAgenda"("prodID", content, index, traffic, memo, \
      ticket, location, hours, lodge) values(currval(\'product_id_seq\'), \'{0}\', {1}, \'{2}\', \'{3}\', \
      \'{4}\', \'{5}\', {6}, \'{7}\');', 
      value.content, value.index, value.traffic, value.memo, value.ticket, value.location, value.hours, value.lodge);
  }
  sqlstr += 'end;';  
  console.log(sqlstr);
  
  // db._query('select * from "spAddProduct"($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, \
  //   $12, $13, $14, $15, $16, $17, $18)', 
  //      [type ,id, title, content, price, currency, city, car, drink, photo, smoke, memo, maxNumber, 
  //      period, tourType, extra, deposit, cancel]).
  db._query(sqlstr).
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