'use strict';
function CD() {
  return {
    scope: { data: '=' },
    restrict: 'E',
    template: '<canvas id="bar" class="chart chart-bar"chart-data="chartData" chart-labels="labels"> chart-series="series" </canvas>',
    controller: function controller($scope) {
      $scope.labels = $scope.data.labels;
      $scope.series = $scope.data.series;
      $scope.chartData = $scope.data.data;
    }
  };
}
module.exports = CD;