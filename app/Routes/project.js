var structure = {
  url: '/ProjectStructure',
  views: {
    'content@': {
      templateUrl: 'app/Project/project-page.html',
      controller: 'projectController',
      resolve: {
        treeData: function($accordion) {
          return $accordion.getTree('data/tree').then(function(response) {
            return response.data;
          });
        }
      }
    },
  },
  ncyBreadcrumb: { label: 'Структура программы' }
};

var entity = {
  url: '/treeEntity?id&eType',
  views: {
    'projectInfo': {
      templateUrl: 'app/Project/card/project-card.html',
      controller: function controller($scope, project, timeLineVerticalData, pieData) {
        $scope.project = project;
        $scope.timeLineVerticalData = timeLineVerticalData;
        $scope.pieChartData = pieData;
        $scope.start = project.chart.barLabels[0];
        $scope.end = project.chart.barLabels[project.chart.barLabels.length-1];
      },
      resolve: {
        project: function project($http, $projectFactory, $stateParams) {
          var id = $stateParams.id;
          return $projectFactory.getById(id).then(function (data) {
            return data.data;
          });
        },
        timeLineVerticalData: function($timelineService) {
          return $timelineService.getData('testData/timelineVertical.json').then((data) => {
            return data.data;
          });
        },
        pieData: function ($chartService1) {
          return $chartService1.getData('testData/pie.json').then(function (data) {
            return data.data;
          });
        }
      }
    }
  },
  ncyBreadcrumb: { label: 'Проект {{project.code}}' }
}

var section = {
  url: '/tabSection?type',
  views: {
    'projectSection': {
      templateUrl: function templateUrl($stateParams) {
        switch ($stateParams.type) {
        case 'general':
          return 'app/Project/card/sections/general.html';
          break;
        case 'results':
          return 'app/Project/card/sections/results.html';
          break;
        case 'finance':
          return 'app/Project/card/sections/finance.html';
          break;
        case 'relatedProjects':
          return 'app/Project/card/sections/relatedProjects.html';
          break;
        case 'events':
          return 'app/Project/card/sections/events.html';
          break;
        default:
          return 'app/Project/card/sections/general.html';
        }
      },
      controller: function controller($stateParams, $scope) {
        var state = $stateParams;
        switch (state.type) {
          case 'general':
            $scope.sectionName = 'Общие сведения';
            break;
          case 'results':
            $scope.sectionName = 'Результаты';
            break;
          case 'finance':
            $scope.sectionName = 'Финансирование';
            break;
          default:
            $scope.sectionName = 'Общие сведения';
            break;
        }
      }
    }
  },
  ncyBreadcrumb: { label: '{{sectionName}}' }
}

var project = {
  structure,
  entity,
  section
}

module.exports = project;
