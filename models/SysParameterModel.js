var dbBase = require('dbBase');

function SysParameterModel() {}

SysParameterModel.prototype.query = function(lang, callback) {
  var db = new dbBase();
  db._query('select * from "spGetSysParameter"($1)', [lang]).then(function(result){
    callback( true, result.rows );
  }).catch(function(err){
    callback( false, err );
  });
};

SysParameterModel.prototype.add = function(type, key, value, valueCH, sorting, callback) {
  var db = new dbBase();
  db._query('select * from "spAddSysParameter"($1, $2, $3, $4, $5)', [type, key, value, valueCH, sorting]).then(function(result){
    callback( true, result );
  }).catch(function(err){
    callback( false, err );
  });
};

SysParameterModel.prototype.delete = function(type, key, callback) {
  var db = new dbBase();
  db._query('select * from "spDeleteSysParameter"($1, $2)', [type, key]).then(function(result){
    callback( true, result );
  }).catch(function(err){
    callback( false, err );
  });
};

module.exports = SysParameterModel;