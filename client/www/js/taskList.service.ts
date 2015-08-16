/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="tasks.service.ts" />
/// <reference path="ListItem.ts" />
module services {
    export class TaskListService {

        public overdue:any;
        public today:any;
        public tomorrow:any;
        public thisWeek:any;
        public later:any;

        private tasksResource:TasksService;

        static $inject = [
            "TasksService"
        ];

        constructor(tasksResource:TasksService) {
            this.tasksResource = tasksResource;
            this.overdue = [];
            this.today = [];
            this.tomorrow = [];
            this.thisWeek = [];
            this.later= [];
        }

        public refresh() {
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

            if (moment(task.due).isSame(moment(), 'day')
                || _.isEqual(task.due, 'ASAP')) {
                this.today.push(task);
            } else if (moment(task.due).isSame(moment().add(1, 'day'), 'day')) {
                this.tomorrow.push(task);
            }
        }

        doToday(task) {
            task.due = 'ASAP';
            this.distributeTask(task);
        }

        doTomorrow(task) {
            task.due = moment().add(1, 'days').format('YYYY/MM/DD');
            this.distributeTask(task);
        }
    }

    angular.module('services').service('TaskListService', TaskListService);
}


