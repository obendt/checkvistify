/// <reference path="tasks.service.ts" />
/// <reference path="../../typings/tsd.d.ts" />
module controllers {
    interface ListItem {
        isComplete:boolean;
    }

    export class TaskListController {
        name:string;
        listItems:ListItem[];
        newItemName:string;
        taskService:MyModule.TasksService;
        isolateScope:any;
        modal;

        private modalTemplate = '' +
            '<ion-modal-view ng-click="hideModal()">' +
            '<ion-header-bar>' +
            '<h1 class="title">Do When?</h1>' +
            '</ion-header-bar>' +
            '<ion-content>' +
            '{{currentTask.content}}' +
            '</ion-content>' +
            '</ion-modal-view>';

        static $inject = [
            "$scope",
            "TasksService",
            "$ionicModal"
        ];

        constructor(isolateScope:any, TaskService:MyModule.TasksService, $ionicModal) {
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

        refresh() {
            this.taskService.getTasks()
                .then((tasks) => {
                    this.isolateScope.todayItems = tasks;
                    this.isolateScope.tomorrowItems = tasks;
                    this.isolateScope.nextWeekItems = tasks;
                    this.isolateScope.nextMonthItems = tasks;
                });
        }

        save() {
            if (this.newItemName && this.newItemName.length > 0) {
                var newItem = new ListItem(this.newItemName);
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
    }

    angular.module('controllers').controller('TaskListController', TaskListController);
}