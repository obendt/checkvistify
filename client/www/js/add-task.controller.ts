/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="taskList.service.ts" />
/// <reference path="auth.service.ts"/>
module controllers {

    export class AddTaskController {
        authService:services.AuthService;
        tasksService:services.TasksService;

        static $inject = [
            "AuthService",
            "TasksService"
        ];

        constructor(authService:services.AuthService, tasksService:services.TasksService) {
            this.authService = authService;
            this.tasksService = tasksService;
        }
    }

    angular.module('controllers').controller('AddTaskController', AddTaskController);
}