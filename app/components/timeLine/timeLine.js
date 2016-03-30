'use strict';
var timeLineDirective = require('./timeLineDirective.js');
var currentModule = angular.module('timeLineModule', []);
currentModule.directive('timeLineD', timeLineDirective);
