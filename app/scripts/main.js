
(function () {
  'use strict';

  var taskTemplate = Handlebars.templates.task,
      $form = $('#form'),
      $newTodo = $('#new-todo'),
      $todoList = $('#todo-list');

  window.tasks = [];

  window.Task = function () {
    this.id = uuid();
    this.completed = false;
    this.active = true;
  };

  Task.prototype = {

    create: function (title) {
      this.title = title;
      tasks.push(this);
      $todoList.prepend(taskTemplate(this));
      // $newTodo[0].value='';
    },

    toggleComplete: function () {
      this.completed = !this.completed;
    },

    delete: function () {
      this.active = false;
    }
  };

  $form.on('submit', function (e) {
    e.preventDefault();
    var task = new Task();
    task.create($newTodo.val());
  });

  $todoList.on('click', 'input.toggle', function (e) {
    var $task = $(e.target).closest('li'),
        task = _.findWhere(tasks, {id: $task.attr('data-id')});
    task.toggleComplete();
    $task.toggleClass('completed');
  });

  $todoList.on('click', 'button.destroy', function (e) {
    var $task = $(e.target).closest('li'),
        task = _.findWhere(tasks, {id: $task.attr('data-id')});
    task.delete();
    $task.addClass('hidden');
  });

}());

