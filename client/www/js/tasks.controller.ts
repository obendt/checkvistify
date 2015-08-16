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

        private modalTemplate = '' +
            '<ion-modal-view>' +
            '<ion-header-bar>' +
            '<h1 class="title">{{currentTask.content}}</h1>' +
            '</ion-header-bar>' +
            '<ion-content>' +
            '<div class="card list">' +
            '<div class="item" ng-click="doToday(currentTask)">Do today</div>' +
            '<div class="item" ng-click="doTomorrow(currentTask)">Do tomorrow</div>' +
            '<div class="item" ng-click="doNextWeek(currentTask)">Do next week</div>' +
            '<div class="item" ng-click="doNextMonth(currentTask)">Do next month</div>' +
            '<div class="item" ng-click="hideModal()">Cancel</div>' +
            '</div>' +
            '</ion-content>' +
            '</ion-modal-view>';

        private popoverTemplate = '' +
            '<ion-popover-view ng-click="hideModal()">' +
            '<ion-header-bar>' +
            '<h1 class="title">Do When?</h1>' +
            '</ion-header-bar>' +
            '<ion-content>' +
            '{{currentTask.content}}' +
            '</ion-content>' +
            '</ion-popover-view>';

        static $inject = [
            "$scope",
            "TaskListService",
            "$ionicModal",
            "$ionicPopover"
        ];

        constructor(isolateScope:any, taskListService:services.TaskListService, $ionicModal, $ionicPopover) {
            this.name = isolateScope.name;
            this.isolateScope = isolateScope;
            this.modal = $ionicModal.fromTemplate(this.modalTemplate, {
                scope: isolateScope,
                animation: 'slide-in-up'
            });

            this.popover = $ionicPopover.fromTemplate(this.popoverTemplate, {
                scope: isolateScope
            });

            this.isolateScope.showModal = this.showModal.bind(this);
            this.isolateScope.hideModal = this.hideModal.bind(this);

            this.isolateScope.doToday = this.doToday.bind(this);
            this.isolateScope.doTomorrow = this.doTomorrow.bind(this);
            this.isolateScope.doNextWeek = this.doNextWeek.bind(this);
            this.isolateScope.doNextMonth = this.doNextMonth.bind(this);

            this.isolateScope.showPopover = this.showPopover.bind(this);
            this.isolateScope.hidePopover = this.hidePopover.bind(this);

            this.isolateScope.taskLists = taskListService;
            this.isolateScope.taskLists.refresh();
        }


        save() {
            if (this.newItemName && this.newItemName.length > 0) {
                var newItem = new domain.ListItem(this.newItemName);
                this.listItems.push(newItem);

                this.newItemName = null;
            }
        }

        toggle(listItem:ListItem):boolean {
            listItem.isComplete = !listItem.isComplete;
            return listItem.isComplete;
        }

        showModal(listItem:ListItem) {
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
            task.due = moment().add(1, 'weeks').format('YYYY/MM/DD');
            this.isolateScope.taskLists.distributeTasks();
            this.hideModal();
        }

        doNextMonth(task) {
            task.due = moment().add(1, 'months').format('YYYY/MM/DD');
            this.isolateScope.taskLists.distributeTasks();
            this.hideModal();
        }

        showPopover($event:ng.IAngularEvent, listItem:ListItem) {
            this.isolateScope.currentTask = listItem;
            this.popover.show($event);
        }

        hidePopover() {
            this.popover.hide();
        }
    }

    angular.module('controllers').controller('TaskListController', TaskListController);
}