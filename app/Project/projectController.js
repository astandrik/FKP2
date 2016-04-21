'use strict';
var highlightNode = require('../components/accordion/treeBuilder.js').highlight;
function ProjectController($scope, dialogs, $projectFactory, $state, $timeout, treeData) {
  $scope.treeData = treeData;
  $scope.treeParams = [
    'id',
    'object_type',
    'section_id'
  ];
  $scope.specialDict = {
    type: 'object_type'
  };
  $scope.create_popup = function () {
    var data = {
      name: 'МЧС',
      responsible: 'Иванов И.И.',
      tel: '222-33-22'
    };
    var dlg = dialogs.create('app/components/popup/popup.html', 'popupController', data, {
      size: 'sm',
      animation: true
    });
  };
  $scope.$on('$viewContentLoaded', function (event) {
    $timeout(function () {
      if($state.params.projectId) {
        highlightNode({
          id: $state.params.projectId,
          object_type: 0,
          section_id: $state.params.sectionId
        }, $scope.treeParams);
      } else if ($state.params.subsectionId) {
        highlightNode({
          id: $state.params.subsectionId,
          object_type: 1,
          section_id: $state.params.sectionId
        }, $scope.treeParams);
      }  else if ($state.params.sectionId) {
        highlightNode({
          id: $state.params.sectionId,
          object_type: 2,
          section_id: $state.params.sectionId
        }, $scope.treeParams);
      } else {
        highlightNode(-1, []);
      }
    });
  });
}
module.exports = ProjectController;
