'use strict';
var sidebarDirective = require('./sidebar/sidebar.js');
var currentModule = angular.module('layout', []);
currentModule.directive('sidebar', sidebarDirective);