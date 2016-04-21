'use strict';
require('./router.js');
require('./Project/project.js');
require('./SpaceComplex/complex.js');
require('./Design/design.js');
var layout = require('./Layout/layout.js');
var components = require('./components/components.js');
var icons = require('./components/Icons/icons.js');



var app = angular.module('app', [
  'ui.router',
  'ngMaterial',
  'ngMdIcons',
  'ncy-angular-breadcrumb',
  'ngSanitize',
  'dialogs.main',
  'layout',
  'components',
  'router',
  'project',
  'complex',
  'design',
  require('angular-ui-bootstrap')
]);


app.config([
  '$urlRouterProvider',
  '$stateProvider',
  'ngMdIconServiceProvider',
  '$routerProvider',
  'calendarConfig',
  '$breadcrumbProvider',
  function ($urlRouterProvider, $stateProvider, ngMdIconServiceProvider, $routerProvider, calendarConfig,$breadcrumbProvider) {
    $breadcrumbProvider.setOptions({
      templateUrl: 'app/components/breadcrumbs.html'
    });
    for (var e in icons) {
      ngMdIconServiceProvider.addShape(e, icons[e]);
    }
    $urlRouterProvider.otherwise('/FKP');
    for (var e in $routerProvider.$get.routes) {
      $stateProvider.state(e, $routerProvider.$get.routes[e]);
    }
    calendarConfig.dateFormatter = 'moment';  // use moment to format dates
  }
]);
app.run(function ($rootScope, $state) {
  $rootScope.$state = $state;
  $rootScope.getHref = $state.href.bind($state);
  $rootScope.sectionCutFunction = function  sectionCutFunction (section) {
    if(section && section.length > 30) {
      var p = section;
      p = p.slice(0, p.indexOf("."));
      return p;
    } else {
      return section;
    }
  }
  $rootScope.subsectionCutFunction = function subsectionCutFunction (subsection) {
    if(subsection && subsection.length > 30) {
      var s = subsection;
      s = s.slice(0,30).concat('...');
      return s;
    } else {
      return subsection;
    }
  }

  $rootScope.projectCutFunction = function projectCutFunction(project) {
    if(project && project.length > 30) {
      return project.slice(0,30).concat('...');
    } else {
      return project;
    }
  }
  window.getHref = $rootScope.getHref;
  $rootScope.getCurrentState = function () {
    return $state.current.name;
  };
  $rootScope.getCurrentHref = function () {
    return $rootScope.getHref($rootScope.getCurrentState());
  };
  $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams, options) {
    //debugger;
  });
  $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
    //debugger;
  });
  $rootScope.$on('$stateNotFound', function (event, unfoundState, fromState, fromParams) {
     //debugger;
  });
});
