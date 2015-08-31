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
            this.tasksResource.getTasks()
                .then((tasks) => {
                    _.remove(this.overdue, _.difference(this.overdue, tasks));
                    _.remove(this.today, _.difference(this.today, tasks));
                    _.remove(this.tomorrow, _.difference(this.tomorrow, tasks));
                    _.remove(this.thisWeek, _.difference(this.thisWeek, tasks));
                    _.remove(this.later, _.difference(this.later, tasks));
                    _.forEach(tasks, (task) => {
                        this.distributeTask(task)
                    });
                });
        }

        private distributeTask(task) {
            var correctList;
            var lists = [
                this.overdue,
                this.today,
                this.tomorrow,
                this.thisWeek,
                this.later
            ];

            if (moment(task.due).isBefore(moment(), 'day')) {
                correctList = this.overdue;
            } else if (moment(task.due).isSame(moment(), 'day')
                || _.isEqual(task.due, 'ASAP')) {
                correctList = this.today;
            } else if (moment(task.due).isSame(moment().add(1, 'day'), 'day')) {
                correctList = this.tomorrow;
            } else if (moment(task.due).isBefore(moment().endOf('week').add(1, 'day'))) { // Moment.js week ends on saturday but I prefer Sunday
                correctList = this.thisWeek;
            }
            else {
                correctList = this.later
            }

            _.forEach(lists, list => {
                if (list === correctList && task.status === TaskStatus.OPEN) {
                    if (_.findIndex(correctList, {id: task.id}) === -1) {
                        correctList.push(task);
                    }
                } else {
                    _.remove(list, task);
                }
            });
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
            this.tasksResource.closeTask(task);
        }
    }

    angular.module('services').service('TaskListService', TaskListService);
}


