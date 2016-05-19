'use strict';
function CD($timeout, $compile) {
  return {
    scope: { data: '=' },
    restrict: 'E',
    compile: function compile(templateElement, templateAttrs) {
      return {
        pre: function pre($scope) {
          window.Chart.defaults.global.colours = [
            '#4997cd',
            '#d76e00'
          ];
          $scope.labels = $scope.data.barLabels;
          $scope.series = $scope.data.barSeries;
          $scope.chartData = $scope.data.barData;
          var template = '<canvas id="bar" class="chart chart-bar chartFullWidth" chart-data="chartData" chart-labels="labels" chart-series="series":></canvas>';
          $timeout(function () {
            templateElement.replaceWith($compile(template)($scope));
          });
        }
      };
    }
  };
}
function CD1($timeout, $compile) {
  return {
    scope: { data: '=' },
    restrict: 'E',
    compile: function compile(templateElement, templateAttrs) {
      return {
        pre: function pre($scope) {
          $scope.labels = $scope.data.pieLabels;
          $scope.chartData = $scope.data.pieData;
          var template = '<canvas id="pie" class="chart chart-pie chartFullWidth" chart-legend="true" chart-data="chartData" chart-labels="labels"></canvas> ';
          $timeout(function () {
            templateElement.replaceWith($compile(template)($scope));
          });
        }
      };
    }
  };
}
module.exports = {
  barChart: CD,
  pieChart: CD1
};