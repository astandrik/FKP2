var dataTableDirective = require('./dataTableDirective.js');
var dataTableService = require('./dataTableService.js')

var currentModule = angular.module('dataTable', ['ui.grid']);

currentModule.directive('cDataTable',dataTableDirective);
currentModule.factory('$dataTableService', dataTableService);
