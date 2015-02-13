
var app = {};

(function () {
  'use strict';

  // Cache html elements
  var taskTemplate = Handlebars.templates.task,
      $form = $('#form'),
      $newTask = $('#new-task'),
      $taskList = $('#task-list');

  // Create Task model
  app.Task = Backbone.Model.extend({

    idAttribute: '_id',

    defaults: { completed: false },

    create: function (title) {
      this.set('title', title);
      app.tasks.add(this).save().done(renderNewTask.bind(this));
    },

    toggleComplete: function () {
      this.attributes.completed = !this.attributes.completed;
      this.save();
    },

    delete: function () {
      this.destroy();
    }
  });

  // Create Tasks collection
  app.Tasks = Backbone.Collection.extend({
    model: app.Task,
    url: 'http://tiy-atl-fe-server.herokuapp.com/collections/bobs_backbone_test'
  });

  // Create tasks collection instance
  app.tasks = new app.Tasks();


  // Render the new task at the top of the list and clear the input box
  function renderNewTask(obj) {
    $taskList.prepend(taskTemplate(obj));
    $newTask[0].value='';
  }

  // Bind events
  $form.on('submit', createController.bind(this));
  $taskList.on('click', 'input.toggle', toggleController.bind(this));
  $taskList.on('click', 'button.destroy', deleteController.bind(this));

  function createController(e) {
    e.preventDefault();
    var title = $newTask.val();
    if (title) {
      // Create a new model (local and server) & update the view
      var task = new app.Task();
      task.create(title);
    }
  }

  function toggleController(e) {
    // Target specific task
    var task = targetTask(e);
    // Update the model (local and server)
    task.model.toggleComplete();
    // Update the view
    task.$li.toggleClass('completed');
  }

  function deleteController(e) {
    // Target specific task
    var task = targetTask(e);
    // Update the model (local and server)
    task.model.delete();
    // Update the view
    task.$li.addClass('hidden');
  }

  function targetTask(e) {
    var $li = $(e.target).closest('li'),
        targetID = $li.attr('data-id'),
        model = app.tasks.findWhere({_id: targetID});
    return {$li: $li, model: model};
  }

}());

