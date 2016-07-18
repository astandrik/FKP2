var factory = require('./orderersFactory.js');
var controller = require('./orderersController');
var currentModule = angular.module('orderers', []);
currentModule.factory('$orderersFactory', factory);
currentModule.controller('OrderersStructureController', controller);
currentModule.value('$orderersDict', { dict: {} });
