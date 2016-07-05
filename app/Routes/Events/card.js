'use strict';
module.exports = {
  url: '/:eventId',
  views: {
    'content@': {
      templateUrl: 'app/Events/card/events-card.html',
      controller: function(event,$scope,tabstripData) {
        $scope.tabstripData = tabstripData;
        $scope.event = event;
      },
      resolve: {
        event: function event($eventsFactory,$stateParams) {
          var id = $stateParams.eventId;
          return $eventsFactory.getById(id).then(function (data) {
            return data.data.data;
          });
        },
        tabstripData: function tabstripData($stateParams) {
            var tabs = [];
            tabs.push({
              name: 'Общие сведения',
              state: 'projectSection',
              type: 'general'
            });
            tabs.push({
              name: 'Связанные проекты',
              state: 'projectSection',
              type: 'relatedProjects'
            });
            return tabs;
        }
      }
    }
  },
  ncyBreadcrumb: { label: 'Карточка события' }
}
