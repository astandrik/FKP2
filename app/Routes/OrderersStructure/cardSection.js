'use strict';
var breadcrumbs = require('../breadcrumbs.js');
var section = {
  url: '/:type',
  views: {
    'orderersSection': {
      templateUrl: function templateUrl($stateParams) {
        return 'app/Routes/OrderersStructure/card/sections/'+  $stateParams.type + '.html';
      },
      controller: function controller($stateParams, $scope, $interpolate) {
        var state = $stateParams;
        switch (state.type) {
        case 'general':
          $scope.sectionName = 'Общие сведения';
          break;
        case 'relatedProjects':
          $scope.sectionName = 'Связанные проекты';
          break;
        case 'contacts':
          $scope.sectionName = 'Контактные данные';
          break;
        default:
          $scope.sectionName = 'Общие сведения';
          break;
        }
        breadcrumbs.init($interpolate, 'orderersSection', $scope);
      }
    }
  },
  ncyBreadcrumb: breadcrumbs.crumbs.orderersSection
};
module.exports = section;
