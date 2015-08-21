var dbBase = require('dbBase');

function SysParameterModel() {}

SysParameterModel.prototype.query = function(callback) {
  var db = new dbBase();
  db._query('select * from "spGetSysParameter"()').then(function(result){
    callback( true, result.rows );
  }).catch(function(err){
    callback( false, err );
  });
};

module.exports = SysParameterModel;