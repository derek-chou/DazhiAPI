var express = require('express');
var SysParameterModel = require('SysParameterModel');
var router = express.Router();

router.route('/')
.get(function(req, res) {
  var sysParameterModel = new SysParameterModel();
  console.log(req.query.lang);
  sysParameterModel.query(req.query.lang, function(ret, data){
    if(ret)
      res.json(data);
    else
      res.json({
        result: 'fail',
        message: data
      });
  });
})

.post(function(req, res) {
  var type = req.body['type'];
  var key = req.body['key'];
  var value = req.body['value'];
  var valueCH = req.body['value_ch'];
  var sorting = req.body['sorting'];
  console.log(type);

  var sysParameterModel = new SysParameterModel();
  sysParameterModel.add(type, key, value, valueCH, sorting, function(ret, data){
    if(ret)
      res.json({
        return: data.rows[0].spAddSysParameter
      });
    else
      res.json({
        result: 'fail',
        message: data
      });
  });
})

.put(function(req, res) {
  var type = req.body['type'];
  var key = req.body['key'];

  var sysParameterModel = new SysParameterModel();
  sysParameterModel.delete(type, key, function(ret, data){
    if(ret)
      res.json({
        return: data.rows[0].spDeleteSysParameter
      });
    else
      res.json({
        result: 'fail',
        message: data
      });
  });
})

module.exports = router;