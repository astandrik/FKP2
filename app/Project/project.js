'use strict';
var projectCard = require('./card/projectCardDirective.js');
var projectFactory = require('./projectFactory.js');
var projectController = require('./projectController.js');
var currentModule = angular.module('project', []);
currentModule.controller('projectController', projectController);
currentModule.directive('projectCard', projectCard);
currentModule.factory('$projectFactory', projectFactory);
