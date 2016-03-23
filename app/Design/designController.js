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
  $scope.tabstripData = [
    { name: 'Общие сведения' },
    { name: 'Результаты' },
    { name: 'Финансирование' },
    { name: 'Связанные проекты' },
    { name: 'События' }
  ];
  $scope.tabDocs = '\n\
  Has params href, type, name and state. \n\
  \n \
  name: label for button - must have, \n \
  \n \
  If href present - it is a direct href, other params ignored \n \
  state and type must present simultaneously: \n\
    1) state - name of nested state to be redirected to\n\
    2) type - parameter "type" that will be passed to that state\n\
'
}
module.exports = DesignController;
