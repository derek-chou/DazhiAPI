var express = require('express');
var router = express.Router();

router.route('/common/:id')

.get(function(req, res) {
    res.json({
        id: req.params.id,
        message: 'The get api for common: ' + req.params.id
    })
})

.post(function(req, res) {
    res.json({
        id: req.params.id,
        message: 'The post api for common: ' + req.params.id
    })
})

.put(function(req, res) {
    res.json({
        id: req.params.id,
        message: 'The put api for common: ' + req.params.id
    })
})

.delete(function(req, res) {
    res.json({
        id: req.params.id,
        message: 'The delete api for common: ' + req.params.id
    })
});

module.exports = router;