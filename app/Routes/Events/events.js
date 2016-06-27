'use strict';
module.exports = {
  url: '/Events',
  views: {
    'content@': {
      templateUrl: 'app/Events/events.html',
      controller: function($scope,timelineData) {
        var data = _.cloneDeep(timelineData);
        data.data.forEach((item) => {
          item.text = item.title;
        })
        $scope.timeLineHorizontalData = {events: data.data};
        $scope.timespanSelected = function(date) {
          var a = _.cloneDeep(date);
          var b = _.cloneDeep(date);
          a.setFullYear(date.getFullYear() - 1);
          b.setFullYear(date.getFullYear() + 1);
          $scope.startYear = a;
          $scope.endYear = b;
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
