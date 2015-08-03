var dbBase = require('dbBase');

function MessageModel() {}

MessageModel.prototype.query = function(type, id, seq, callback) {
  var db = new dbBase();
  db._query('SELECT * from "spGetMessage"($1, $2, $3);', [type, id, seq]).then(function(result){
    callback( true, result.rows );
  }).catch(function(err){
    callback( false, err );
  });
};

module.exports = MessageModel;