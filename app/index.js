'use strict';
require('./router.js');
require('./Project/project.js');
require('./SpaceComplex/complex.js');
require('./Design/design.js');
require('./core/cache/cache.js');
require('./core/dialogs/dialogs.js');
require('./core/errorHandler/errors.js');
require('./core/stateManager.js');
require('./Events/events.js');
require('./Documents/documents.js');
require('./Orderers/orderers.js');
var layout = require('./Layout/layout.js');
var components = require('./components/components.js');
var icons = require('./components/Icons/icons.js');
var activateDir = require('./Layout/sidebar/sidebar.js').activateDir;
window.angular = angular;
var app = angular.module('app', [
  'cache-custom',
  'dialogWorker',
  'errorsModule',
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
  'documents',
'stateManager',
'events',
'orderers',
require('angular-ui-bootstrap')
]);
app.config([
  '$locationProvider',
  '$urlRouterProvider',
  '$stateProvider',
  'ngMdIconServiceProvider',
  '$routerProvider',
  'calendarConfig',
  '$breadcrumbProvider',
  'CacheFactoryProvider',
  '$provide',
  function ($locationProvider,$urlRouterProvider, $stateProvider, ngMdIconServiceProvider, $routerProvider, calendarConfig, $breadcrumbProvider, CacheFactoryProvider, $provide) {
    angular.extend(CacheFactoryProvider.defaults, { maxAge: 15 * 60 * 1000 });
    $breadcrumbProvider.setOptions({ templateUrl: 'app/components/breadcrumbs.html' });
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
app.run(function ($rootScope, $state, $cacheRunner, $errorDialogService, $errorHandler) {
  $cacheRunner.setOptions({
    checkRate: 4000,
    cacheRate: 1000
  });
  $cacheRunner.startCacheRunner();
  $cacheRunner.runCacheProcess();
  $rootScope.$state = $state;
  $rootScope.getHref = $state.href.bind($state);
  $rootScope.sectionCutFunction = function sectionCutFunction(section) {
    if (section && section.length > 30) {
      var p = section;
      p = p.slice(0, p.indexOf('.'));
      return p;
    } else {
      return section;
    }
  };
  $rootScope.subsectionCutFunction = function subsectionCutFunction(subsection) {
    if (subsection && subsection.length > 30) {
      var s = subsection;
      s = s.slice(0, 30).concat('...');
      return s;
    } else {
      return subsection;
    }
  };
  $rootScope.projectCutFunction = function projectCutFunction(project) {
    if (project && project.length > 30) {
      return project.slice(0, 30).concat('...');
    } else {
      return project;
    }
  };
  window.getHref = $rootScope.getHref;
  $rootScope.getCurrentState = function () {
    return $state.current.name;
  };
  $rootScope.getCurrentHref = function () {
    return $rootScope.getHref($rootScope.getCurrentState());
  };
  $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
    activateDir(toState.name);
      $rootScope.isLoading=false;
  });
  $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams, options) {
      $rootScope.isLoading=true;
  });
  $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
    $rootScope.isLoading=false;
    debugger;
    if (error && error.config && error.config.url) {
      $errorHandler.handleError(event.name, 'Ошибка перехода по пути ' + error.config.url + '. Обратитесь к системному администратору.');
    } else {
      $errorHandler.handleError(event.name, 'Неизвестная ошибка. Обратитесь к системному администратору.');
    }
  });
  $rootScope.$on('$stateNotFound', function (event, unfoundState, fromState, fromParams) {
    $rootScope.isLoading=false;
  });
});
