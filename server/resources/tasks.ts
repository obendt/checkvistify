/// <reference path="../typings/tsd.d.ts" />

var _ = require('lodash');
var when = require('when');

class Tasks {

    private client;

    constructor() {
        var rest = require('rest');
        var mime = require('rest/interceptor/mime');
        var basicAuth = require('rest/interceptor/basicAuth');

        this.client = rest.wrap(mime)
            .wrap(basicAuth, {
                username: process.env.CV_USER,
                password: process.env.CV_KEY
            });
    }

    getLists() {
        var url = 'https://checkvist.com/checklists.json';

        return this.client({path: url})
            .then((response) => {
                return response.entity;
            });
    }

    getTasks(listId:string) {
        var url = 'https://checkvist.com/checklists/' + listId + '/tasks.json';

        return this.client({path: url})
            .then((response) => {
                return response.entity;
            });
    }

    getAllTasks() {
        return this.getLists()
            .then((theLists) => {
                return _.map(theLists, (aList) => {
                    return this.getTasks(aList.id);
                });
            })
            .then((promiseArray) => {
                return when.all(promiseArray);
            })
            .then((arrayOfArrays) => {
                return _.flatten(arrayOfArrays);
            });
    }

    getAllTasksWithADueDate() {
        return this.getAllTasks()
            .then((theTasks) => {
                return _.filter(theTasks, (aTask) => {
                    return aTask.due !== null
                });
            });
    }

    getActiveTasksWithADueDate() {
        return this.getAllTasksWithADueDate()
            .then((dueTasks)=> {
                return _.filter(dueTasks, (dueTask) => {
                    return dueTask.status === 0
                });
            });
    }

    updateTask(task) {
        var url = 'https://checkvist.com/checklists/' + task.checklist_id + '/tasks/' + task.id + '.json';
        return this.client({
            method: 'PUT',
            path: url,
            headers: {'Content-Type': 'application/json'},
            entity: {due_date:task.due}
        })
            .then((response) => {
                return response.status.code;
            }, (error) => {
                console.log('Error: ' + error);
            });

    }
}

module.exports = Tasks;