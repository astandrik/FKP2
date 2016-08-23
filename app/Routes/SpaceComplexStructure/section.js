'use strict';

function findElemsInTree(treeLevel, id, type) {
  var elem = treeLevel.filter((node) =>{ return node.id == id && node.object_type == type; });
  if(elem.length == 0) return treeLevel.reduce((sum,curr) => sum.concat(findElemsInTree(curr.children, id, type)),[]);
  else return elem;
}

var breadcrumbs = require('../breadcrumbs.js');
var entity = {
  url: '/section/{sectionId:[0-9]*}',
  views: {
    'complexInfo@home.spaceComplexStructure': {
      templateUrl: 'app/Routes/SpaceComplexStructure/card/section-card.html',
      controller: function controller($scope, treeData, $interpolate, $stateParams) {
        var id = $stateParams.sectionId;
        $scope.section = findElemsInTree(treeData.data, id, 2)[0];
        $scope.childrenList = $scope.section.children.map((item) => Object.assign({}, item, {type: item.object_type == 2 ? 'section' : 'complex', sectionType: item.sectionType}));
        var initialState = 'home.spaceComplexStructure.spaceComplexSection';
        $scope.initialHref = window.getHref(initialState);
      }
    }
  },
  ncyBreadcrumb: breadcrumbs.crumbs.spaceComplexSection
};
module.exports = entity;
