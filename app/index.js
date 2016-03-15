var routes = require('./router.js');
var layout = require('./Layout/layout.js');
var demos = require('./components/demos.js');
var icons = require('./components/icons/icons.js');

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
            .state('home', routes.homeRoute)
            .state('home.design', routes.designRoute);
    }
]);
app.run(function($rootScope, $state) {
    $rootScope.$state = $state;
    // or
    $rootScope.getHref = $state.href.bind($state);
});
