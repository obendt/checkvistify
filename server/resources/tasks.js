/// <reference path="../typings/tsd.d.ts" />
var _ = require('lodash');
var when = require('when');
var Tasks = (function () {
    function Tasks() {
        var rest = require('rest');
        var mime = require('rest/interceptor/mime');
        var basicAuth = require('rest/interceptor/basicAuth');
        this.client = rest.wrap(mime)
            .wrap(basicAuth, {
            username: process.env.CV_USER,
            password: process.env.CV_KEY
        });
    }
    Tasks.prototype.getLists = function () {
        var url = 'https://checkvist.com/checklists.json';
        return this.client({ path: url })
            .then(function (response) {
            return response.entity;
        });
    };
    Tasks.prototype.getTasks = function (listId) {
        var url = 'https://checkvist.com/checklists/' + listId + '/tasks.json';
        return this.client({ path: url })
            .then(function (response) {
            return response.entity;
        });
    };
    Tasks.prototype.getAllTasks = function () {
        var _this = this;
        return this.getLists()
            .then(function (theLists) {
            return _.map(theLists, function (aList) {
                return _this.getTasks(aList.id);
            });
        })
            .then(function (promiseArray) {
            return when.all(promiseArray);
        })
            .then(function (arrayOfArrays) {
            return _.flatten(arrayOfArrays);
        });
    };
    Tasks.prototype.getAllTasksWithADueDate = function () {
        return this.getAllTasks()
            .then(function (theTasks) {
            return _.filter(theTasks, function (aTask) {
                return aTask.due !== null;
            });
        });
    };
    Tasks.prototype.getActiveTasksWithADueDate = function () {
        return this.getAllTasksWithADueDate()
            .then(function (dueTasks) {
            return _.filter(dueTasks, function (dueTask) {
                return dueTask.status === 0;
            });
        });
    };
    Tasks.prototype.updateTask = function (task) {
        var url = 'https://checkvist.com/checklists/' + task.checklist_id + '/tasks/' + task.id + '.json';
        return this.client({
            method: 'PUT',
            path: url,
            headers: { 'Content-Type': 'application/json' },
            entity: { due_date: task.due }
        })
            .then(function (response) {
            return response.status.code;
        }, function (error) {
            console.log('Error: ' + error);
        });
    };
    return Tasks;
})();
module.exports = Tasks;
//# sourceMappingURL=tasks.js.map