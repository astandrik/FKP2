var breadcrumbs = require('../breadcrumbs.js');


var entity = {
  url: '/section/:sectionId',
  views: {
    'complexInfo@home.spaceComplexStructure': {
      templateUrl: 'app/SpaceComplex/card/section-card.html',
      controller: function controller($scope, treeData,$interpolate, $stateParams) {
        var id =  $stateParams.sectionId;
        $scope.section = null;
        treeData.forEach((s) => {
          if(s.id == id) {
            $scope.section = s;
          }
        });
        $scope.sectionName =  $scope.section.name;
        var initialState = 'home.spaceComplexStructure.spaceComplexSection';
        $scope.initialHref = window.getHref(initialState);
      },
      resolve: {
        treeData: function treeData($accordion) {
          return $accordion.getTree('data/spacetree').then(function (response) {
            return response.data.data;
          });
        }
      }
    }
  },
  ncyBreadcrumb: breadcrumbs.crumbs.complexSection
}

module.exports = entity;
