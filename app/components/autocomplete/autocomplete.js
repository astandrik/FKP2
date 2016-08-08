Array.prototype.findByParam = function (paramName, paramValue) {
  for (var i = 0; i < this.length; i++) {
    if (this[i][paramName].trim() === paramValue.trim()) {
      return this[i];
    }
  }
};

function sortCatalogByRelevance(list, query) {
  var elemsWithScores = [];
  var notFound = [];
  if (!query) {
      return list.sort(function (a, b) {
          return a.Value > b.Value ? 1 : -1;
      });
  }
  for (var i = 0; i < list.length; i++) {
      var score = list[i].Value.toLowerCase().trim().replace(/\s+/gi, "X").indexOf(query.toLowerCase().trim().replace(/\s+/gi, "X"));
    if (score === -1) {
      notFound.push({
        elem: list[i],
        score: score
      });
    } else {
      elemsWithScores.push({
        elem: list[i],
        score: score
      });
    }
  }

  elemsWithScores.sort(function (a, b) {   //Сортировка в жс недетерминирована, так что если "очки релевантости" объектов равны - сравниваем их по строке
      if (a.score == b.score) {
          return a.elem.Value > b.elem.Value ? 1 : -1;
      } else {
          return a.score - b.score;
      }
  });
  notFound.sort(function (a, b) {
    return a.elem.Value > b.elem.Value ? 1 : -1;
  });
  var sortedArr = [];
  for (var i = 0; i < elemsWithScores.length; i++) {
    sortedArr.push(elemsWithScores[i].elem);
  }
  for (var i = 0; i < notFound.length; i++) {
    sortedArr.push(notFound[i].elem);
  }
  return sortedArr;
}

var currentModule = angular.module('autoselect', []);
currentModule.directive('autocomplete', autocomplete);
  autocomplete.$inject = ['$timeout'];
  function autocomplete($timeout) {
    return {
      restrict: 'E',
      link: function (scope, element, attrs) {
          $timeout(function () {
              scope.thisElement = element;
              $(element).click(function (e) {
                  if (!scope.clickerSet) {
                      var input = e.target.toString().indexOf('Input') > -1 ? $(e.target) : (e.target).find('input');
                      if (input.length > 0) {
                          input.click(function () {
                                scope.unselectItem();
                                scope.clickerSet = true;
                              });
                            input.click();
                      }
                  }
              });
            $(element).find('input').on('blur', function (event) {
            var itemInList = scope.listData.findByParam('Value', scope.query.trim());
            if (!scope.catalog.parent[scope.catalog.boundTo] && itemInList) {
              scope.catalog.parent[scope.catalog.boundTo] = itemInList;
              scope.$digest();
            }
            });
        });
      },
      scope: { catalog: '=' },
      templateUrl: 'app/components/autocomplete/autocomplete.html',
      controller: autocompleteController
    };
  }
  autocompleteController.$inject = [
    '$scope',
    '$http',
    '$rootScope',
    '$q'
  ];
  function autocompleteController($scope, $http, $rootScope, $q) {
    $scope.clearSelected = function () {
      $scope.catalog.parent[$scope.catalog.boundTo] = '';
      $scope.query = '';
    };
    $scope.Hover = false;
    function getElemIndex(elem, list) {
      var listElements = list;
      for (var i = 0; i < listElements.length; i++) {
        if (listElements[i].Value.toLowerCase().indexOf(elem.toLowerCase()) > -1 || elem.toLowerCase().indexOf(listElements[i].Value.toLowerCase()) > -1) {
          return i;
        }
      }
      return 0;
    }
    $scope.topIndex = 0;
    $scope.goToEntity = $rootScope.goToEntity;
    $scope.unselectItem = function () {
      $scope.query = $scope.query + ' ';
      setTimeout(function () {
          $scope.query = $scope.query.trim();
      }, 100);
      $scope.$digest();
    };
    $scope.getData = function () {
        var deferred = $q.defer();
        if ($scope.gotList && !$scope.catalog.noCache) {
            $scope.listData = sortCatalogByRelevance($scope.listData, $scope.query);
            deferred.resolve($scope.listData);
            $('.md-virtual-repeat-scroller').toArray().forEach(function (item) {
                setTimeout(function () {
                    $(item).scrollTop(0);
                }, 10);
            });
            return deferred.promise;
        } else {
            return $http.get($scope.catalog.url).then(function (items) {
                var list = $scope.filter(items.data.data);
                list = sortCatalogByRelevance(list, $scope.query);
                $scope.topIndex = 0;
                $('.md-virtual-repeat-scroller').toArray().forEach(function (item) {
                    setTimeout(function () {
                        $(item).scrollTop(0);
                    }, 10);
                });
                $scope.listData = list;
                $scope.gotList = true;
                return list;
            });
        }
    };
    $scope.toggleDeleteLabel = function () {
      if (!$scope.catalog || !$scope.catalog.parent || !$scope.catalog.boundTo || $scope.catalog.nonRecount)
        return;
      if ($scope.catalog.parent[$scope.catalog.boundTo]) {
        $scope.Empty = false;
        $scope.catalog.parent[$scope.catalog.boundTo].clearAutoselect = $scope.clearSelected;
      } else {
        $scope.Empty = true;
      }
    };
    var newItems = [];
    $scope.toggleDeleteLabel();
    $scope.filter = function (items) {
      var query = $scope.query;
      var itemList = [];
        newItems = [];
        items.forEach(function (item) {
          newItems.push({
            Value: item.title,
            Id: item.id,
            Raw: item
          });
        });
        items = newItems;
      items.forEach(function (item) {
        if (item.Value) {
          itemList.push(item);
        }
      });
      return itemList;
    };
  }
