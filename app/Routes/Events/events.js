'use strict';
module.exports = {
  url: '/Events',
  views: {
    'content@': {
      templateUrl: 'app/Events/events.html',
      controller: function($scope,timelineData, $state) {
        var data = _.cloneDeep(timelineData);
        data.data.forEach((item) => {
          item.text = item.title;
        })
        $scope.data = data.data;
        $scope.timeLineHorizontalData = {events: data.data};
        $scope.timespanSelected = function(date) {
          var a = _.cloneDeep(date);
          var b = _.cloneDeep(date);
          a.setFullYear(date.getFullYear() - 1);
          b.setFullYear(date.getFullYear() + 1);
          $scope.startYear = a;
          $scope.endYear = b;
        }
        $scope.eventClicked = function(event) {
          $state.go("'home.events.card.section'", { "eventId": event.id, "type": "general"});
        }
      },
      resolve: {
        timelineData: function($timelineService) {
          return $timelineService.getData('/data/events').then(function (data) {
            return data.data;
          });
        }
      }
    }
  },
  ncyBreadcrumb: { label: 'Календарь событий' }
}
