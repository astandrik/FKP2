var projectCard = require('./card/projectCardDirective.js');

var currentModule = angular.module('project', []);

currentModule.directive('projectCard', projectCard);
