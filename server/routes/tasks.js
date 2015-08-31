var express = require('express');
var router = express.Router();
var Tasks = require('../resources/tasks');
var tasks = new Tasks();

/* GET tasks listing. */
router.get('/', function(req, res, next) {
  tasks.getAllTasksWithADueDate()
    .then(function (theTasks) {
      res.send(theTasks);
    });
});

/* GET active tasks listing. */
router.get('/active', function(req, res, next) {
  tasks.getActiveTasksWithADueDate(req.query.token)
    .then(function (theTasks) {
      res.send(theTasks);
    })
    .catch(function(error) {
      res.send(error);
  });
});

router.post('/', function (req, res, next) {
  tasks.createTask(req.body, req.query.token)
    .then(function (status) {
      res.sendStatus(status);
    });
});

router.put('/:id', function (req, res, next) {
  tasks.updateTask(req.body, req.query.token)
    .then(function (status) {
      res.sendStatus(status);
    });
});

router.put('/close/:id', function (req, res, next) {
  tasks.closeTask(req.body, req.query.token)
    .then(function (status) {
      res.sendStatus(status);
    });
});

module.exports = router;
