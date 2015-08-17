var assert = require('assert');
var Tasks = require('../resources/tasks');

describe('Array', function() {
  describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function () {
      assert.equal(-1, [1,2,3].indexOf(5));
      assert.equal(-1, [1,2,3].indexOf(0));
    });
  });
});

describe('Tasks', function () {
  xit('should return an array of Lists', function (done) {
    var tasks = new Tasks();
    tasks.getLists()
      .then(function (theLists) {
        assert(theLists instanceof Array);
        done();
      });
  });

  xit('should return an array of tasks given a List ID', function (done) {
    var tasks = new Tasks();
    tasks.getTasks('482237')
      .then(function (theTasks) {
        assert(theTasks instanceof Array);
        done();
      });
  });

  xit('should return an array of all tasks', function (done) {
    var tasks = new Tasks();
    tasks.getAllTasks()
      .then(function (theTasks) {
        console.log('Nof tasks: ' + theTasks.length);
        assert(theTasks instanceof Array);
        done();
      });
  });

  xit('should return an array of all tasks with a due date', function (done) {
    var tasks = new Tasks();
    tasks.getAllTasksWithADueDate()
      .then(function (theTasks) {
        assert(theTasks instanceof Array);
        console.log('Due tasks: ' + theTasks.length);
        done();
      });
  });

  xit('should return an array of ACTIVE tasks with a due date', function (done) {
    var tasks = new Tasks();
    tasks.getActiveTasksWithADueDate()
      .then(function (theTasks) {
        assert(theTasks instanceof Array);
        console.log('Due Active tasks: ' + theTasks.length);
        done();
      });
  });

  it('should update a task with new data', function (done) {
    var tasks = new Tasks();
    tasks.updateTask({
      "id": 19137285,
      "parent_id": 0,
      "checklist_id": 482559,
      "status": 0,
      "position": 4,
      "tasks": [],
      "update_line": "due date changed by Olof",
      "updated_at": "2015/08/11 11:20:38 +0000",
      "collapsed": false,
      "comments_count": 0,
      "details": {},
      "due": "2015/08/12",
      "assignee_ids": [],
      "content": "Shapeways",
      "tags": {},
      "tags_as_text": ""
    })
      .then(function (status) {
        assert.equal(status, '200');
        done();
      },
      function (error) {
        console.log('error goes here :asdfasdfasdf\n')
      });
  })
});