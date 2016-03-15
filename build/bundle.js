(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var routes = require('./router.js');

(function () {
  var app = angular.module('app', [
    'ui.router',
    'ui.bootstrap',
    'ngMaterial',
    'ngMdIcons',
    'ncy-angular-breadcrumb',
    'layout',
    'demos'
  ]);
  app.config([
    '$urlRouterProvider',
    '$stateProvider',
    'ngMdIconServiceProvider' ,
    function ($urlRouterProvider, $stateProvider,ngMdIconServiceProvider) {
      ngMdIconServiceProvider.addShape('wheelChair', '<path d="M19 13v-2c-1.54.02-3.09-.75-4.07-1.83l-1.29-1.43c-.17-.19-.38-.34-.61-.45-.01 0-.01-.01-.02-.01H13c-.35-.2-.75-.3-1.19-.26C10.76 7.11 10 8.04 10 9.09V15c0 1.1.9 2 2 2h5v5h2v-5.5c0-1.1-.9-2-2-2h-3v-3.45c1.29 1.07 3.25 1.94 5 1.95zm-6.17 5c-.41 1.16-1.52 2-2.83 2-1.66 0-3-1.34-3-3 0-1.31.84-2.41 2-2.83V12.1c-2.28.46-4 2.48-4 4.9 0 2.76 2.24 5 5 5 2.42 0 4.44-1.72 4.9-4h-2.07z"></path>');
      $urlRouterProvider.otherwise('/FKP/Design');
      $stateProvider
      .state('home', routes.homeRoute)
      .state('home.design', routes.designRoute);
    }
  ]);
  app.run(function($rootScope,$state) {
    $rootScope.$state = $state;
   // or
    $rootScope.getHref = $state.href.bind($state);
   });
}());

},{"./router.js":2}],2:[function(require,module,exports){
module.exports = {
  homeRoute: {
    url: '/FKP',
    views: {
      'sidebar': {template: '<sidebar></sidebar>'}
    },
    ncyBreadcrumb: {
        label: 'ФКП'
      }
  },
  designRoute:{
    url: '/Design',
    views: {
      'content@': { templateUrl: 'app/Design/design-page.html' }
    },
    ncyBreadcrumb: {
        label: 'Дизайн-страница'
      }
  }
};

},{}]},{},[1]);