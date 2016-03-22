'use strict';
function CD() {
  return {
    scope: { data: '=' },
    restrict: 'E',
    template: '<canvas id="bar" class="chart chart-bar"chart-data="data" chart-labels="labels"> chart-series="series" </canvas>',
    controller: function controller($scope) {
      $scope.labels = $scope.data.labels;
      $scope.series = $scope.data.series;
      $scope.data = $scope.data.data;
    }
  };
}
module.exports = CD;