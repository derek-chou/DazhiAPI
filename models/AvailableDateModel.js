var dbBase = require('dbBase');

function AvailableDateModel() {}

AvailableDateModel.prototype.query = function(type, id, date, callback) {
  var db = new dbBase();
  db._query('select * from "spGetAvailableDate"($1, $2, $3)', [type, id, date]).then(function(result){
    callback( true, result.rows );
  }).catch(function(err){
    callback( false, err );
  });
};

AvailableDateModel.prototype.add = function(type, id, month, availableDate, callback) {
  var db = new dbBase();
  db._query('select "spAddAvailableDate"($1, $2, $3, $4)', 
       [type ,id, month, availableDate]).then(function(result){
    callback( true, result.rows );
  }).catch(function(err){
    callback( false, err );
  });
};

module.exports = AvailableDateModel;