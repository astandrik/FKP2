'use strict';
var projectCard = require('./card/projectCardDirective.js');
var projectFactory = require('./projectFactory.js');
var projectController = require('./projectController.js');
var sectionFactory = require('./sectionFactory.js');
var subsectionFactory = require('./subsectionFactory.js');
var currentModule = angular.module('project', []);
currentModule.controller('projectController', projectController);
currentModule.directive('projectCard', projectCard);
currentModule.factory('$projectFactory', projectFactory);
currentModule.factory('$subsectionFactory', subsectionFactory);
currentModule.factory('$sectionFactory', sectionFactory);
currentModule.value('$projectsDict', { dict: {} });
