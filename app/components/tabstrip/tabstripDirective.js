'use strict';
function reActivate(event) {
  event.data.timeout(function () {
    $('html').unbind('click', reActivate);
    $('#' + event.data.scope.id + ' .btn-tab').removeClass('active');
    $('#' + event.data.scope.id + ' [type="' + event.data.state.params.type + '"]').addClass('active');
    $('html').bind('click', {
      state: event.data.state,
      scope: event.data.scope,
      timeout: event.data.timeout
    }, reActivate);
  });
}
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
        $('html').bind('click', {
          state: $state,
          scope: $scope,
          timeout: $timeout
        }, reActivate);
        $scope.activateTab = function (e) {
          $('#' + $scope.id + ' .btn-tab').removeClass('active');
          $(e.target).addClass('active');
        };
        var buttons = [];
        var html = '<div class="btn-group btn-group-tab" id="' + $scope.id + '" role="group"  layout="row">';
        $scope.data.forEach(function (btn) {
          if (btn.href) {
            buttons.push('<a class="btn btn-default btn-tab"  ng-href="' + btn.href + '" flex>' + btn.name + '</a>');
          } else if (btn.state && btn.type) {
            var href = window.getHref(templateAttrs.initial) + '/' + btn.type;
            buttons.push('<a class="btn btn-default btn-tab" type="' + btn.type + '" ng-click="activateTab($event)" href="'+href+'" flex>' + btn.name + '</a>');
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
