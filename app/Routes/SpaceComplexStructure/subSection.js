'use strict';
var breadcrumbs = require('../breadcrumbs.js');
function treeFind(root, id, type) {
  if (root.id == id && root.object_type == type) {
    return root;
  }
  for (var i = 0; i < root.children.length; i++) {
    var result = treeFind(root.children[i], id, type);
    if (result) {
      return result;
    }
  }
  return null;
}
var entity = {
  url: '/subsection/:subsectionId',
  views: {
    'complexInfo@home.spaceComplexStructure': {
      templateUrl: 'app/Routes/SpaceComplexStructure/card/subsection-card.html',
      controller: function controller($scope, treeData, $interpolate, $stateParams) {
        var id = $stateParams.sectionId;
        var subid = $stateParams.subsectionId;
        $scope.section = null;
        treeData.forEach(function (s) {
          if (s.id == id) {
            $scope.section = s;
          }
        });
        $scope.subSection = treeFind($scope.section, subid, 2);
        var initialState = 'home.spaceComplexStructure.spaceComplexSection.spaceComplexSubSection';
        var subState = 'home.spaceComplexStructure.spaceComplexSection';
        $scope.initialHref = window.getHref(initialState);
        $scope.subHref = window.getHref(subState);
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
  ncyBreadcrumb: breadcrumbs.crumbs.complexSubSection
};
module.exports = entity;
