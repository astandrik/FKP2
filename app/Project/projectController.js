'use strict';
var highlightNode = require('../components/accordion/treeBuilder.js').highlight;
function ProjectController($scope, dialogs, $projectFactory, $state, $timeout, treeData) {
  $scope.treeData = treeData;

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

  $scope.tabstripData = [
    {
      name: 'Общие сведения',
      state: 'projectSection',
      type: 'general'
    },
    {
      name: 'Результаты',
      state: 'projectSection',
      type: 'results'
    },
    { name: 'Финансирование',
      state: 'projectSection',
      type: 'finance'
    },
    {
      name: 'Связанные проекты',
      state: 'projectSection',
      type: 'relatedProjects'  },

    {
      name: 'События',
      state: 'projectSection',
      type: 'relatedProjects' }
  ];
  $scope.$on('$viewContentLoaded', function (event) {
    $timeout(function () {
      if ($state.params.id) {
        highlightNode($state.params.id, $state.params.eType);
      } else {
        highlightNode(-1);
      }
    });
  });
}
module.exports = ProjectController;
