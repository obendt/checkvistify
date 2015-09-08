var express = require('express');
var router = express.Router();
var Tasks = require('../resources/tasks');
var tasks = new Tasks();

/* GET token. */
router.post('/login', function (req, res, next) {
  tasks.login(req.body.username, req.body.remote_key)
    .then(function (theToken) {
      res.send(theToken);
    })
    .catch(function (error) {
      res.status(error.status.code);
      res.send(error.entity);
    });
});

module.exports = router;
