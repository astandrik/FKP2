var utils = function() {
  var elem = {
    elementHtml: function (element, nested) {
      nested = nested === undefined? '' : nested;
      return '<li> <a class="toggle" href="javascript:void(0);">' + element.name + '</a>'+nested +'</li>'
    },
    buildNode: function (root) {
      var inner = '';
      if(root.children) {
        inner = '<ul class="inner">';
        root.children.forEach(function(item) {
          inner += elem.buildNode(item);
        });
        inner += '</ul>';
      } else {
        return  elem.elementHtml(root)
      }
      return  elem.elementHtml(root,inner);
    }
  };
  return elem;
}();

module.exports = utils;