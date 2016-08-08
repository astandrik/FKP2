'use strict';
var _ = require('lodash');
var numberSorting = require('./numberSorting.js');

function toggleHover($timeout) {
    $timeout(()=> {
    $('.ui-grid-row').hover(
      (e) => {
      var el = $(e.currentTarget);
      if(el) {
        var pinnedContainer = $(el).closest('.ui-grid-contents-wrapper').find('.ui-grid-pinned-container');
        var gridContainer = pinnedContainer.next();
        var closestContainer = $(el).closest('.ui-grid-render-container');
        var index = findRowIndex(el,closestContainer.find('.ui-grid-row'));
        if(index >-1) $(pinnedContainer.find('div.ui-grid-row').get(index)).addClass('active');
        if(index >-1) $(gridContainer.find('div.ui-grid-row').get(index)).addClass('active');
      }
    },
      (e) => {
        var el = $(e.currentTarget);
        if(el) {
          var pinnedContainer = $(el).closest('.ui-grid-contents-wrapper').find('.ui-grid-pinned-container');
          var gridContainer = pinnedContainer.next();
          var closestContainer = $(el).closest('.ui-grid-render-container');
          var index = findRowIndex(el,closestContainer.find('.ui-grid-row'));
          if(index >-1) $(pinnedContainer.find('div.ui-grid-row').get(index)).removeClass('active');
          if(index >-1) $(gridContainer.find('div.ui-grid-row').get(index)).removeClass('active');
        }
      })
  });
}

function adjustHeights ($timeout) {
    $timeout(()=> {
      var pinnedContainers = $('.ui-grid-contents-wrapper').find('.ui-grid-pinned-container');
      pinnedContainers.toArray().forEach((cont)=> {
        var closestContainer = $(cont);
        var gridContainer = closestContainer.next();
        var elements = gridContainer.find('.ui-grid-row');

        elements.toArray().forEach((item) => {
            var index = findRowIndex($(item),gridContainer.find('.ui-grid-row'));
            if(index > -1) {
              var curHeight = $(closestContainer.find('.ui-grid-row').get(index)).find('.ui-grid-cell-contents:first').height();
              $(gridContainer.find('.ui-grid-row').get(index)).find('.ui-grid-cell-contents').height(curHeight);
            }
        });

      })
    });
}

function findRowIndex(el,rows) {
        return rows.index($(el));
      }


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
    template: '<div ui-grid="gridOptions" ui-grid-pinning ng-style="{\'min-height\': minHeight, height: gridHeight}" class="grid financeGrid"></div>',
    controller: function controller($scope, $filter, $projectsDict, $timeout) {
      toggleHover($timeout);
      var minRowsToShow = 4, rowHeight = 100;
      $scope.minHeight = minRowsToShow > $scope.data.length ? ($scope.data.length * rowHeight + 30) + 'px' : (minRowsToShow * rowHeight + 30) + 'px';

      var showVerticalScroll = $scope.data.length > 3 ? 1 : 0;
      var enableFiltering =  $scope.data.length > 3 ? true : false;

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
                if(!isNaN(data[i][p])) {
                  data[i][p] = $filter('currency')(data[i][p], '');
                }
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
        $scope.projectDict = $projectsDict.dict;
        c = c.concat(others);
        $scope.columns = [];
        var w = $(window).width();
        c.forEach(function (item) {
          if (item == $scope.basename) {
            var ctmplt = '<div class="ui-grid-cell-contents">{{row.entity[col.field]}}</div>';
            if ($scope.needLinks) {
              if($scope.linkBlocker) {
                ctmplt = '<a cacheType={{grid.appScope.projectDict[row.entity[col.field]] ? grid.appScope.projectDict[row.entity[col.field]].cacheType : null}} \
                elementId={{grid.appScope.projectDict[row.entity[col.field]] ? grid.appScope.projectDict[row.entity[col.field]].elementId : null}} \
                ng-if="grid.appScope.projectDict[row.entity[col.field]].href.indexOf(\''+$scope.linkBlocker+'\') == -1"\
                ng-href={{grid.appScope.projectDict[row.entity[col.field]].href}}><div class="ui-grid-cell-contents pinned-cell">{{row.entity[col.field]}}</div></a>\
                <div ng-if="grid.appScope.projectDict[row.entity[col.field]].href.indexOf(\''+$scope.linkBlocker+'\') > -1" class="ui-grid-cell-contents pinned-cell">{{row.entity[col.field]}}</div>';
              } else {
                ctmplt = '<a cacheType={{grid.appScope.projectDict[row.entity[col.field]] ? grid.appScope.projectDict[row.entity[col.field]].cacheType : null}} elementId={{grid.appScope.projectDict[row.entity[col.field]] ? grid.appScope.projectDict[row.entity[col.field]].elementId : null}} ng-href={{grid.appScope.projectDict[row.entity[col.field]].href}}><div class="ui-grid-cell-contents pinned-cell">{{row.entity[col.field]}}</div></a>';
              }
            }
            if (w < 1370) {
              $scope.columns.push({
                field: item,
                minWidth: 200,
                maxWidth: 250,
                cellTemplate: ctmplt,
                pinnedLeft:true,
                cellClass: 'pinned-cell'
              });
            } else {
              $scope.columns.push({
                field: item,
                minWidth: 230,
                maxWidth: 250,
                cellTemplate: ctmplt,
                pinnedLeft:true,
                cellClass: 'pinned-cell'
              });
            }
          } else {
            $scope.columns.push({
              field: item,
              minWidth: 100,
              enablePinning: false,
              cellTemplate: '<div class="ui-grid-cell-contents" style="display: flex; justify-content: center"><div style="align-self: center;">{{row.entity[col.field]}}</div></div>',
              sortingAlgorithm: function(a, b, rowA, rowB, direction) {
                return numberSorting(a,b,direction);
              },
              enableFiltering: false
            });
          }
        });
        $scope.gridData = data;
      }
      $scope.threshold = 10;
      $scope.gridOptions = {
        onRegisterApi: function( gridApi ) {
          $scope.gridApi = gridApi;
          $timeout(()=>{
            if($scope.gridData.length <= $scope.threshold &&  $(window).width() > 1370) { adjustHeights($timeout); $('.grid').addClass('dynamicGrid'); } else {$('.grid').removeClass('dynamicGrid');}
            $timeout(()=> {
              $('.grid').fadeIn('swing',()=> $('.grid').addClass('shown') );
               $scope.gridApi.core.handleWindowResize();
            },200);
          },500);
        },
        data: $scope.gridData,
        columnDefs: $scope.columns,
        rowHeight: 100,
        minimumColumnSize: 5,
        flatEntityAccess: true,
        virtualizationThreshold: $scope.threshold,
        excessRows: 10,
        enableFiltering: enableFiltering,
        enableHorizontalScrollbar: 0,
        enableVerticalScrollbar: showVerticalScroll,
        enableSorting: true,
        rowTemplate: ' <div  ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid"  ui-grid-one-bind-id-grid="rowRenderIndex + \'-\' + col.uid + \'-cell\'"  class="ui-grid-cell"  ng-class="::{\'ui-grid-row-header-cell\': col.isRowHeader }"  role="{{::col.isRowHeader ? \'rowheader\' : \'gridcell\'}}"  ui-grid-cell></div>'  //  autoResize :  $scope.columns
      };
    }
  };
}
module.exports = DTD;
