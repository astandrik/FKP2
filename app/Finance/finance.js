var financeFactory = require('./financeFactory.js');
var currentModule = angular.module('finance', []);
currentModule.factory('$financeFactory', financeFactory);
