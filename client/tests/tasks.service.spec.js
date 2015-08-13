describe('Task service', function () {
  var TasksService;
  var $httpBackend

  beforeEach(module('services'));

  beforeEach(inject(function (_TasksService_, _$httpBackend_) {
    TasksService = _TasksService_;
    // Set up the mock http service responses
    $httpBackend = _$httpBackend_;
    // backend definition common for all tests
    $httpBackend.when('GET', 'http://checkvistify-transcg.rhcloud.com/tasks/active').respond([
        {
          "id": 18450009,
          "parent_id": 0,
          "checklist_id": 482559,
          "status": 0,
          "position": 15,
          "tasks": [
            18473592,
            18473593
          ],
          "update_line": "due date changed by Olof",
          "updated_at": "2015/07/08 14:12:56 +0000",
          "collapsed": false,
          "comments_count": 0,
          "details": {},
          "due": "2015/07/09",
          "assignee_ids": [],
          "content": "Boka digital kickoff",
          "tags": {},
          "tags_as_text": ""
        }
      ]);
  }));

  it('can get an instance of my factory', function () {
    expect(TasksService).toBeDefined();
  });

  it('returns the tasks from the server', function () {
    TasksService.getTasks()
      .then(function (tasks) {
        expect(tasks.length).toEqual(1);
      });

    $httpBackend.flush();
  });
});