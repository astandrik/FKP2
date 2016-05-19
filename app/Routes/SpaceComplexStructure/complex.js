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
  url: '/complex/:complexId',
  views: {
    'complexInfo@home.spaceComplexStructure': {
      templateUrl: 'app/SpaceComplex/card/complex-card.html',
      controller: function controller($scope, treeData, $interpolate, complex, $stateParams, projectTreeData, $complexDict) {
        var id = $stateParams.sectionId;
        var subid = $stateParams.subsectionId;
        var complexid = $stateParams.complexId;
        $scope.section = null;
        treeData.forEach(function (s) {
          if (s.id == id) {
            $scope.section = s;
          }
        });
        $scope.subSection = treeFind($scope.section, subid, 2);
        $scope.complex = treeFind($scope.subSection, complexid, 3);
        breadcrumbs.init($interpolate, 'complex', $scope);
        var years = [];
        var launches = [];
        for (var e in complex.starts) {
          years.push(e);
          launches.push(complex.starts[e]);
        }
        $scope.years = years;
        $scope.launches = launches;
        var sumlaunches = 0;
        for (var i = 0; i < launches.length; i++) {
          sumlaunches = launches[i] + sumlaunches;
        }
        $scope.sumlaunches = sumlaunches;
        $scope.complexFull = complex;
      }
    }
  },
  ncyBreadcrumb: breadcrumbs.crumbs.complex,
  resolve: {
    treeData: function treeData($accordion) {
      return $accordion.getTree('data/spacetree').then(function (response) {
        return response.data.data;
      });
    },
    projectTreeData: function treeData($accordion) {
      return $accordion.getTree('data/tree').then(function (response) {
        return response.data.data;
      });
    },
    complex: function project($http, $complexFactory, $stateParams) {
      var id = $stateParams.complexId;
      return $complexFactory.getById(id).then(function (data) {
        return data.data.data;
      });
    }
  }
};
module.exports = entity;