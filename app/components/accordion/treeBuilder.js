'use strict';
function buildTree() {
  var self = this;
  this.elementHtml = function (element, nested) {
    nested = nested === undefined ? '' : nested;
    return '<li><a layout="row" layout-align="space-between center" class="toggle" id="node_' + element.id + '" ng-href=" {{getHref(getCurrentEntityState(), {id: ' + element.id + '})}}"><span>' + element.name + '</span><ng-md-icon class="toggleOpen" size=30 layout="column" layout-align="center center" icon="keyboard_arrow_right"></ng-md-icon></a>' + nested + '</li>';
  };
  this.buildNode = function (root) {
    var inner = '';
    if (root.children) {
      inner = '<ul class="inner">';
      root.children.forEach(function (item) {
        inner += self.buildNode(item);
      });
      inner += '</ul>';
    } else {
      return self.elementHtml(root);
    }
    return self.elementHtml(root, inner);
  };
  return this;
}
function bindToggleEvents() {
  $('.toggle').click(function (e) {
    var $this = $(this);
    $('.toggle').removeClass('selected');
    $this.addClass('selected');
  });
  $('.toggleOpen').click(function (e) {
    e.preventDefault();
    var $this = $(this).parent();
    if ($this.next().hasClass('show')) {
      if ($this.next().length) {
        $this.find('ng-md-icon>svg').removeClass('show');
      }
      $this.next().slideUp(200, function () {
        $this.next().removeClass('show');
      });
    } else {
      if ($this.next().length) {
        $this.find('ng-md-icon>svg').addClass('show');
      }
      $this.next().slideDown(200, function () {
        $this.next().addClass('show');
      });
    }
  });
}
function highlightNode(id) {
  var elem = $('.accordion a#node_' + id);
  $('.accordion a').removeClass('selected');
  elem.addClass('selected');
  while (elem.parent().closest('.inner').length > 0) {
    elem = elem.parent().closest('.inner');
    elem.addClass('show');
  }
}
module.exports = {
  treeHtml: new buildTree(),
  bind: bindToggleEvents,
  highlight: highlightNode
};