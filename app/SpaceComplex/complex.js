'use strict';
var spaceComplexController = require('./complexController.js');
var factory = require('./complexFactory.js');
var complexCard = require('./card/complexCardDirective.js');
var currentModule = angular.module('complex', []);
currentModule.controller('SpaceComplexStructureController', spaceComplexController);
currentModule.factory('$complexFactory', factory);
currentModule.directive('complexCard', complexCard);
