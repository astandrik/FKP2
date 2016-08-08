'use strict';
module.exports = {
  url: '/Plan',
  views: {
    'content@': {
      templateUrl: 'app/Routes/Plan/plan.html',
      controller: function($scope,timelineData, $state) {
          $scope.timeLineVerticalData = project.plans;
      },
      resolve: {
      }
    }
  },
  ncyBreadcrumb: { label: 'Планирование' }
}
