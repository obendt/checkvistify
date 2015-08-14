/// <reference path="../../typings/tsd.d.ts" />
module MyModule {
    export class TasksService {
        private $http:angular.IHttpService;
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
    }

    angular.module('services').service('TasksService', TasksService);
}


