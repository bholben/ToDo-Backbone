
(function () {
  'use strict';

  describe('About the ToDo List', function () {

    beforeEach(function () {
      window.task = new Task();
      task.create('Get groceries');
    });

    describe('About adding a task', function () {
      it('should create an instance of task', function () {
        expect(task instanceof Task).to.equal(true);
      });

      it('should have an id', function () {
        expect(task.id).to.not.be.undefined;
      });

      it('should have a title', function () {
        expect(task.title).to.not.be.undefined;
      });

      it('should have a title of "Get groceries"', function () {
        expect(task.title).to.equal('Get groceries');
      });
    });

    describe('Able to toggle the task complete/incomplete', function () {
      it('should be able to toggle complete', function () {
        expect(task.completed).to.equal(false);
        task.toggleComplete();
        expect(task.completed).to.equal(true);
        task.toggleComplete();
        expect(task.completed).to.equal(false);
      });
    });

    describe('Adding Task', function () {
      it('should increase array length by 1', function () {
        expect(tasks).to.have.length(6);
        task = new Task();
        task.create('Get babysitter');
        expect(tasks).to.have.length(7);
      });
    });

    describe('Able to delete a task', function () {
      it('should delete a task', function () {
        expect(task.active).to.equal(true);
        task.delete();
        expect(task.active).to.equal(false);
      });
    });
  });
})();
