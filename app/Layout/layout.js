'use strict';
var sidebarDirective = require('./sidebar/sidebar.js').sidebar;
var currentModule = angular.module('layout', []);
currentModule.directive('sidebar', sidebarDirective);