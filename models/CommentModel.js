var dbBase = require('dbBase');

function CommentModel() {}

CommentModel.prototype.query = function(type, id, seq, callback) {
  var db = new dbBase();
  db._query('select * from "spGetComment"($1, $2, $3)', [type, id, seq]).then(function(result){
    callback( true, result.rows );
  }).catch(function(err){
    callback( false, err );
  });
};

CommentModel.prototype.queryByFrom = function(fromType, fromID, seq, callback) {
  var db = new dbBase();
  db._query('select * from "spGetCommentSend"($1, $2, $3)', [fromType, fromID, seq]).then(function(result){
    callback( true, result.rows );
  }).catch(function(err){
    callback( false, err );
  });
};

CommentModel.prototype.add = function(type, id, from_type, from_id, score, comment, order_id, callback) {
  var db = new dbBase();
  db._query('select "spAddComment"($1, $2, $3, $4, $5, $6, $7)', 
       [type ,id, from_type, from_id, score, comment, order_id]).then(function(result){
    callback( true, result.rows );
  }).catch(function(err){
    callback( false, err );
  });
};

module.exports = CommentModel;