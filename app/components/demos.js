var currentModule = angular.module('demos',[]);

var accordionDirective = require('./accordion/accordion.js')
var popupController = require('./popup/popupController.js')

currentModule.directive('accordionTree', accordionDirective);
currentModule.controller('popupController',popupController); 
