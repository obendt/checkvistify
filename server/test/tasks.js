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

  it('should return an array of all tasks with a due date', function (done) {
    var tasks = new Tasks();
    tasks.getAllTasksWithADueDate()
      .then(function (theTasks) {
        assert(theTasks instanceof Array);
        console.log('Due tasks: ' + theTasks.length);
        done();
      });
  });

  it('should return an array of ACTIVE tasks with a due date', function (done) {
    var tasks = new Tasks();
    tasks.getActiveTasksWithADueDate()
      .then(function (theTasks) {
        assert(theTasks instanceof Array);
        console.log('Due Active tasks: ' + theTasks.length);
        done();
      });
  });
});