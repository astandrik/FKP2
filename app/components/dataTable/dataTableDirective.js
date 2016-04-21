'use strict';

var _ = require('lodash');

function DTD() {
  return {
    scope: { data: '=', 'basename': '=' },
    restrict: 'E',
    template: '<div ui-grid="gridOptions" ng-style="{\'min-height\': minHeight}" class="grid"></div>',
    controller: function controller($scope, $filter) {
      var minRowsToShow = 5,
          rowHeight = 70;
      $scope.minHeight = minRowsToShow > $scope.data.length ?  $scope.data.length * rowHeight + 30 + 'px' : minRowsToShow * rowHeight + 30 + 'px';
      var data = _.cloneDeep($scope.data);
      if( Object.prototype.toString.call(data ) === '[object Array]' ) {
        //Переводим всё в тип валюты.
        for (var i=0; i<data.length; i++) {
          for (var p in data[i]) {
            if(p != $scope.basename) {
              data[i][p] = $filter('currency')(data[i][p], '');
            }
          }
        }
        //Проходим по именам столбцов и сортируем годы
        var b = [];
        for (var p in data[0]) {
          if (isNaN(p) == false) {
            b.push(p);
          }
        };
        b.sort();
        //добавляем первый столбец и формируем окончательный список столбцов, который кладем в переменную $scope.columns
        var c = [$scope.basename].concat(b);
        $scope.columns = [];
        c.forEach(function(item){
          if(item == $scope.basename) {
            $scope.columns.push({
              field:item,
              minWidth: 250,
              pinnedLeft:true
            });
          } else {
            $scope.columns.push({
              field:item,
              width: 90
            });
          }
        });
        $scope.gridData = data;
      }
      $scope.gridOptions = { data: $scope.gridData, columnDefs : $scope.columns, rowHeight: rowHeight,minimumColumnSize: 5,
        enableHorizontalScrollbar : 1,
        enableVerticalScrollbar : 1}
    }
  };
}
module.exports = DTD;
