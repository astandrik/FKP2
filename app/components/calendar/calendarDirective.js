'use strict';
function C() {
  return {
    restrict: 'E',
    scope: {
      data: '=',
      timespanSelected: '&'
   },
    templateUrl: 'app/components/calendar/calendar.html',
    controller: function controller($scope) {
      var calendarData = $scope.data;
      var moment = require('moment');
      $scope.vm = {};
      require('../../../node_modules/moment/locale/ru');
      $scope.vm.calendarView = 'year';
      $scope.vm.viewDate = new Date();
      $scope.vm.events = [];
      $scope.vm.isCellOpen = true;
      $scope.vm.toggle = function ($event, field, event) {
        $event.preventDefault();
        $event.stopPropagation();
        event[field] = !event[field];
      };
      $scope.vm.timespanClicked = function(date) {
        $scope.timespanSelected()(date);
      };
      $scope.$watch('vm.viewDate', function(date) {
        $scope.timespanSelected()(date);
      })
    }
  };
}
module.exports = C;
