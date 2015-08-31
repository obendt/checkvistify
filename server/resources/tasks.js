/// <reference path="../typings/tsd.d.ts" />
var _ = require('lodash');
var when = require('when');
var Tasks = (function () {
    function Tasks() {
        var rest = require('rest');
        var mime = require('rest/interceptor/mime');
        var basicAuth = require('rest/interceptor/basicAuth');
        this.client = rest
            .wrap(mime);
    }
    Tasks.prototype.getLists = function (authToken) {
        var url = 'https://checkvist.com/checklists.json?token=' + authToken;
        return this.client({ path: url })
            .then(function (response) {
            return response.entity;
        });
    };
    Tasks.prototype.getTasks = function (listId, authToken) {
        var url = 'https://checkvist.com/checklists/' + listId + '/tasks.json?token=' + authToken;
        return this.client({ path: url })
            .then(function (response) {
            return response.entity;
        });
    };
    Tasks.prototype.getAllTasks = function (authToken) {
        var _this = this;
        return this.getLists(authToken)
            .then(function (theLists) {
            return _.map(theLists, function (aList) {
                return _this.getTasks(aList.id, authToken);
            });
        })
            .then(function (promiseArray) {
            return when.all(promiseArray);
        })
            .then(function (arrayOfArrays) {
            return _.flatten(arrayOfArrays);
        });
    };
    Tasks.prototype.getAllTasksWithADueDate = function (authToken) {
        return this.getAllTasks(authToken)
            .then(function (theTasks) {
            return _.filter(theTasks, function (aTask) {
                return aTask.due !== null;
            });
        });
    };
    Tasks.prototype.getActiveTasksWithADueDate = function (authToken) {
        return this.getAllTasksWithADueDate(authToken)
            .then(function (dueTasks) {
            return _.filter(dueTasks, function (dueTask) {
                return dueTask.status === 0;
            });
        })
            .catch(function (error) {
            console.log(error);
            return when.reject(error);
        });
    };
    Tasks.prototype.createTask = function (task, authToken) {
        var inboxId = 482559;
        var url = 'https://checkvist.com/checklists/' + inboxId + '/tasks.json';
        return this.client({
            method: 'POST',
            path: url,
            headers: { 'Content-Type': 'application/json' },
            entity: {
                token: authToken,
                content: task.content,
                due_date: task.due
            }
        })
            .then(function (response) {
            return response.status.code;
        });
    };
    Tasks.prototype.updateTask = function (task, authToken) {
        var url = 'https://checkvist.com/checklists/' + task.checklist_id + '/tasks/' + task.id + '.json';
        return this.client({
            method: 'PUT',
            path: url,
            headers: { 'Content-Type': 'application/json' },
            entity: {
                token: authToken,
                due_date: task.due,
                status: task.status
            }
        })
            .then(function (response) {
            return response.status.code;
        });
    };
    Tasks.prototype.closeTask = function (task, authToken) {
        var url = 'https://checkvist.com/checklists/' + task.checklist_id + '/tasks/' + task.id + '/close.json?token=' + authToken;
        return this.client({
            method: 'POST',
            path: url,
            headers: { 'Content-Type': 'application/json' }
        })
            .then(function (response) {
            return response.status.code;
        });
    };
    Tasks.prototype.login = function (username, remoteKey) {
        var url = 'https://checkvist.com/auth/login.json';
        return this.client({
            method: 'POST',
            path: url,
            headers: { 'Content-Type': 'application/json' },
            entity: { username: username, remote_key: remoteKey }
        })
            .then(function (response) {
            return response.entity;
        });
    };
    return Tasks;
})();
module.exports = Tasks;
//# sourceMappingURL=tasks.js.map