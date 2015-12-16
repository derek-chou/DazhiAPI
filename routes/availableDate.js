var express = require('express');
var AvailableDateModel = require('AvailableDateModel');
var router = express.Router();

router.route('/')

.get(function(req, res) {
  var availableDateModel = new AvailableDateModel();
  availableDateModel.query(req.query.type, req.query.id, req.query.month, function(ret, data){
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
  var id = req.body['id'];
  var month = req.body['month'];
  var availableDate = req.body['availableDate'];

  var availableDateModel = new AvailableDateModel();
  availableDateModel.add(type, id, month, availableDate, 
    function(ret, data){
    if( ret )
      res.json({
        result: 'success',
        prod_id : data[0].spAddProduct
      });
    else
      res.json({
        result: 'fail',
        message: data
      });
  });
})

module.exports = router;