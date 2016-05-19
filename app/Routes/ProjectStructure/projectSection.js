'use strict';
var breadcrumbs = require('../breadcrumbs.js');
var section = {
  url: '/:type',
  views: {
    'projectSection': {
      templateUrl: function templateUrl($stateParams) {
        return 'app/Project/card/sections/' + $stateParams.sectionId + $stateParams.type + '.html';
      },
      controller: function controller($stateParams, $scope, $interpolate) {
        var state = $stateParams;
        switch (state.type) {
        case 'general':
          $scope.sectionName = 'Общие сведения';
          break;
        case 'results':
          $scope.sectionName = 'Результаты';
          break;
        case 'finance':
          $scope.sectionName = 'Финансирование';
          break;
        case 'events':
          $scope.sectionName = 'События';
          break;
        case 'relatedProjects':
          $scope.sectionName = 'Связанные проекты';
          break;
        default:
          $scope.sectionName = 'Общие сведения';
          break;
        }
        breadcrumbs.init($interpolate, 'projectSection', $scope);
      }
    }
  },
  ncyBreadcrumb: breadcrumbs.crumbs.projectSection
};
module.exports = section;