'use strict';
var dataTableDirective = require('./dataTableDirective.js');
var currentModule = angular.module('dataTable', [
  'ui.grid',
  'ui.grid.pinning'
]);
currentModule.directive('cDataTable', dataTableDirective);
