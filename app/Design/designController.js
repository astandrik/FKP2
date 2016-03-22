'use strict';
function DesignController($scope, dialogs, $dataTableService, gridData, chartData) {
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
  $scope.tableData = gridData;
  $scope.chartData = chartData;
}
module.exports = DesignController;