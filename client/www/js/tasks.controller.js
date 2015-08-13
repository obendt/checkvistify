/// <reference path="tasks.service.ts" />
/// <reference path="../../typings/tsd.d.ts" />
var controllers;
(function (controllers) {
    var TaskListController = (function () {
        function TaskListController(isolateScope, TaskService, $ionicModal) {
            this.modalTemplate = '' +
                '<ion-modal-view ng-click="hideModal()">' +
                '<ion-header-bar>' +
                '<h1 class="title">Do When?</h1>' +
                '</ion-header-bar>' +
                '<ion-content>' +
                '{{currentTask.content}}' +
                '</ion-content>' +
                '</ion-modal-view>';
            this.name = isolateScope.name;
            this.taskService = TaskService;
            this.isolateScope = isolateScope;
            this.modal = $ionicModal.fromTemplate(this.modalTemplate, {
                scope: isolateScope,
                animation: 'slide-in-up'
            });
            this.isolateScope.showModal = this.showModal.bind(this);
            this.isolateScope.hideModal = this.hideModal.bind(this);
            this.refresh();
        }
        TaskListController.prototype.refresh = function () {
            var _this = this;
            this.taskService.getTasks()
                .then(function (tasks) {
                _this.isolateScope.todayItems = tasks;
                _this.isolateScope.tomorrowItems = tasks;
                _this.isolateScope.nextWeekItems = tasks;
                _this.isolateScope.nextMonthItems = tasks;
            });
        };
        TaskListController.prototype.save = function () {
            if (this.newItemName && this.newItemName.length > 0) {
                var newItem = new ListItem(this.newItemName);
                this.listItems.push(newItem);
                this.newItemName = null;
            }
        };
        TaskListController.prototype.toggle = function (listItem) {
            listItem.isComplete = !listItem.isComplete;
            return listItem.isComplete;
        };
        TaskListController.prototype.showModal = function (listItem) {
            this.isolateScope.currentTask = listItem;
            this.modal.show();
        };
        TaskListController.prototype.hideModal = function () {
            this.modal.hide();
        };
        TaskListController.$inject = [
            "$scope",
            "TasksService",
            "$ionicModal"
        ];
        return TaskListController;
    })();
    controllers.TaskListController = TaskListController;
    angular.module('controllers').controller('TaskListController', TaskListController);
})(controllers || (controllers = {}));
//# sourceMappingURL=tasks.controller.js.map