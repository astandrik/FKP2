'use strict';
var chartDirective = require('./chartDirective.js');
var chartService = require('./chartService.js');
var currentModule = angular.module('charts', ['chart.js']);
currentModule.directive('barChart', chartDirective.barChart);
currentModule.directive('pieChart', chartDirective.pieChart);
currentModule.factory('$chartService', chartService.barChart);
currentModule.factory('$chartService1', chartService.pieChart);