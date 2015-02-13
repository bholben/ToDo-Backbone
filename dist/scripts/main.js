(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['footer'] = template({"1":function(depth0,helpers,partials,data) {
  return "class=\"selected\"";
  },"3":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<button id=\"clear-completed\">Clear completed ("
    + escapeExpression(((helper = (helper = helpers.completedTodos || (depth0 != null ? depth0.completedTodos : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"completedTodos","hash":{},"data":data}) : helper)))
    + ")</button>";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "\n<span id=\"todo-count\"><strong>"
    + escapeExpression(((helper = (helper = helpers.activeTodoCount || (depth0 != null ? depth0.activeTodoCount : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"activeTodoCount","hash":{},"data":data}) : helper)))
    + "</strong> "
    + escapeExpression(((helper = (helper = helpers.activeTodoWord || (depth0 != null ? depth0.activeTodoWord : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"activeTodoWord","hash":{},"data":data}) : helper)))
    + " left</span>\n<ul id=\"filters\">\n  <li>\n    <a ";
  stack1 = ((helpers.eq || (depth0 && depth0.eq) || helperMissing).call(depth0, (depth0 != null ? depth0.filter : depth0), "all", {"name":"eq","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  buffer += " href=\"#/all\">All</a>\n  </li>\n  <li>\n    <a ";
  stack1 = ((helpers.eq || (depth0 && depth0.eq) || helperMissing).call(depth0, (depth0 != null ? depth0.filter : depth0), "active", {"name":"eq","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  buffer += "href=\"#/active\">Active</a>\n  </li>\n  <li>\n    <a ";
  stack1 = ((helpers.eq || (depth0 && depth0.eq) || helperMissing).call(depth0, (depth0 != null ? depth0.filter : depth0), "completed", {"name":"eq","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  buffer += "href=\"#/completed\">Completed</a>\n  </li>\n</ul>\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.completedTodos : depth0), {"name":"if","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\n\n";
},"useData":true});
templates['task'] = template({"1":function(depth0,helpers,partials,data) {
  return "class=\"completed\"";
  },"3":function(depth0,helpers,partials,data) {
  return "checked";
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "\n<li ";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.completed : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += " data-id=\""
    + escapeExpression(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"_id","hash":{},"data":data}) : helper)))
    + "\">\n  <div class=\"view\">\n    <input class=\"toggle\" type=\"checkbox\" ";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.completed : depth0), {"name":"if","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + ">\n    <label>"
    + escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"title","hash":{},"data":data}) : helper)))
    + "</label>\n    <button class=\"destroy\"></button>\n  </div>\n  <input class=\"edit\" value=\""
    + escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"title","hash":{},"data":data}) : helper)))
    + "\">\n</li>\n\n";
},"useData":true});
})();

var uuid = function () {
  var i, random;
  var uuid = '';

  for (i = 0; i < 32; i++) {
    random = Math.random() * 16 | 0;
    if (i === 8 || i === 12 || i === 16 || i === 20) {
      uuid += '-';
    }
    uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random)).toString(16);
  }

  return uuid;
};



var app = {};

(function () {
  'use strict';

  ////////////////////////////////// MODEL //////////////////////////////////

  // Create Task model
  app.Task = Backbone.Model.extend({

    idAttribute: '_id',

    defaults: { completed: false },

    create: function (title) {
      this.set('title', title);
      app.tasks.add(this).save().done(renderNewTask.bind(this));
    },

    toggle: function () {
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
    url: 'http://tiy-atl-fe-server.herokuapp.com/collections/bobs_backbone_tasks'
  });

  // Create tasks collection instance
  app.tasks = new app.Tasks();
  // Load in any existing server models
  app.tasks.fetch();


  ////////////////////////////////// CONTROL //////////////////////////////////

  function targetTask(e) {
    var $li = $(e.target).closest('li'),
        targetID = $li.attr('data-id'),
        model = app.tasks.findWhere({_id: targetID});
    return {$li: $li, model: model};
  }

  var control = {

    create: function (e) {
      e.preventDefault();
      var title = $newTask.val();
      if (title) {
        // Create a new model (local and server) & update the view
        var task = new app.Task();
        task.create(title);
      }
    },

    toggle: function (e) {
      // Target specific task
      var task = targetTask(e);
      // Update the model (local and server)
      task.model.toggle();
      // Update the view
      task.$li.toggleClass('completed');
    },

    delete: function (e) {
      // Target specific task
      var task = targetTask(e);
      // Update the model (local and server)
      task.model.delete();
      // Update the view
      task.$li.addClass('hidden');
    }
  };


  ////////////////////////////////// VIEW //////////////////////////////////

  // Cache html elements
  var taskTemplate = Handlebars.templates.task,
      $form = $('#form'),
      $newTask = $('#new-task'),
      $taskList = $('#task-list');

  // Render the new task at the top of the list and clear the input box
  function renderNewTask(obj) {
    $taskList.prepend(taskTemplate(obj));
    $newTask[0].value='';
  }

  // Bind events
  $form.on('submit', control.create.bind(this));
  $taskList.on('click', 'input.toggle', control.toggle.bind(this));
  $taskList.on('click', 'button.destroy', control.delete.bind(this));

}());

