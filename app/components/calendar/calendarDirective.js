'use strict';
function C() {
  return {
    restrict: 'E',
    scope: {
      data: '=',
      timespanSelected: '&',
      eventClicked: '&'
   },
    templateUrl: 'app/components/calendar/calendar.html',
    controller: function controller($scope) {
      var calendarData = $scope.data;
      if(calendarData) calendarData = calendarData.map((item) => {
        item.startsAt = item.date;
        item.endsAt = item.date;
        return item;
      });
      var moment = require('moment');
      $scope.vm = {};
      require('../../../node_modules/moment/locale/ru');
      $scope.vm.calendarView = 'all';
      $scope.vm.viewDate = new Date();
      $scope.vm.events = calendarData;
      $scope.vm.isCellOpen = true;
      $scope.vm.eventClicked = function(event) {
        $scope.eventClicked(event);
      }
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
