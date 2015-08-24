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

module.exports = SysParameterModel;