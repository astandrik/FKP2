'use strict';
var chartDirective = require('./chartDirective.js');
var chartService = require('./chartService.js');
var currentModule = angular.module('chart', ['chart.js']);
currentModule.directive('chart', chartDirective);
currentModule.factory('$chartService', chartService);
