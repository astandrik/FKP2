require('./accordion/accordion.js');
var currentModule = angular.module('demos',['accordion']);

var accordionDirective = require('./accordion/accordion.js');
var popupController = require('./popup/popupController.js');
var splitDirective = require('./split/split.js');
 
currentModule.controller('popupController',popupController);
currentModule.directive('split', splitDirective);
