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
        chartData: function ($chartService) {
          return $chartService.getData('testData/chart.json').then(function (data) {
            return data.data;
          });
        },
        pieData: function ($chartService1) {
          return $chartService1.getData('testData/pie.json').then(function (data) {
            return data.data;
          });
        },
        timeLineVerticalData: function($timelineService) {
          return $timelineService.getData('testData/timelineVertical.json').then((data) => {
            return data.data;
          });
        },
        timeLineHorizontalData: function($timelineService) {
          return $timelineService.getData('testData/timelineHorizontal.json').then((data) => {
            return data.data;
          });
        }
      }
    }
  },
  ncyBreadcrumb: { label: 'Дизайн-страница' }
};
