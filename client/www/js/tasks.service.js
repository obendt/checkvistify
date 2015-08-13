/// <reference path="../../typings/tsd.d.ts" />
var MyModule;
(function (MyModule) {
    var TasksService = (function () {
        function TasksService($http, $log) {
            this.$http = $http;
            this.$log = $log;
        }
        TasksService.prototype.getTasks = function () {
            var _this = this;
            var url = 'http://checkvistify-transcg.rhcloud.com/tasks/active';
            return this.$http.get(url)
                .then(function (result) {
                return result.data;
            }, function (error) {
                console.log('error');
                _this.$log.error('Error ' + error);
            });
        };
        return TasksService;
    })();
    MyModule.TasksService = TasksService;
    angular.module('services').service('TasksService', TasksService);
})(MyModule || (MyModule = {}));
//# sourceMappingURL=tasks.service.js.map