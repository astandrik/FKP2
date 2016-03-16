function foo() {
    var self = this;
    this.elementHtml = function (element, nested) {
      nested = nested === undefined? '' : nested;
      return '<li><a layout="row" layout-align="space-between center" class="toggle" href="javascript:void(0);"><span>' +
       element.name + '</span><ng-md-icon size=30 layout="column" layout-align="center center" icon="keyboard_arrow_right"></ng-md-icon></a>'+nested +'</li>'
    };
    this.buildNode = function (root) {
      var inner = '';
      if(root.children) {
        inner = '<ul class="inner">';
        root.children.forEach(function(item) {
          inner += self.buildNode(item);
        });
        inner += '</ul>';
      } else {
        return  self.elementHtml(root)
      }
      return  self.elementHtml(root,inner);
    };
    return this;
};

module.exports = new foo();
