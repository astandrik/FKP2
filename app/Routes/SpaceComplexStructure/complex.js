'use strict';
var breadcrumbs = require('../breadcrumbs.js');
var helpers = require('./spaceComplexHelper.js');

function findElemsInTree(treeLevel, id, type) {
  var elem = treeLevel.filter((node) =>{ return node.id == id && node.object_type == type; });
  if(elem.length == 0) return treeLevel.reduce((sum,curr) => sum.concat(findElemsInTree(curr.children, id, type)),[]);
  else return elem;
}

function prepareLaunch(launch) {
  return [{name: "Название", value: launch.name}, ...Object.keys(launch.starts).map(x => {return {name: x, value: launch.starts[x]};})];
}

var entity = {
  url: '/complex/:complexId?sectionType',
  views: {
    'complexInfo@home.spaceComplexStructure': {
      templateUrl: function templateUrl($stateParams, $scope) {
        var id = $stateParams.sectionId;
        var id2 = $stateParams.section2Id;
        var id3 = $stateParams.section3Id;
        return id3 ? 'app/Routes/SpaceComplexStructure/card/complex-card3.html'
               : id2 ? 'app/Routes/SpaceComplexStructure/card/complex-card2.html'
               : id ? 'app/Routes/SpaceComplexStructure/card/complex-card.html' : ''
      },
      controller: function controller($scope, treeData, $interpolate, complex, $stateParams, $complexDict, $state) {
        var id = $stateParams.sectionId;
        var id2 = $stateParams.section2Id;
        var id3 = $stateParams.section3Id;

        if(id) $scope.section = findElemsInTree(treeData, id, 2)[0];
        if(id2) $scope.section2 = findElemsInTree(treeData, id2, 2)[0];
        if(id3) $scope.section3 = findElemsInTree(treeData, id3, 2)[0];

        var complexId = $stateParams.complexId;
        if(id3) breadcrumbs.init($interpolate, 'complexSection3', $scope);
        if(id2) breadcrumbs.init($interpolate, 'complexSection2', $scope);
        if(id) breadcrumbs.init($interpolate, 'complexSection', $scope);
        $scope.complexFull = complex;
        $scope.launches = [
          complex,
          ...Object.keys(complex.starts_boosted).map(x => complex.starts_boosted[x]),
          ...Object.keys(complex.starts_staged).map(x => complex.starts_staged[x])
        ].map(prepareLaunch);
        $scope.tabstripData = [{
            name: 'Общие сведения',
            type: 'General'
        }, {
            name: 'Описание',
            type: 'Description'
        }, {
            name: 'Документы',
            type: 'Documents'
        }, {
            name: 'Связанные проекты',
            type: 'RelatedProjects'
        }, {
            name: 'События',
            type: 'Events'
        }].map((x) => Object.assign({}, x, {state: 'complexSection', params: [{name: 'sectionType', value: $stateParams.sectionType}]}));
      }

    }
  },
  ncyBreadcrumb: breadcrumbs.crumbs.complexSection,
  resolve: {
    treeData: function treeData($accordion) {
      return $accordion.getTree('data/spacetree').then(function (response) {
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
