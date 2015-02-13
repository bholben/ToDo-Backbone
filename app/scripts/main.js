
var app = {};

(function () {
  'use strict';

  var taskTemplate = Handlebars.templates.task,
      $form = $('#form'),
      $newTask = $('#new-task'),
      $taskList = $('#task-list');

  app.Task = Backbone.Model.extend({

    idAttribute: '_id',

    defaults: {
      completed: false,
      active: true
    },

    render: function () {
      $taskList.prepend(taskTemplate(JSON.parse(this.data)));
      $newTask[0].value='';
    },

    create: function (title) {
      this.set('title', title);
      app.tasks.add(this).save().done(this.render);
    },

    toggleComplete: function () {
      this.attributes.completed = !this.attributes.completed;
    },

    delete: function () {
      this.attributes.active = false;
    }
  });

  app.Tasks = Backbone.Collection.extend({
    model: app.Task,
    url: 'http://tiy-atl-fe-server.herokuapp.com/collections/bobs_backbone_test'
  });

  app.tasks = new app.Tasks();

  var newTask = function (e) {
    e.preventDefault();
    if ($(e.target)[0][0].value !== '') {
      var task = new app.Task();
      task.create($newTask.val());
    }
  };

  $form.on('submit', newTask.bind(this));

  $taskList.on('click', 'input.toggle', function (e) {
    $(e.target).closest('li').toggleClass('completed');
    app.tasks.models[0].toggleComplete();
  });

  $taskList.on('click', 'button.destroy', function (e) {
    $(e.target).closest('li').addClass('hidden');
    app.tasks.models[0].delete();
  });

}());

