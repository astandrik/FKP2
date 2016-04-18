'use strict';
var highlightNode = require('../components/accordion/treeBuilder.js').highlight;
function ProjectController($scope, dialogs, $projectFactory, $state, $timeout, treeData) {
  $scope.treeData = treeData;
  $scope.treeParams = [
    'id',
    'object_type',
    'section_id'
  ];
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
      if ($state.params.id) {
        highlightNode({
          id: $state.params.id,
          object_type: $state.params.object_type,
          section_id: $state.params.section_id
        }, $scope.treeParams);
      } else {
        highlightNode(-1, []);
      }
    });
  });
}
module.exports = ProjectController;
