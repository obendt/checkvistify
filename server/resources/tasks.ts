var _ = require('lodash');
var when = require('when');

class Tasks {

    private client;

    constructor() {
        var rest = require('rest');
        var mime = require('rest/interceptor/mime');
        var basicAuth = require('rest/interceptor/basicAuth');

        this.client = rest
            .wrap(mime);
    }

    getLists(authToken) {
        var url = 'https://checkvist.com/checklists.json?token=' + authToken;

        return this.client({path: url})
            .then((response) => {
                return response.entity;
            })
            .catch((error) => {
                return when.reject(error);
            });
    }

    getTasks(listId:string, authToken) {
        var url = 'https://checkvist.com/checklists/' + listId + '/tasks.json?token=' + authToken;

        return this.client({path: url})
            .then((response) => {
                return response.entity;
            })
            .catch((error) => {
                return when.reject(error);
            });
    }

    getAllTasks(authToken) {
        return this.getLists(authToken)
            .then((theLists) => {
                return _.map(theLists, (aList) => {
                    return this.getTasks(aList.id, authToken);
                });
            })
            .then((promiseArray) => {
                return when.all(promiseArray);
            })
            .then((arrayOfArrays) => {
                return _.flatten(arrayOfArrays);
            })
            .catch((error) => {
                return when.reject(error);
            });
    }

    getAllTasksWithADueDate(authToken) {
        return this.getAllTasks(authToken)
            .then((theTasks) => {
                return _.filter(theTasks, (aTask) => {
                    return aTask.due !== null
                });
            })
            .catch((error) => {
                return when.reject(error);
            });
    }

    getActiveTasksWithADueDate(authToken) {
        return this.getAllTasksWithADueDate(authToken)
            .then((dueTasks)=> {
                return _.filter(dueTasks, (dueTask) => {
                    return dueTask.status === 0
                });
            })
            .catch((error) => {
                console.log(error);
                return when.reject(error);
            })
            .catch((error) => {
                return when.reject(error);
            });
    }

    createTask(task, authToken) {
        var inboxId = 482559;
        var url = 'https://checkvist.com/checklists/' + inboxId + '/tasks.json';
        return this.client({
            method: 'POST',
            path: url,
            headers: {'Content-Type': 'application/json'},
            entity: {
                token: authToken,
                content: task.content,
                due_date: task.due
            }
        })
            .then((response) => {
                return response.status.code;
            })
            .catch((error) => {
                return when.reject(error);
            });

    }

    updateTask(task, authToken) {
        var url = 'https://checkvist.com/checklists/' + task.checklist_id + '/tasks/' + task.id + '.json';
        return this.client({
            method: 'PUT',
            path: url,
            headers: {'Content-Type': 'application/json'},
            entity: {
                token: authToken,
                due_date: task.due,
                status: task.status
            }
        })
            .then((response) => {
                return response.status.code;
            })
            .catch((error) => {
                return when.reject(error);
            });

    }

    closeTask(task, authToken) {
        var url = 'https://checkvist.com/checklists/' + task.checklist_id + '/tasks/' + task.id + '/close.json?token=' + authToken;
        return this.client({
            method: 'POST',
            path: url,
            headers: {'Content-Type': 'application/json'}
        })
            .then((response) => {
                return response.status.code;
            })
            .catch((error) => {
                return when.reject(error);
            });
    }

    login(username, remoteKey) {
        var url = 'https://checkvist.com/auth/login.json';

        return this.client({
            method: 'POST',
            path: url,
            headers: {'Content-Type': 'application/json'},
            entity: {username: username, remote_key: remoteKey}
        })
            .then((response) => {
                return response.entity;
            })
            .catch((error) => {
                return when.reject(error);
            });
    }
}

module.exports = Tasks;