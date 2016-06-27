'use strict';
function tabstripDirective($compile, $state, $timeout) {
  return {
    scope: {
      data: '=',
      id: '@'
    },
    compile: function compile(templateElement, templateAttrs) {
      return function ($scope) {
        $scope.getHref = $scope.$parent.getHref;
        $scope.getCurrentState = $scope.$parent.getCurrentState;
        $scope.activateTab = function (e) {
          $('#' + $scope.id + ' .btn-tab').removeClass('active');
          $(e.target).addClass('active');
          $timeout(() => $scope.$digest(), 1000);
        };
        var buttons = [];
        var html = '<div class="btn-group btn-group-tab" id="' + $scope.id + '" role="group"  layout="row">';
        $scope.data.forEach(function (btn) {
          if (btn.href) {
            buttons.push('<a class="btn btn-default btn-tab"  ng-href="' + btn.href + '" flex>' + btn.name + '</a>');
          } else if (btn.state && btn.type) {
            var href = window.getHref(templateAttrs.initial) + '/' + btn.type;
            buttons.push('<a class="btn btn-default btn-tab" type="' + btn.type + '" ng-click="activateTab($event)" href="' + href + '" flex>' + btn.name + '</a>');
          } else {
            buttons.push('<a class="btn btn-default btn-tab" flex>' + btn.name + '</a>');
          }
        });
        html += buttons.join('');
        html += '</div>';
        var compiled = $compile(html)($scope);
        templateElement.replaceWith(compiled);
        $('#' + $scope.id + ' .btn-tab').removeClass('active');
        $('#' + $scope.id + ' [type="' + $state.params.type + '"]').addClass('active');
      };
    },
    controller: function controller() {
    }
  };
}
module.exports = tabstripDirective;
