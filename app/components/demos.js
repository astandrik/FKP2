require('./accordion/accordion.js');
var currentModule = angular.module('demos',['accordion']);

var accordionDirective = require('./accordion/accordion.js');
var popupController = require('./popup/popupController.js');
var splitDirective = require('./split/split.js');
var projectCard = require('../Project/card/projectCardDirective.js')

currentModule.controller('popupController',popupController);
currentModule.directive('split', splitDirective);
currentModule.directive('projectCard', projectCard);
