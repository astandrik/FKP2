'use strict';
var timeLineDirective = require('./timeLineDirective.js');
var timeLineService = require('./timeLineService.js');
var currentModule = angular.module('timeLineModule', []);
currentModule.directive('timeLineVertical', timeLineDirective.vertical);
currentModule.directive('timeLineHorizontal', timeLineDirective.horizontal);
currentModule.factory('$timelineService', timeLineService);
