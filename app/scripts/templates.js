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