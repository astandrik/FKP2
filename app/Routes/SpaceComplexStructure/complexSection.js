'use strict';
var breadcrumbs = require('../breadcrumbs.js');
var section = {
  url: '/:type?sectionType',
  views: {
    'complexSection': {
      templateUrl: function templateUrl($stateParams) {
        return 'app/Routes/SpaceComplexStructure/card/sections/' +   $stateParams.sectionType  + $stateParams.type + '.html';
      },
      controller: function controller($stateParams, $scope, $interpolate) {
        var sectionDict = {
          General: 'Общие сведения',
          Description: 'Описание',
          Documents: 'Документы',
          RelatedProjects: 'Связанные проекты',
          Events: 'События'
        }
        $scope.sectionName = sectionDict[$stateParams.type];
        breadcrumbs.init($interpolate, 'complexSection', $scope);
      }
    }
  },
  ncyBreadcrumb: breadcrumbs.crumbs.complexSectionSection
};
module.exports = section;
