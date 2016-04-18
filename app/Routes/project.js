'use strict';

var helpers = require('./projectHelper.js');

var structure = {
  url: '/ProjectStructure',
  views: {
    'content@': {
      templateUrl: 'app/Project/project-page.html',
      controller: 'projectController',
      resolve: {
        treeData: function treeData($accordion) {
          return $accordion.getTree('data/tree').then(function (response) {
            return response.data;
          });
        }
      }
    }
  },
  ncyBreadcrumb: { label: 'Структура программы' }
};
var entity = {
  url: '/treeEntity?id&object_type&section_id',
  views: {
    'projectInfo': {
      templateUrl: 'app/Project/card/project-card.html',
      controller: function controller($scope, project, pieData, tabstripData) {
        $scope.tabstripData = tabstripData;
        $scope.project =project;
        project = helpers.prepareValues(project);
        $scope.timeLineVerticalData = project.plans;
        var finObj = helpers.prepareFinance(project.finance);
        $scope.start = finObj.start;
        $scope.end = finObj.end;
        project.finance = finObj.finance;

        $scope.project.chart = {barLabels: finObj.years, barSeries: ['Бюджет, млн.р.','Внебюджет, млн.р'], barData: [finObj.valueBudget, finObj.valueOwnBudget]};
        $scope.pieChartData = {pieLabels: ["Бюджет", "Внебюджет"], pieData: [finObj.sumBudget, finObj.sumOwnBudget]
        }
      },
      resolve: {
        projectResource: '$projectFactory',
        project: function project($http, projectResource, $stateParams) {
          var id = $stateParams.id;
          return projectResource.getById(id).then(function (data) {
            return data.data.data;
          });
        },
        pieData: function pieData($chartService1) {
          return $chartService1.getData('testData/pie.json').then(function (data) {
            return data.data;
          });
        },
        tabstripData: function tabstripData($stateParams) {
          var tabs = [];
          tabs.push({
            name: 'Общие сведения',
            state: 'projectSection',
            type: 'general'
          });
          if ($stateParams.section_id != 2) {
            tabs.push({
              name: 'Результаты',
              state: 'projectSection',
              type: 'results'
            });
          }
          tabs.push({
            name: 'Финансирование',
            state: 'projectSection',
            type: 'finance'
          });
          tabs.push({
            name: 'Связанные проекты',
            state: 'projectSection',
            type: 'relatedProjects'
          });
          tabs.push({
            name: 'События',
            state: 'projectSection',
            type: 'events'
          });
          return tabs;
        }
      }
    }
  },
  ncyBreadcrumb: { label: 'Проект {{project.cipher}}' }
};
var section = {
  url: '/tabSection?type',
  views: {
    'projectSection': {
      templateUrl: function templateUrl($stateParams) {
        return 'app/Project/card/sections/' + $stateParams.section_id + $stateParams.type + '.html';
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
};
var project = {
  structure: structure,
  entity: entity,
  section: section
};
module.exports = project;
