(function () {
  var app = angular.module('app', [
    'ui.router',
    'ngMaterial',
    'layout'
  ]);
  app.config([
    '$urlRouterProvider',
    '$stateProvider',
    function ($urlRouterProvider, $stateProvider) {
      $urlRouterProvider.otherwise('/');
      $stateProvider.state('home', {
        url: '/',
        views: {
          'sidebar': { template: '<sidebar></sidebar>' },
          'content': { template: 'TEST' }
        }
      });
    }
  ]);
  app.run(function () {
  });
}());
