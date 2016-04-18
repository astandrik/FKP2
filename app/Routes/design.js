'use strict';
module.exports = {
  url: '/Design',
  views: {
    'content@': {
      templateUrl: 'app/Design/design-page.html',
      controller: 'DesignController',
      resolve: {
        gridData: function gridData($dataTableService) {
          return $dataTableService.getTable('testData/tableData.json').then(function (data) {
            return data.data;
          });
        },
        chartData: function chartData($chartService) {
          return $chartService.getData('testData/chart.json').then(function (data) {
            return data.data;
          });
        },
        pieData: function pieData($chartService1) {
          return $chartService1.getData('testData/pie.json').then(function (data) {
            return data.data;
          });
        },
        timeLineVerticalData: function timeLineVerticalData($timelineService) {
          return $timelineService.getData('testData/timelineVertical.json').then(function (data) {
            return data.data;
          });
        },
        timeLineHorizontalData: function timeLineHorizontalData($timelineService) {
          return $timelineService.getData('testData/timelineHorizontal.json').then(function (data) {
            return data.data;
          });
        }
      }
    }
  },
  ncyBreadcrumb: { label: 'Дизайн-страница' }
};