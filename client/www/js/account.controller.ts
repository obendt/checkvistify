/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="taskList.service.ts" />
///<reference path="auth.service.ts"/>
module controllers {

    export class AccountController {
        username:string;
        password:string;
        authService:services.AuthService;

        static $inject = [
            "AuthService"
        ];

        constructor(authService:services.AuthService) {
            this.authService = authService;
        }
    }

    angular.module('controllers').controller('AccountController', AccountController);
}