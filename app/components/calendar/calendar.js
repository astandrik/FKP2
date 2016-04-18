'use strict';
var calendarDirective = require('./calendarDirective.js');
var currentModule = angular.module('calendar', [require('angular-bootstrap-calendar')]);
currentModule.directive('calendar', calendarDirective);