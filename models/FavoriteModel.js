var dbBase = require('dbBase');

function FavoriteModel() {}

FavoriteModel.prototype.query = function(type, id, callback) {
  var db = new dbBase();
  db._query('SELECT * from "spGetFavorite"($1, $2);', [type, id]).then(function(result){
    callback( true, result.rows );
  }).catch(function(err){
    callback( false, err );
  });
};

FavoriteModel.prototype.add = function(type, id, favorite_type, favorite_id, callback) {
  var db = new dbBase();
  db._query('SELECT * from "spAddFavorite"($1, $2, $3, $4);', [type, id, favorite_type, favorite_id]).
      then(function(result){
    if(result.rows[0]["spAddFavorite"] !== 0)
      callback( false, result.rows[0]["spAddFavorite"] )
    else
      callback( true, result.rows[0]["spAddFavorite"] );
  }).catch(function(err){
    callback( false, err );
  });
};

FavoriteModel.prototype.delete = function(type, id, favorite_type, favorite_id, callback) {
  var db = new dbBase();
  db._query('SELECT * from "spDeleteFavorite"($1, $2, $3, $4);', [type, id, favorite_type, favorite_id]).then(function(result){
    if(result.rows[0]["spDeleteFavorite"] === -1)
      callback( false, result.rows[0]["spDeleteFavorite"] )
    else
      callback( true, result.rows[0]["spDeleteFavorite"] );
  }).catch(function(err){
    callback( false, err );
  });
};

module.exports = FavoriteModel;