require('./router.js');
require('./Project/project.js');
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
    'router',
    'project'
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
        //$urlRouterProvider.otherwise('/FKP/Design');
        for(var e in $routerProvider.$get.routes) {
          $stateProvider.state(e, $routerProvider.$get.routes[e]);
        }
    }
]);
app.run(function($rootScope, $state) {
    $rootScope.$state = $state;

    $rootScope.getHref = $state.href.bind($state);
    $rootScope.getCurrentState = function() {
      return $state.current.name
    }
    $rootScope.getCurrentHref = function() {
      return $rootScope.getHref($rootScope.getCurrentState());
    }
    $rootScope.$on('$stateChangeStart',
    function(event, toState, toParams, fromState, fromParams, options)
    {

    });
    $rootScope.$on('$stateChangeError',
function(event, toState, toParams, fromState, fromParams, error){ debugger; })

$rootScope.$on('$stateNotFound',
function(event, unfoundState, fromState, fromParams){
    console.log(unfoundState.to); // "lazy.state"
    console.log(unfoundState.toParams); // {a:1, b:2}
    console.log(unfoundState.options); // {inherit:false} + default options
    debugger;
})
});
