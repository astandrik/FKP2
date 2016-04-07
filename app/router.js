'use strict';
var routes = require('./Routes/routes.js');

angular.module('router', []).provider('$router', function () {
  this.$get = new function () {
    var self = this;
    self.routes = {
      'home': {
        url: '/FKP',
        views: { 'sidebar': { template: '<sidebar></sidebar>' } },
        ncyBreadcrumb: { label: 'ФКП' }
      },
      'home.design': routes.design,
      'home.projectStructure': routes.project.structure,
      'home.complexStructure': routes.complex.structure,

      'home.projectStructure.treeEntity': routes.project.entity,
      'home.complexStructure.treeEntity': routes.complex.entity,
      'home.projectStructure.treeEntity.projectSection': routes.project.section ,
      'home.complexStructure.treeEntity.complexSection': routes.complex.section,

      'home.events': {
        url: '/Events',
        views: {
          'content@': {
            templateUrl: "app/Events/events.html"
          }
        }
      }
    };
    return this;
  }();
});
