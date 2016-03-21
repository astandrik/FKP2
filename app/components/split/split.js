function compile(templateElement, templateAttrs) {
  templateElement.attr('flex','');
  var left = $(templateElement.children()[0]);
  var right = $(templateElement.children()[1]);
  var leftSize, rightSize;
  var rightContents = right.html();
  [leftSize, rightSize] = [left.attr('size'), right.attr('size')];
  if(!leftSize) {
    throw('left split element must have attribute "size"');
  }
  if(!rightSize) {
    throw('right split element must have attribute "size"');
  }
  left.attr('flex', leftSize);
  left.removeAttr('size');  
  right.replaceWith('<md-content flex layout-padding>' + rightContents + '</md-content>');
  right.attr('flex', rightSize);
  right.removeAttr('size');

  templateElement.attr('layout', 'row');
}

module.exports = function() {
  return {
      scope: false,
      restrict: 'E',
      compile: compile
  }
}
