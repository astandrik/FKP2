'use strict';
function DTD() {
  return {
    scope: { data: '=' },
    restrict: 'E',
    template: '<div ui-grid="{ data: gridData }" class="grid"></div>',
    controller: function controller($scope) {
      $scope.gridData = $scope.data;
    }
  };
}
module.exports = DTD;