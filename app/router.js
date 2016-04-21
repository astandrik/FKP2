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

      'home.projectStructure': routes.projectStructure,
      'home.projectStructure.section': routes.section,
      'home.projectStructure.section.subSection': routes.subsection,
      'home.projectStructure.section.subSection.project': routes.project,
      'home.projectStructure.section.subSection.project.tab': routes.projectSection,
      'home.events': {
        url: '/Events',
        views: { 'content@': { templateUrl: 'app/Events/events.html' } }
      }
    };
    return this;
  }();
});
