var accordionDirective = require('./accordionDirective.js');
var accordionService = require('./accordionService.js');

var currentModule = angular.module('accordion',[]);

currentModule.directive('accordionTree', accordionDirective);
currentModule.service('$accordion', accordionService); 
