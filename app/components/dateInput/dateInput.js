require('angular-ui-bootstrap');
var currentModule = angular.module('datePicker', [
'ui.bootstrap'
]);

currentModule.directive('datepickerPopup', function (dateFilter, uibDatepickerPopupConfig) {
  return {
    restrict: 'A',
    priority: 1,
    require: 'ngModel',
    link: function (scope, element, attr, ngModel) {
      var dateFormat = attr.datepickerPopup || uibDatepickerPopupConfig.datepickerPopup;
      ngModel.$formatters.push(function (value) {
        return dateFilter(value, dateFormat);
      });
    }
  };
});
currentModule.directive('dateInput', function () {
  return {
    restrict: 'E',
    templateUrl: 'app/components/dateInput/dateInput.html',
    scope: { model: '=model' },
    controller: dateInputController
  };
});
dateInputController.$inject = ['$scope'];
function dateInputController($scope) {
  $scope.open = function ($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.opened = true;
  };
  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };
}
