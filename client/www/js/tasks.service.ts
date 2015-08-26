/// <reference path="../../typings/tsd.d.ts" />
module services {
    export class TasksService {
        private $http:ng.IHttpService;
        private $log:angular.ILogService;
        private $q:angular.IQService;

        constructor($http:angular.IHttpService, $log:angular.ILogService, $q:angular.IQService) {
            this.$http = $http;
            this.$log = $log;
            this.$q = $q;
        }

        public getTasks() {
            var url:string = 'http://checkvistify-transcg.rhcloud.com/tasks/active';
            return this.$http.get(url)
                .then((result:angular.IHttpPromiseCallbackArg<any>) => {
                    return result.data;
                },
                (error:angular.IHttpPromiseCallbackArg<any>) => {
                    this.$log.error('Error ' + error);
                    return this.$q.reject(error);
                });
        }

        public updateTask(task) {
            var url = 'http://checkvistify-transcg.rhcloud.com/tasks/' + task.id;
            return this.$http.put(url, task)
                .then((result:angular.IHttpPromiseCallbackArg<any>) => {
                    console.log('success!');
                    return result.data;
                },
                (error:angular.IHttpPromiseCallbackArg<any>) => {
                    this.$log.error('Error ' + error);
                    return this.$q.reject(error);
                });
        }

        public login(task) {
            var url = 'http://checkvistify-transcg.rhcloud.com/login/' + task.id;
            return this.$http.put(url, task)
                .then((result:angular.IHttpPromiseCallbackArg<any>) => {
                    console.log('success!');
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


