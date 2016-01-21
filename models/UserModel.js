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

UserModel.prototype.add = function(type, id, name, link, gender, email, birthday, locale, phone, callback) {
  var db = new dbBase();
  db._query('select "spAddUser" ($1, $2, $3, $4, $5, $6, $7, $8, $9)', 
       [type ,id, name, link, gender, email, birthday, locale, phone]).then(function(result){
    callback( true, result.rows );
  }).catch(function(err){
    callback( false, err );
  });
};

UserModel.prototype.update = function(type, id, name, gender, birthday, city, lang, job, desc, callback) {
  var db = new dbBase();
  console.log('db = ' + db);
  db._query('select * from "spUptUserAndProp" ($1, $2, $3, $4, $5, $6, $7, $8, $9)', 
       [type, id, name, gender, birthday, city, lang, job, desc]).then(function(result){
    callback( true, result.rows );
  }).catch(function(err){
    callback( false, err );
  });
};

module.exports = UserModel;