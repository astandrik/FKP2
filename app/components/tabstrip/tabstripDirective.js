'use strict';
function tabstripDirective($compile, $state) {
  return {
    scope: { data: '=' },
    compile: function compile(templateElement, templateAttrs) {
      return function ($scope) {
        $scope.getHref = $scope.$parent.getHref;
        $scope.getCurrentState = $scope.$parent.getCurrentState;
        var buttons = [];
        var html = '<div class="btn-group" role="group"  layout="row">';
        $scope.data.forEach(function (btn) {
          if (btn.href) {
            buttons.push('<a class="btn btn-default btn-tab"  ng-href="' + btn.href + '" flex>' + btn.name + '</a>');
          } else if (btn.state && btn.type) {
            buttons.push('<a class="btn btn-default btn-tab" ng-href="{{getHref(getCurrentEntityState(\''+btn.state+'\'), {type: \'' + btn.type + '\'})}}" flex>' + btn.name + '</a>');
          } else {
            buttons.push('<a class="btn btn-default btn-tab" flex>' + btn.name + '</a>')
          }
        });
        html += buttons.join('');
        html += '</div>';
        $scope.getCurrentEntityState = function (stateName) {
          var state = $scope.getCurrentState();
          return state.indexOf(stateName) > -1 ? state : state + '.'+stateName;
        };
        var compiled = $compile(html)($scope);
        templateElement.replaceWith(compiled);
      };
    }
  };
}
module.exports = tabstripDirective;
