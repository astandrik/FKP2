'use strict';
var treeBuilder = require('./treeBuilder.js').treeHtml;
var bindToggleEvents = require('./treeBuilder.js').bind;
module.exports = function ($compile, $accordion, $state) {
  return {
    scope: {
      data: '=',
      params: '='
    },
    compile: function compile(templateElement, templateAttrs) {
      return {
        pre: function pre($scope) {
          $scope.getHref = $scope.$parent.getHref;
          $scope.getCurrentState = $scope.$parent.getCurrentState;
          var paramList = $scope.params;
          $scope.getCurrentEntityState = function () {
            var state = $scope.getCurrentState();
            return state.indexOf('treeEntity') > -1 ? state.slice(0, state.indexOf('treeEntity') + 'treeEntity'.length) : state + '.treeEntity';
          };
          var treeData = $scope.data;
          templateAttrs.timeout === undefined ? 400 : parseint(templateAttrs.timeout);
          var html = '<div  class="accordionTree">  <ul class="accordion">';
          var elements = [];
          if (!treeData.data) {
            throw 'define data attribute for tree';
          }
          treeData.data.forEach(function (item) {
            elements.push(treeBuilder.buildNode(item, paramList));
          });
          var treeHtml = html + elements.join('') + '</ul></div>';
          templateElement.replaceWith($compile(treeHtml)($scope));
          bindToggleEvents();
        }
      };
    },
    controller: function controller($scope) {
    }
  };
};
