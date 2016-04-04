'use strict';
var timeLineDirective = require('./timeLineDirective.js');
var timeLineService = require('./timeLineService.js');
var currentModule = angular.module('timeLineModule', []);
currentModule.directive('timeLineVertical', timeLineDirective);
currentModule.factory('$timelineVertical', timeLineService);
