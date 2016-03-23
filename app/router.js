'use strict';
var DesignController = require('./Design/designController');
angular.module('router', []).provider('$router', function () {
  this.$get = new function () {
    var self = this;
    self.routes = {
      'home': {
        url: '/FKP',
        views: { 'sidebar': { template: '<sidebar></sidebar>' } },
        ncyBreadcrumb: { label: 'ФКП' }
      },
      'home.design': {
        url: '/Design',
        views: {
          'content@': {
            templateUrl: 'app/Design/design-page.html',
            controller: DesignController,
            resolve: {
              gridData: function gridData($dataTableService) {
                return $dataTableService.getTable('testData/tableData.json').then(function (data) {
                  return data.data;
                });
              },
              chartData: function chartData($chartService) {
                return $chartService.getData('testData/chart.json').then(function (data) {
                  return data.data;
                });
              }
            }
          }
        },
        ncyBreadcrumb: { label: 'Дизайн-страница' }
      },
      'home.projectStructure': {
        url: '/ProjectStructure',
        views: {
          'content@': {
            templateUrl: 'app/Project/project-page.html',
            controller: 'projectController'
          }
        },
        ncyBreadcrumb: { label: 'Структура программы' }
      },
      'home.projectStructure.treeEntity': {
        url: '/treeEntity?id',
        views: {
          'projectInfo': {
            templateUrl: 'app/Project/card/project-card.html',
            controller: function controller($scope, project) {
              $scope.project = project;
            },
            resolve: {
              project: function project($http, $projectFactory, $stateParams) {
                var id = $stateParams.id;
                return $projectFactory.getById(id).then(function (data) {
                  return data.data;
                });
              }
            }
          }
        },
        ncyBreadcrumb: { label: 'Проект {{project.code}}' }
      },
      'home.projectStructure.treeEntity.projectSection': {
        url: '/tabSection?type',
        views: {
          'projectSection': {
            templateUrl: function templateUrl($stateParams) {
              switch ($stateParams.type) {
              case 'general':
                return 'app/Project/card/sections/general.html';
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
              }
            }
          }
        },
        ncyBreadcrumb: { label: '{{sectionName}}' }
      }
    };
    return this;
  }();
});
