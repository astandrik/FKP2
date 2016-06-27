'use strict';
function buildTree() {
  var self = this;
  this.elementHtml = function (element, nested, paramList, specialDict) {
    nested = nested === undefined ? '' : nested;
    var hasChildren = element.children && element.children.length > 0;
    var elemId = paramList.reduce(function (sum, current) {
      return sum + current + element[current];
    }, 'node_');
    var special = '';
    for (var p in specialDict) {
      var row = p + '="';
      row += element[specialDict[p]].toString();
      row += '"';
      special += row + ' ';
    }
    return '<li><a layout="row" layout-align="space-between center" ' + (special ? special : '') + ' class="toggle ' + (!hasChildren ? 'fullWidth' : '') + '" id="' + elemId + '" href="' + element.href + '"><span>' + element.name + (hasChildren ? '</span><ng-md-icon class="toggleOpen" size=30 layout="column" layout-align="center center" icon="keyboard_arrow_right"></ng-md-icon></a>' : '') + nested + '</li>';
  };
  this.buildNode = function (root, paramList, specialDict) {
    var inner = '';
    if (root.children) {
      inner = '<ul class="inner">';
      root.children.forEach(function (item) {
        inner += self.buildNode(item, paramList, specialDict);
      });
      inner += '</ul>';
    } else {
      return self.elementHtml(root, null, paramList, specialDict);
    }
    return self.elementHtml(root, inner, paramList, specialDict);
  };
  return this;
}
function bindToggleEvents() {
  $('.toggle').click(function (e) {
    var $this = $(this);
    $('.toggle').removeClass('selected');
    $this.addClass('selected');
    var elemParent = $this.parent().parent().parent().children('a');
    while (elemParent.length > 0) {
      elemParent.addClass('selected');
      elemParent = elemParent.parent().parent().parent().children('a');  //  debugger;
    }
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
function highlightNode(node, paramList) {
  var elemId = paramList.reduce(function (sum, current) {
    return sum + current + node[current];
  }, 'node_');
  var elem = $('.accordion a#' + elemId);
  $('.accordion a').removeClass('selected');
  elem.addClass('selected');
  var elemParent = elem.parent().parent().parent().children('a');
  while (elemParent.length > 0) {
    elemParent.addClass('selected');
    elemParent.find('ng-md-icon>svg').addClass('show');
    elemParent = elemParent.parent().parent().parent().children('a');  //  debugger;
  }
  while (elem.parent().closest('.inner').length > 0) {
    elem = elem.parent().closest('.inner');
    elem.addClass('show');
  }
}
function highlightNodeById(nodeId) {
  var elemId = nodeId;
  var elem = $('.accordion a#' + elemId);
  $('.accordion a').removeClass('selected');
  elem.addClass('selected');
  var elemParent = elem.parent().parent().parent().children('a');
  while (elemParent.length > 0) {
    elemParent.addClass('selected');
    elemParent.find('ng-md-icon>svg').addClass('show');
    elemParent = elemParent.parent().parent().parent().children('a');  //  debugger;
  }
  while (elem.parent().closest('.inner').length > 0) {
    elem = elem.parent().closest('.inner');
    elem.addClass('show');
  }
}
module.exports = {
  treeHtml: new buildTree(),
  bind: bindToggleEvents,
  highlight: highlightNode,
  highlightById: highlightNodeById
};
