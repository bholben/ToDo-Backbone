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
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "  <li ";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.completed : depth0), {"name":"if","hash":{},"fn":this.program(2, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += " data-id=\""
    + escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"id","hash":{},"data":data}) : helper)))
    + "\">\n    <div class=\"view\">\n      <input class=\"toggle\" type=\"checkbox\" ";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.completed : depth0), {"name":"if","hash":{},"fn":this.program(4, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + ">\n      <label>"
    + escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"title","hash":{},"data":data}) : helper)))
    + "</label>\n      <button class=\"destroy\"></button>\n    </div>\n    <input class=\"edit\" value=\""
    + escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"title","hash":{},"data":data}) : helper)))
    + "\">\n  </li>\n";
},"2":function(depth0,helpers,partials,data) {
  return "class=\"completed\"";
  },"4":function(depth0,helpers,partials,data) {
  return "checked";
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, blockHelperMissing=helpers.blockHelperMissing, buffer = "\n";
  stack1 = blockHelperMissing.call(depth0, lambda(depth0, depth0), {"name":"this","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\n";
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

