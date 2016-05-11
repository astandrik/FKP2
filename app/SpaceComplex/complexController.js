'use strict';
var highlightNode = require('../components/accordion/treeBuilder.js').highlight;
function CC($scope, treeData, dialogs,$timeout,$state) {
  $scope.treeData = treeData;
  $scope.treeParams = [
    'id',
    'object_type'
  ];
  $scope.specialDict = {
    type: 'object_type'
  };
  $scope.tabstripData = [
    {
      name: 'Общие сведения',
      state: 'complexSection',
      type: 'general'
    },
    {
      name: 'Описание',
      state: 'complexSection',
      type: 'description'
    },
    {
      name: 'Связанные проекты',
      state: 'complexSection',
      type: 'relatedProjects'
    }
  ];
  $scope.$on('$viewContentLoaded', function (event) {
    $timeout(function () {
      if($state.params.complexId) {
       highlightNode({
         id: $state.params.complexId,
         object_type: 3,
       }, $scope.treeParams);
     }
      else if($state.params.subsectionId) {
        highlightNode({
          id: $state.params.subsectionId,
          object_type: 2,
        }, $scope.treeParams);
      } else if ($state.params.sectionId) {
        highlightNode({
          id: $state.params.sectionId,
          object_type: 1
        }, $scope.treeParams);
      } else {
        highlightNode(-1, []);
      }
    });
  });
}
module.exports = CC;
