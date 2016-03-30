'use strict';
function DesignController($timeout, $scope, dialogs, $dataTableService, gridData, chartData, pieData) {
  $scope.treeData = {};
  $timeout(function() {
    var data = [];
    var options = {
            "width":  "100%",
            "height": "300px",
            "style": "box",
            showCurrentTime: false
          };
    data.push({
      'start': new Date(2010, 7, 15),
      'end': new Date(2010, 8, 2),  // end is optional
      'content': 'Trajectory A'
      // Optional: a field 'group'
      // Optional: a field 'className'
      // Optional: a field 'editable'
    });

    var timeline = new links.Timeline(document.getElementById('mytimeline'));

// Draw our timeline with the created data and options
    timeline.draw(data, options);
  });
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
  $scope.barChartData = chartData;
  $scope.pieChartData = pieData;
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
