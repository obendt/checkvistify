/// <reference path="../../typings/tsd.d.ts" />
///<reference path="auth.service.ts"/>
module services {
    export class TasksService {
        private $http:ng.IHttpService;
        private $log:angular.ILogService;
        private $q:angular.IQService;
        private authService:services.AuthService;

        constructor($http:angular.IHttpService, $log:angular.ILogService, $q:angular.IQService, AuthService) {
            this.$http = $http;
            this.$log = $log;
            this.$q = $q;
            this.authService = AuthService;
        }

        public getTasks() {
            var url:string = 'http://checkvistify-transcg.rhcloud.com/tasks/active?token=' + this.authService.token;
            return this.$http.get(url)
                .then((result:angular.IHttpPromiseCallbackArg<any>) => {
                    this.$log.debug(result);
                    return result.data;
                })
                .catch((error:angular.IHttpPromiseCallbackArg<any>) => {
                    this.$log.error('Error ' + error);
                    return this.$q.reject(error);
                });
        }

        public createTask(content, dueDate) {
            var url = 'http://checkvistify-transcg.rhcloud.com/tasks?token=' + this.authService.token;
            var task = {
                content: content,
                due: dueDate
            };

            return this.$http.post(url, task)
                .then((result:angular.IHttpPromiseCallbackArg<any>) => {
                    console.log('success!');
                    return result.data;
                })
                .catch((error:angular.IHttpPromiseCallbackArg<any>) => {
                    this.$log.error('Error ', error);
                    return this.$q.reject(error);
                });
        }

        public updateTask(task) {
            var url = 'http://checkvistify-transcg.rhcloud.com/tasks/' + task.id + '?token=' + this.authService.token;
            return this.$http.put(url, task)
                .then((result:angular.IHttpPromiseCallbackArg<any>) => {
                    return result.data;
                },
                (error:angular.IHttpPromiseCallbackArg<any>) => {
                    this.$log.error('Error ' + error);
                    return this.$q.reject(error);
                });
        }

        public closeTask(task) {
            console.log('close task: ', task);
            var url = 'http://checkvistify-transcg.rhcloud.com/tasks/close/' + task.id + '?token=' + this.authService.token;
            return this.$http.put(url, task)
                .then((result:angular.IHttpPromiseCallbackArg<any>) => {
                    return result.data;
                },
                (error:angular.IHttpPromiseCallbackArg<any>) => {
                    this.$log.error('Error ' + error);
                    return this.$q.reject(error);
                });
        }
    }

    angular.module('services').service('TasksService', TasksService);
}


