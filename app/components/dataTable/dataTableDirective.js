'use strict';

var _ = require('lodash');

function DTD() {
  return {
    scope: { data: '=', 'basename': '=' },
    restrict: 'E',
    template: '<div ui-grid="gridOptions" ng-style="{\'min-height\': minHeight}" class="grid"></div>',
    controller: function controller($scope, $filter) {
      var minRowsToShow = 5,
          rowHeight = 60;
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
        if($scope.basename) {
          var c = [$scope.basename].concat(b);
        } else {
          var c = b;
        }
        $scope.columns = [];
        var w = $(window).width();
        c.forEach(function(item){
          if(item == $scope.basename ) {
            if (w < 1370) {
              $scope.columns.push({
                field:item,
                minWidth: 100,
                maxWidth: 250,
                cellTemplate: '<div class="ui-grid-cell-contents">{{::row.entity[col.field]}}</div>'
              });
            } else {
              $scope.columns.push({
                field:item,
                minWidth: 180,
                maxWidth: 250,
                cellTemplate: '<div class="ui-grid-cell-contents">{{::row.entity[col.field]}}</div>'
              });
            }

          } else {
            $scope.columns.push({
              field:item,
              minwidth: 90,
              cellTemplate: '<div class="ui-grid-cell-contents">{{::row.entity[col.field]}}</div>'
            });
          }
        });
        $scope.gridData = data;
      }
      $scope.gridOptions = { data: $scope.gridData, columnDefs : $scope.columns, rowHeight: rowHeight,minimumColumnSize: 5,
        enableHorizontalScrollbar : 1,
        enableVerticalScrollbar : 1,
        rowTemplate: '<div>\
  ng-repeat="(colRenderIndex, col) in colContainer.cols track by col.uid"\
  ui-grid-one-bind-id-grid="rowRenderIndex + '-' + col.uid + \'-cell\'"\
  class="ui-grid-cell"\
  ng-class="{ \'ui-grid-row-header-cell\': ::col.isRowHeader }"\
  role="{{::col.isRowHeader ? \'rowheader\' : \'gridcell\'}}"\
  >\
</div>'
      //  autoResize :  $scope.columns
        }
    }
  };
}
module.exports = DTD;
