/// <reference path="../../typings/tsd.d.ts" />
module services {
    export class TasksService {
        private $http:ng.IHttpService;
        private $log:angular.ILogService;

        constructor($http:angular.IHttpService, $log:angular.ILogService) {
            this.$http = $http;
            this.$log = $log;
        }

        public getTasks() {
            var url:string = 'http://checkvistify-transcg.rhcloud.com/tasks/active';
            return this.$http.get(url)
                .then((result:angular.IHttpPromiseCallbackArg<any>) => {
                    return result.data;
                },
                (error:angular.IHttpPromiseCallbackArg<any>) => {
                    console.log('error');
                    this.$log.error('Error ' + error);
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
                    console.log('error');
                    this.$log.error('Error ' + error);
                });
            ;
        }
    }

    angular.module('services').service('TasksService', TasksService);
}


