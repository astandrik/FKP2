function C() {
    return {
      restrict: 'E',
      scope: {data: '='},
      templateUrl: 'app/components/calendar/calendar.html',
      controller: function($scope) {
        var calendarData = $scope.data;
        var moment = require('moment');
        $scope.vm = {};

        require('../../../node_modules/moment/locale/ru');

        $scope.vm.calendarView = 'month';
        $scope.vm.viewDate = new Date();
        $scope.vm.events = [];

        $scope.vm.isCellOpen = true;

        $scope.vm.eventClicked = function(event) {
          alert.show('Clicked', event);
        };

        $scope.vm.eventEdited = function(event) {
          alert.show('Edited', event);
        };

        $scope.vm.eventDeleted = function(event) {
          alert.show('Deleted', event);
        };

        $scope.vm.eventTimesChanged = function(event) {
          alert.show('Dropped or resized', event);
        };

        $scope.vm.toggle = function($event, field, event) {
          $event.preventDefault();
          $event.stopPropagation();
          event[field] = !event[field];
        };
      }
  }
}

module.exports = C;
