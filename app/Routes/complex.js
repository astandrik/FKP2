'use strict';
var structure = {
  url: '/SpaceComplex',
  views: {
    'content@': {
      templateUrl: 'app/SpaceComplex/spaceComplex-page.html',
      controller: 'spaceComplexController',
      resolve: {
        treeData: function treeData($accordion) {
          return $accordion.getTree('data/tree').then(function (response) {
            return response.data;
          });
        }
      }
    }
  },
  ncyBreadcrumb: { label: 'Космические комплексы' }
};
var entity = {
  url: '/treeEntity?id',
  views: {
    'complexInfo': {
      templateUrl: 'app/SpaceComplex/card/complex-card.html',
      controller: function controller($scope, complex, timeLineVerticalData, pieData) {
        $scope.complex = complex;
        $scope.timeLineVerticalData = timeLineVerticalData;
        $scope.pieChartData = pieData;
        $scope.start = complex.chart.barLabels[0];
        $scope.end = complex.chart.barLabels[complex.chart.barLabels.length - 1];  //  debugger;
      },
      resolve: {
        complex: function project($http, $complex, $stateParams) {
          var id = $stateParams.id;
          return $complex.getById(id).then(function (data) {
            return data.data;
          });
        },
        timeLineVerticalData: function timeLineVerticalData($timelineService) {
          return $timelineService.getData('testData/timelineVertical.json').then(function (data) {
            return data.data;
          });
        },
        pieData: function pieData($chartService1) {
          return $chartService1.getData('testData/pie.json').then(function (data) {
            return data.data;
          });
        }
      }
    }
  },
  ncyBreadcrumb: { label: 'Комплекс {{project.code}}' }
};
var section = {
  url: '/tabSection?type',
  views: {
    'complexSection': {
      templateUrl: function templateUrl($stateParams) {
        switch ($stateParams.type) {
        case 'general':
          return 'app/SpaceComplex/card/sections/general.html';
          break;
        case 'description':
          return 'app/SpaceComplex/card/sections/description.html';
          break;
        case 'relatedProjects':
          return 'app/SpaceComplex/card/sections/relatedProjects.html';
          break;
        default:
          return 'app/SpaceComplex/card/sections/general.html';
        }
      },
      controller: function controller($stateParams, $scope) {
        var state = $stateParams;
        switch (state.type) {
        case 'general':
          $scope.sectionName = 'Общие сведения';
          break;
        case 'finance':
          $scope.sectionName = 'Финансирование';
          break;
        default:
          $scope.sectionName = 'Общие сведения';
          break;
        }
      }
    }
  },
  ncyBreadcrumb: { label: '{{sectionName}}' }
};
module.exports = {
  structure: structure,
  entity: entity,
  section: section
};