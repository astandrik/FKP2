var DesignController = require('./Design/designController');

angular.module('router',[]).provider('$router',function() {

  this.$get =new function() {
    var self = this;

    self.routes ={
    'home': {
      url: '/FKP',
      views: {
        'sidebar': {
          template: '<sidebar></sidebar>'
        }
      },
      ncyBreadcrumb: {
          label: 'ФКП'
        }
    },
    'home.design':{
      url: '/Design',
      views: {
        'content@': {
           templateUrl: 'app/Design/design-page.html',
           controller: DesignController,
           resolve: {
             gridData: function($dataTableService) {
                return $dataTableService.getTable('testData/tableData.json').then(function(data) {
                  return data.data;
                })
             }
           }
         }
      },
      ncyBreadcrumb: {
          label: 'Дизайн-страница'
      }
    },
    'home.projectStructure': {
      url: '/ProjectStructure',
      views: {
        'content@': {
          templateUrl: 'app/Project/project-page.html',
          controller: 'projectController'
        }
      },
      ncyBreadcrumb: {
          label: 'Структура программы'
      }
    },
    'home.projectStructure.treeEntity': {
      url: '/treeEntity?id',
      views: {
        'projectInfo' : {
          templateUrl: 'app/Project/card/project-card.html',
          controller: function($scope,project) {
            $scope.project = project;
          },
          resolve: {
            project: function($http, $projectFactory, $stateParams) {
              var id = $stateParams.id;
              return $projectFactory.getById(id).then(function(data) {
                return data.data;
              });
            }
          }
        }
      },
      ncyBreadcrumb: {
          label: 'Проект {{project.code}}'
      }
    }
  };
  return this;
  }

});
