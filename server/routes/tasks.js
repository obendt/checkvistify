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
  tasks.getActiveTasksWithADueDate()
    .then(function (theTasks) {
      res.send(theTasks);
    });
});

router.put('/:id', function (req, res, next) {
  tasks.updateTask(req.entity)
    .then(function (status) {
      res.send(status);
    });
});


module.exports = router;
