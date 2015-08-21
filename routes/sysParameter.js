var express = require('express');
var SysParameterModel = require('SysParameterModel');
var router = express.Router();

router.route('/')
.get(function(req, res) {
  var sysParameterModel = new SysParameterModel();
  sysParameterModel.query(function(ret, data){
    if(ret)
      res.json(data);
    else
      res.json({
        result: 'fail',
        message: data
      });
  });
})

module.exports = router;