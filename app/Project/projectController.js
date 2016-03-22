'use strict';
var highlightNode = require('../components/accordion/treeBuilder.js').highlight;
function ProjectController($scope, dialogs, $projectFactory, $state, $timeout) {
  $scope.treeData = {};
  $scope.treeData.url = 'testData/data.json';
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
        highlightNode($state.params.id);
      } else {
        highlightNode(-1);
      }
    });
  });
}
module.exports = ProjectController;