/// <reference path="ListItem.ts" />
/// <reference path="taskList.service.ts" />
/// <reference path="../../typings/tsd.d.ts" />
module controllers {

    export class TaskListController {
        name:string;

        private taskItems:domain.ListItem[];

        newItemName:string;
        taskService:services.TasksService;
        isolateScope:any;
        modal;
        popover;

        static $inject = [
            "$scope",
            "TaskListService",
            "$ionicModal",
            "$ionicPopover"
        ];

        constructor(isolateScope:any, taskListService:services.TaskListService, $ionicModal, $ionicPopover) {
            this.name = isolateScope.name;
            this.isolateScope = isolateScope;

            $ionicModal.fromTemplateUrl('templates/modal-actions.html', {
                scope: isolateScope,
                animation: 'slide-in-up'
            }).then((modal) => {
                this.modal = modal;
            });

            this.isolateScope.showModal = this.showModal.bind(this);
            this.isolateScope.hideModal = this.hideModal.bind(this);

            this.isolateScope.doToday = this.doToday.bind(this);
            this.isolateScope.doTomorrow = this.doTomorrow.bind(this);
            this.isolateScope.doNextWeek = this.doNextWeek.bind(this);
            this.isolateScope.doNextMonth = this.doNextMonth.bind(this);
            this.isolateScope.complete = this.complete.bind(this);

            this.isolateScope.taskLists = taskListService;

            isolateScope.$on('$ionicView.enter', (event) => {
                isolateScope.taskLists.refresh()
            })
        }

        showModal(listItem:domain.ListItem) {
            this.isolateScope.currentTask = listItem;
            this.modal.show();
        }

        hideModal() {
            this.modal.hide();
        }

        doToday(task) {
            this.isolateScope.taskLists.doToday(task);
            this.hideModal();
        }

        doTomorrow(task) {
            this.isolateScope.taskLists.doTomorrow(task);
            this.hideModal();
        }

        doNextWeek(task) {
            this.isolateScope.taskLists.doNextWeek(task);
            this.hideModal();
        }

        doNextMonth(task) {
            this.isolateScope.taskLists.doNextMonth(task);
            this.hideModal();
        }

        complete(task) {
            this.isolateScope.taskLists.complete(task);
        }
    }

    angular.module('controllers').controller('TaskListController', TaskListController);
}