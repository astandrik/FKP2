'use strict';
var breadcrumbs = require('../breadcrumbs.js');
var section = {
  url: '/:type',
  views: {
    'eventsSection': {
      templateUrl: function templateUrl($stateParams) {
        return 'app/Events/card/sections/'+  $stateParams.type + '.html';
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
        default:
          $scope.sectionName = 'Общие сведения';
          break;
        }
        breadcrumbs.init($interpolate, 'eventsSection', $scope);
      }
    }
  },
  ncyBreadcrumb: breadcrumbs.crumbs.eventsSection
};
module.exports = section;
