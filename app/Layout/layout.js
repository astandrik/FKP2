var sidebarDirective = require('./components/sidebar/sidebar.js');

var currentModule = angular.module('layout', []);


currentModule.directive('sidebar', sidebarDirective);
