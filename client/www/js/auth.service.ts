/// <reference path="../../typings/tsd.d.ts" />
module services {
    export class AuthService {
        private $http:ng.IHttpService;
        private $log:angular.ILogService;
        private $q:angular.IQService;
        token:string;

        constructor($http:angular.IHttpService, $log:angular.ILogService, $q:angular.IQService) {
            this.$http = $http;
            this.$log = $log;
            this.$q = $q;
        }

        public login(username, password) {
            var url:string = 'http://checkvistify-transcg.rhcloud.com/auth/login';
            this.$log.debug('login', username);
            return this.$http.post(url, {
                username: username,
                remote_key: password
            })
                .then((result:angular.IHttpPromiseCallbackArg<any>) => {
                    this.$log.debug('token:', result.data);
                    this.token = result.data;
                    return result.data;
                })
                .catch((error:angular.IHttpPromiseCallbackArg<any>) => {
                    this.$log.error('Error ' + error);
                    return this.$q.reject(error);
                });
        }
    }

    angular.module('services').service('AuthService', AuthService);
}


