var DesignController = require('./Design/designController');
var ProjectController = require('./Project/projectController');


angular.module('router',[]).provider('$router',function() {

  this.$get =new function() {
    var self = this;
    self.createRoute = function(url, bindView, name) {
      return {
        url: url,
        views: {
          bindView
        },
        ncyBreadcrumb : {
          label: name
        }
      }
    };
    self.routes ={
    'home': {
      url: '/FKP',
      views: {
        'sidebar': {template: '<sidebar></sidebar>'}
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
           controller: DesignController
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
          controller: ProjectController
        }
      },
      ncyBreadcrumb: {
          label: 'Структура программы'
      }
    }
  };
  return this;
  }

});
