var spaceComplexController = require('./complexController.js');
var factory = require('./complexFactory.js');
var complexCard = require('./card/complexCardDirective.js');
var currentModule = angular.module('complex', []);
currentModule.controller('spaceComplexController',spaceComplexController);
currentModule.factory('$complex',factory);
currentModule.directive('complexCard', complexCard);
