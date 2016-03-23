'use strict';
require('./accordion/accordion.js');
require('./dataTable/dataTable.js');
require('./tabstrip/tabstrip.js');
require('./chart/chart.js');
var currentModule = angular.module('components', [
  'accordion',
  'dataTable',
  'tabstrip',
  'chart'
]);
var accordionDirective = require('./accordion/accordion.js');
var popupController = require('./popup/popupController.js');
var splitDirective = require('./split/split.js');
var projectCard = require('../Project/card/projectCardDirective.js');
currentModule.controller('popupController', popupController);
currentModule.directive('split', splitDirective);
currentModule.directive('projectCard', projectCard);