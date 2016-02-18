var express = require('express');
var AvailableDateModel = require('AvailableDateModel');
var router = express.Router();

router.route('/')

.get(function(req, res) {
  var curdate = new Date(null);
  curdate.setTime(req.query.from);
  console.log(curdate);

  var year = curdate.getFullYear();
  var month = (1 + curdate.getMonth()).toString();
  month = month.length > 1 ? month : '0' + month;
  var day = curdate.getDate().toString();
  day = day.length > 1 ? day : '0' + day;

  console.log(year+month);
  // res.json({
  //   "success": 1,
  //   "result": null
  // });

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
        result: 'success'
      });
    else
      res.json({
        result: 'fail',
        message: data
      });
  });
})

router.route('/byCalendar')
.get(function(req, res) {
  console.log(req.query.from);
  var currDate = new Date(null);
  currDate.setTime(req.query.from);
  console.log(currDate);

  var year = currDate.getFullYear();
  var month = (1 + currDate.getMonth()).toString();
  month = month.length > 1 ? month : '0' + month;
  var day = currDate.getDate().toString();
  day = day.length > 1 ? day : '0' + day;

  var availableDateModel = new AvailableDateModel();
  availableDateModel.query(req.query.type, req.query.id, year+month, function(ret, data){
    if(ret) {
      var availableMonth = data[0]._available_month;
      var year = availableMonth.substring(0,4);
      var month = availableMonth.substring(4,6);
      console.log('month = ' + month);
      var availableStr = data[0]._available_date;

      var result = [];
      for (var i = 0, len = availableStr.length; i < len; i++) {
        if(availableStr[i] == "1") {
          var dtStart = new Date(year+'/'+month+'/'+(i+1));
          var startSeconds = dtStart.getTime();

          var obj = {
              id: 999,
              title: "可預約",
              url: "",
              class: "event-important",
              start: startSeconds,
              end: startSeconds
            };
          result.push(obj);
        }
      }

      res.json({
        "success": 1,
        "result": result
      });
    } else
      res.json({
        "success": 1,
        "result": null
      });
  });
})
.post(function(req, res) {
  var type = req.body['type'];
  var id = req.body['id'];
  var month = req.body['month'];
  var day = req.body['day'];

  var availableDateModel = new AvailableDateModel();
  availableDateModel.update(type, id, month, day, 
    function(ret, data){
    if( ret )
      res.json({
        result: 'success'
      });
    else
      res.json({
        result: 'fail',
        message: data
      });
  });
})


module.exports = router;