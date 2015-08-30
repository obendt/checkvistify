/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="taskList.service.ts" />
/// <reference path="auth.service.ts"/>
module controllers {

    export enum Tab {ADD_TASK, SCHEDULE, ACCOUNT}

    export class AddTaskController {
        tasksService:services.TasksService;
        $log:ng.ILogService;
        $q:ng.IQService;
        $ionicTabsDelegate;
        $ionicLoading;

        content:string = '';
        due:string = 'asap';

        static $inject = [
            'TasksService',
            '$log',
            '$q',
            '$ionicTabsDelegate',
            '$ionicLoading'
        ];

        constructor(tasksService:services.TasksService,
                    $log:ng.ILogService,
                    $q:ng.IQService,
                    $ionicTabsDelegate,
                    $ionicLoading) {

            this.tasksService = tasksService;
            this.$log = $log;
            this.$q = $q;
            this.$ionicTabsDelegate = $ionicTabsDelegate;
            this.$ionicLoading = $ionicLoading;
        }

        addTask() {
            this.tasksService.createTask(this.content, this.due)
                .then((result) => {
                    this.content = '';
                    this.$ionicLoading.show({
                        template: 'Task Added!',
                        noBackdrop: true,
                        duration: 2000
                    });
                    return result;
                })
                .catch((error) => {
                    if (error.status === 401) {
                        this.$ionicLoading.show({
                            template: 'Please Log In.',
                            noBackdrop: true,
                            duration: 2000
                        });
                        this.$ionicTabsDelegate.select(Tab.ACCOUNT);
                    } else {

                    }

                    return this.$q.reject(error);
                });
        }
    }

    angular.module('controllers').controller('AddTaskController', AddTaskController);
}