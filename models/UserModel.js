var dbBase = require('dbBase');

function UserModel() {}

UserModel.prototype.query = function(type, id, callback) {
  var db = new dbBase();
  db._query('select * from "spGetUser"($1, $2)', [type, id]).then(function(result){
    callback( true, result.rows );
  }).catch(function(err){
    callback( false, err );
  });
};

UserModel.prototype.add = function(type, id, name, link, gender, email, birthday, locale, callback) {
  var db = new dbBase();
  db._query('insert into "User" (type, id, name, link, gender, email, birthday, locale) ' +
       'values($1, $2, $3, $4, $5, $6, $7, $8)', 
       [type ,id, name, link, gender, email, birthday, locale]).then(function(result){
    callback( true, result.rows );
  }).catch(function(err){
    callback( false, err );
  });
};

module.exports = UserModel;