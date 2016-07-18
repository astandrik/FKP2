'use strict';
var breadcrumbs = require('../breadcrumbs.js');
var section = {
  url: '/:type',
  views: {
    'complexSection': {
      templateUrl: function templateUrl($stateParams) {
        return 'app/Routes/SpaceComplexStructure/card/sections/' + $stateParams.type + '.html';
      },
      controller: function controller($stateParams, $scope, $interpolate) {
        var state = $stateParams;
        switch (state.type) {
        case 'general':
          $scope.sectionName = 'Общие сведения';
          break;
        case 'description':
          $scope.sectionName = 'Описание';
          break;
        case 'relatedProjects':
          $scope.sectionName = 'Связанные проекты';
          break;
        case 'events':
          $scope.sectionName = 'События';
          break;
        default:
          $scope.sectionName = 'Общие сведения';
          break;
        }
        breadcrumbs.init($interpolate, 'complexSection', $scope);
      }
    }
  },
  ncyBreadcrumb: breadcrumbs.crumbs.complexSectionSection
};
module.exports = section;
