
(function () {
  'use strict';

  window.app = {};

  var taskTemplate = Handlebars.templates.task,
      $form = $('#form'),
      $newTodo = $('#new-todo'),
      $todoList = $('#todo-list');

  app.Task = Backbone.Model.extend({

    idAttribute: '_id',

    defaults: {
      completed: false,
      active: true
    },

    create: function (title) {
      var self = this;
      self.set('title', title);

      app.tasks.add(this).save().done(function () {
        $todoList.prepend(taskTemplate(self.attributes));
        $newTodo[0].value='';
      });

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

  $form.on('submit', function (e) {
    e.preventDefault();
    var task = new app.Task();
    task.create($newTodo.val());
  });

  $todoList.on('click', 'input.toggle', function (e) {
    $(e.target).closest('li').toggleClass('completed');
    app.tasks.models[0].toggleComplete();
  });

  $todoList.on('click', 'button.destroy', function (e) {
    $(e.target).closest('li').addClass('hidden');
    app.tasks.models[0].delete();
  });

}());

