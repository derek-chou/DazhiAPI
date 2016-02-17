var express = require('express');
var AvailableDateModel = require('AvailableDateModel');
var router = express.Router();

router.route('/')

.get(function(req, res) {
  var curdate = new Date(null);
  curdate.setTime(req.query.from);
  console.log(curdate);

  curdate.setTime(req.query.to);
  console.log(curdate);

  console.log(req.query.from);
  var date = new Date(req.query.from/1000);
  console.log(date);

  console.log(req.query.to);
  var end = new Date(req.query.to);
  console.log(end);

  var year = date.getFullYear();
  var month = (1 + date.getMonth()).toString();
  month = month.length > 1 ? month : '0' + month;
  var day = date.getDate().toString();
  day = day.length > 1 ? day : '0' + day;

  console.log(year+month);

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