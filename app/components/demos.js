var currentModule = angular.module('demos',[]);

var accordionDirective = require('./accordion/accordion.js');
var popupController = require('./popup/popupController.js');
var splitDirective = require('./split/split.js');

currentModule.directive('accordionTree', accordionDirective);
currentModule.controller('popupController',popupController);
currentModule.directive('split', splitDirective);
