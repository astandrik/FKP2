require('./router.js');
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
    'demos',
    'router'
]);
app.config([
    '$urlRouterProvider',
    '$stateProvider',
    'ngMdIconServiceProvider',
    '$routerProvider',
    function($urlRouterProvider, $stateProvider, ngMdIconServiceProvider,$routerProvider) {
       for(var e in icons) {
         ngMdIconServiceProvider.addShape(e, icons[e]);
       }
        $urlRouterProvider.otherwise('/FKP/Design');
        for(var e in $routerProvider.$get.routes) {
          $stateProvider.state(e, $routerProvider.$get.routes[e]);
        }
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
