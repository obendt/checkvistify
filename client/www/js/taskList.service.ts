/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="tasks.service.ts" />
/// <reference path="ListItem.ts" />
module services {

    export enum TaskStatus {OPEN, CLOSED, INVALIDATED}

    export class TaskListService {

        public overdue:any;
        public today:any;
        public tomorrow:any;
        public thisWeek:any;
        public later:any;

        $log:ng.ILogService;

        private tasksResource:TasksService;

        static $inject = [
            "TasksService",
            '$log'
        ];

        constructor(tasksResource:TasksService, $log) {
            this.tasksResource = tasksResource;
            this.overdue = [];
            this.today = [];
            this.tomorrow = [];
            this.thisWeek = [];
            this.later = [];
            this.$log = $log;
        }

        public refresh() {
            this.overdue = [];
            this.today = [];
            this.tomorrow = [];
            this.thisWeek = [];
            this.later = [];

            this.tasksResource.getTasks()
                .then((tasks) => {
                    _.forEach(tasks, (task) => {
                        this.distributeTask(task)
                    });
                });
        }

        private distributeTask(task) {
            _.remove(this.overdue, task);
            _.remove(this.today, task);
            _.remove(this.tomorrow, task);
            _.remove(this.thisWeek, task);
            _.remove(this.later, task);

            // When the task has been removed check that it is open before inserting it into another list.
            if(task.status !== TaskStatus.OPEN) {
                return;
            }

            if (moment(task.due).isBefore(moment(), 'day')) {
                this.overdue.push(task);
            } else if (moment(task.due).isSame(moment(), 'day')
                || _.isEqual(task.due, 'ASAP')) {
                this.today.push(task);
            } else if (moment(task.due).isSame(moment().add(1, 'day'), 'day')) {
                this.tomorrow.push(task);
            } else if (moment(task.due).isBefore(moment().endOf('week').add(1, 'day'))) { // Moment.js week ends on saturday but I prefer Sunday
                this.thisWeek.push(task);
            }
            else {
                this.later.push(task);
            }
        }

        doToday(task) {
            task.due = 'ASAP';
            this.distributeTask(task);
            this.tasksResource.updateTask(task);
        }

        doTomorrow(task) {
            task.due = moment().add(1, 'days').format('YYYY/MM/DD');
            this.distributeTask(task);
            this.tasksResource.updateTask(task);
        }

        doNextWeek(task) {
            task.due = moment().add(1, 'weeks').format('YYYY/MM/DD');
            this.distributeTask(task);
            this.tasksResource.updateTask(task);
        }

        doNextMonth(task) {
            task.due = moment().add(1, 'months').format('YYYY/MM/DD');
            this.distributeTask(task);
            this.tasksResource.updateTask(task);
        }

        complete(task) {
            task.status = TaskStatus.CLOSED;
            this.distributeTask(task);
            this.tasksResource.updateTask(task);
        }
    }

    angular.module('services').service('TaskListService', TaskListService);
}


