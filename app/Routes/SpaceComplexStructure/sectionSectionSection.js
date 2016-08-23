'use strict';

function findElemsInTree(treeLevel, id, type) {
  var elem = treeLevel.filter((node) =>{ return node.id == id && node.object_type == type; });
  if(elem.length == 0) return treeLevel.reduce((sum,curr) => sum.concat(findElemsInTree(curr.children, id, type)),[]);
  else return elem;
}

var breadcrumbs = require('../breadcrumbs.js');
var entity = {
  url: '/section/{section3Id:[0-9]*}',
  views: {
    'complexInfo@home.spaceComplexStructure': {
      templateUrl: 'app/Routes/SpaceComplexStructure/card/section-card.html',
      controller: function controller($scope, treeData, $interpolate, $stateParams) {
        var id3 = $stateParams.section3Id;
        var id = $stateParams.sectionId;
        var id2 = $stateParams.section2Id;
        $scope.section = findElemsInTree(treeData.data, id, 2)[0];
        $scope.section2 = findElemsInTree(treeData.data, id2, 2)[0];
        $scope.section3 = findElemsInTree(treeData.data, id3, 2)[0];
        $scope.childrenList = $scope.section3.children.map((item) => Object.assign({}, item, {type: item.object_type == 2 ? 'section' : 'complex', sectionType: item.sectionType}));
        var initialState = 'home.spaceComplexStructure.spaceComplexSection.spaceComplexSection.spaceComplexSection';
        $scope.initialHref = window.getHref(initialState);
      }
    }
  },
  ncyBreadcrumb: breadcrumbs.crumbs.spaceComplexSectionSectionSection
};
module.exports = entity;
