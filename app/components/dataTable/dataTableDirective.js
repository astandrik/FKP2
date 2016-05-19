'use strict';
var _ = require('lodash');
function DTD() {
  return {
    scope: {
      data: '=',
      'basename': '=',
      needLinks: '=',
      'linkBlocker': '@',
      'gridHeight': '@',
      'needAllCount':'@',
      'fitContent':'@'
    },
    restrict: 'E',
    template: '<div ui-grid="gridOptions" ui-grid-pinning ng-style="{\'min-height\': minHeight, height: gridHeight}" class="grid"></div>',
    controller: function controller($scope, $filter, $projectsDict, $timeout) {
      var minRowsToShow = 4, rowHeight = 100;
      $scope.minHeight = minRowsToShow > $scope.data.length ? ($scope.data.length * rowHeight + 30) + 'px' : (minRowsToShow * rowHeight + 30) + 'px';
      var data = _.cloneDeep($scope.data);
      if (Object.prototype.toString.call(data) === '[object Array]') {
        if($scope.needAllCount) {
          data.forEach((row)=> {
            var count = 0;
            for(var e in row) {
              if(!isNaN(row[e])) {
                count += parseFloat(row[e]);
              }
            }
            row["Всего"] = count;
          });
        }
        //Переводим всё в тип валюты.
        for (var i = 0; i < data.length; i++) {
          for (var p in data[i]) {
            if (p != $scope.basename) {
              data[i][p] = $filter('currency')(data[i][p], '');
            }
          }
        }
        //Проходим по именам столбцов и сортируем годы
        var b = [];
        var others = [];
        if($scope.fitContent) {
          $scope.gridHeight = (rowHeight * $scope.data.length + 59) + 'px';
        }
        for (var p in data[0]) {
          if (isNaN(p) == false) {
            b.push(p);
          } else {
            if (p != $scope.basename) {
              others.push(p);
            }
          }
        }
        ;
        b.sort();
        //добавляем первый столбец и формируем окончательный список столбцов, который кладем в переменную $scope.columns
        if ($scope.basename) {
          var c = [$scope.basename].concat(b);
        } else {
          var c = b;
        }
        $scope.getProjectHrefByName = function (name) {
          return $projectsDict.dict[name].href;
        };
        $scope.getCachingInfoByName = (name) => {return {cacheType: ($projectsDict.dict[name] ? $projectsDict.dict[name].cacheType : null),
        elementId:  ($projectsDict.dict[name] ? $projectsDict.dict[name].elementId : null)}};
        c = c.concat(others);
        $scope.columns = [];
        var w = $(window).width();
        c.forEach(function (item) {
          if (item == $scope.basename) {
            var ctmplt = '<div class="ui-grid-cell-contents">{{::row.entity[col.field]}}</div>';
            if ($scope.needLinks) {
              if($scope.linkBlocker) {
                ctmplt = '<a cacheType={{::grid.appScope.getCachingInfoByName(row.entity[col.field]).cacheType}} elementId={{::grid.appScope.getCachingInfoByName(row.entity[col.field]).elementId}} ng-hide="::grid.appScope.getProjectHrefByName(row.entity[col.field]).indexOf(\''+$scope.linkBlocker+'\') > -1"\
                ng-href={{::grid.appScope.getProjectHrefByName(row.entity[col.field])}}><div class="ui-grid-cell-contents">{{::row.entity[col.field]}}</div></a>\
                <div ng-hide="::grid.appScope.getProjectHrefByName(row.entity[col.field]).indexOf(\''+$scope.linkBlocker+'\') == -1" class="ui-grid-cell-contents">{{::row.entity[col.field]}}</div>';
              } else {
                ctmplt = '<a cacheType={{::grid.appScope.getCachingInfoByName(row.entity[col.field]).cacheType}} elementId={{::grid.appScope.getCachingInfoByName(row.entity[col.field]).elementId}} ng-href={{::grid.appScope.getProjectHrefByName(row.entity[col.field])}}><div class="ui-grid-cell-contents">{{::row.entity[col.field]}}</div></a>';
              }
            }
            if (w < 1370) {
              $scope.columns.push({
                field: item,
                minWidth: 100,
                maxWidth: 250,
                cellTemplate: ctmplt,
                pinnedLeft:true
              });
            } else {
              $scope.columns.push({
                field: item,
                minWidth: 230,
                maxWidth: 250,
                cellTemplate: ctmplt,
                pinnedLeft:true
              });
            }
          } else {
            $scope.columns.push({
              field: item,
              minWidth: 100,
              cellTemplate: '<div class="ui-grid-cell-contents">{{::row.entity[col.field]}}</div>'
            });
          }
        });
        $scope.gridData = data;
      }
      $scope.gridOptions = {
        onRegisterApi: function( gridApi ) {
          $scope.gridApi = gridApi;
          $timeout(()=>$scope.gridApi.core.handleWindowResize(),500);

},
        data: $scope.gridData,
        columnDefs: $scope.columns,
        rowHeight: rowHeight,
        minimumColumnSize: 5,
        enableHorizontalScrollbar: 0,
        enableVerticalScrollbar: 1,
        enableSorting: false,
        rowTemplate: ' <div  ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid"  ui-grid-one-bind-id-grid="rowRenderIndex + \'-\' + col.uid + \'-cell\'"  class="ui-grid-cell"  ng-class="::{ \'ui-grid-row-header-cell\': col.isRowHeader }"  role="{::{col.isRowHeader ? \'rowheader\' : \'gridcell\'}}"  ui-grid-cell></div>'  //  autoResize :  $scope.columns
      };
    }
  };
}
module.exports = DTD;
