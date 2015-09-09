/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="taskList.service.ts" />
/// <reference path="add-task.controller.ts" />
/// <reference path="auth.service.ts"/>
module controllers {

    export class AccountController {
        authService:services.AuthService;
        $log:ng.ILogService;
        $q:ng.IQService;
        $ionicTabsDelegate;
        $ionicLoading;
        $localStorage;

        public username:string;
        public password:string;

        static $inject = [
            'AuthService',
            '$scope',
            '$log',
            '$q',
            '$ionicTabsDelegate',
            '$ionicLoading',
            '$localStorage'
        ];

        constructor(authService:services.AuthService,
                    $scope,
                    $log:ng.ILogService,
                    $q:ng.IQService,
                    $ionicTabsDelegate,
                    $ionicLoading,
                    $localStorage) {

            this.authService = authService;
            this.$log = $log;
            this.$q = $q;
            this.$ionicTabsDelegate = $ionicTabsDelegate;
            this.$ionicLoading = $ionicLoading;
            this.$localStorage = $localStorage;
        }

        login(username, password) {
            this.authService.login(username, password)
                .then(result => this.loginSuccess(result))
                .catch(error => this.loginError(error))
        }

        private loginSuccess(result) {
            this.$ionicLoading.show({
                template: 'Welcome',
                noBackdrop: true,
                duration: 2000
            });

            this.$ionicTabsDelegate.select(Tab.SCHEDULE);
        }

        private loginError(error) {
            this.$localStorage.password = '';
            if (error.status === 403) {
                this.$ionicLoading.show({
                    template: 'Wrong user name or password.',
                    noBackdrop: true,
                    duration: 2000
                });
            } else {
                this.$ionicLoading.show({
                    template: 'Something went wrong.',
                    noBackdrop: true,
                    duration: 2000
                });
            }
        }
    }


    angular.module('controllers').controller('AccountController', AccountController);
}