'use strict';

function reActivate(event) {
  $('html').unbind('click',reActivate);
  $('#' + event.data.scope.id + ' .btn-tab').removeClass('active');
  $('#' +  event.data.scope.id + ' [type="'+   event.data.state.params.type +'"]').addClass('active');
}
function tabstripDirective($compile, $state) {
  return {
    scope: { data: '=', id: '@' },
    compile: function compile(templateElement, templateAttrs) {
      return function ($scope) {
        $scope.getHref = $scope.$parent.getHref;
        $scope.getCurrentState = $scope.$parent.getCurrentState;
        $('html').bind('click', {state: $state, scope: $scope}, reActivate);

        $scope.activateTab = function(e) {
          $('#' + $scope.id + ' .btn-tab').removeClass('active');
          $(e.target).addClass('active');
        }
        var buttons = [];
        var html = '<div class="btn-group btn-group-tab" id="'+ $scope.id +'" role="group"  layout="row">';
        $scope.data.forEach(function (btn) {
          if (btn.href) {
            buttons.push('<a class="btn btn-default btn-tab"  ng-href="' + btn.href + '" flex>' + btn.name + '</a>');
          } else if (btn.state && btn.type) {
            buttons.push('<a class="btn btn-default btn-tab" type="' + btn.type + '" ng-click="activateTab($event)" ng-href="{{getHref(getCurrentEntityState(\''+btn.state+'\'), {type: \'' + btn.type + '\'})}}" flex>' + btn.name + '</a>');
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
        $('#' + $scope.id + ' .btn-tab').removeClass('active');
        $('#' + $scope.id + ' [type="'+  $state.params.type +'"]').addClass('active');
      };
    },
    controller: function() {
    }
  };
}
module.exports = tabstripDirective;
