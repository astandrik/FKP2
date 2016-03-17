var router = require('./router.js');
var layout = require('./Layout/layout.js');
var demos = require('./components/demos.js');
var icons = require('./components/Icons/icons.js');

var app = angular.module('app', [
    'ui.router',
    'ui.bootstrap',
    'ngMaterial',
    'ngMdIcons',
    'ncy-angular-breadcrumb',
    'ngSanitize',
    'dialogs.main',
    'layout',
    'demos'
]);
app.config([
    '$urlRouterProvider',
    '$stateProvider',
    'ngMdIconServiceProvider',
    function($urlRouterProvider, $stateProvider, ngMdIconServiceProvider) {
        ngMdIconServiceProvider.addShape('wheelChair', icons.wheelChair);
        $urlRouterProvider.otherwise('/FKP/Design');
        $stateProvider
            .state('home', router.routes.homeRoute)
            .state('home.design', router.routes.designRoute);
    }
]);
app.run(function($rootScope, $state) {
    $rootScope.$state = $state;
    // or
    $rootScope.getHref = $state.href.bind($state);
});

app.provider('runtimeStates', function runtimeStates($stateProvider) {
  // runtime dependencies for the service can be injected here, at the provider.$get() function.
  this.$get = function($q, $timeout, $state) { // for example
    return {
      addState: function(name, state) {
        $stateProvider.state(name, state);
      }
    }
  }
});
