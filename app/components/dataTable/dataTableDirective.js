'use strict';
function DTD() {
  return {
    scope: { data: '=' },
    restrict: 'E',
    template: '<div ui-grid="{ data: gridData, columnDefs : columns}" class="grid"></div>',
    controller: function controller($scope, $filter) {
      if( Object.prototype.toString.call( $scope.data ) === '[object Array]' ) {
        //Переводим всё в тип валюты.
        for (var i=0; i<$scope.data.length; i++) {
          for (var p in $scope.data[i]) {
            if(p != 'Тип') {
              $scope.data[i][p] = $filter('currency')($scope.data[i][p], '');
            }
          }
        }
        //Проходим по именам столбцов и сортируем годы
        var b = [];
        for (var p in $scope.data[0]) {
          if (isNaN(p) == false) {
            b.push(p);
          }
        };
        b.sort();
        //добавляем первый столбец и формируем окончательный список столбцов, который кладем в переменную $scope.columns
        var c = ['Тип'].concat(b);
        $scope.gridData = $scope.data;
        $scope.columns = [];
        c.forEach(function(item){
          $scope.columns.push({field:item});
        });
        $scope.gridData = $scope.data;
      }
    }
  };
}
module.exports = DTD;
